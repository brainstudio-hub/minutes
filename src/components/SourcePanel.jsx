
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FirefliesPanel from './FirefliesPanel';
import MultiFileUpload from './MultiFileUpload';
import FileList from './FileList';

const SourcePanel = ({ onSelectSource, selectedSource }) => {
  // Local state to manage the list of all files/sources
  const [files, setFiles] = useState([]);

  // Sync internal files if selectedSource comes from parent as multi-source
  // (Optional consistency check, mostly we drive parent from here)
  useEffect(() => {
     if (selectedSource?.type === 'multi-source' && selectedSource.files) {
         setFiles(selectedSource.files);
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep as mount-only to avoid circular updates if parent changes reference

  // Update parent whenever files change
  useEffect(() => {
    if (files.length > 0) {
        onSelectSource({
            type: 'multi-source',
            files: files,
            title: 'Análisis Integrado',
            // Concatenated text for backwards compatibility with single-source components if needed
            text: files.map(f => f.text).join('\n\n') 
        });
    } else {
        // If no files, we can clear the selection or keep it empty
        onSelectSource(null);
    }
  }, [files, onSelectSource]);


  const handleFilesAdded = useCallback((newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const handleSelectMeeting = useCallback((meeting) => {
    // Treat Fireflies meeting as just another file in the list
    const meetingAsFile = {
        id: meeting.id,
        title: meeting.title || 'Reunión Fireflies',
        type: 'meeting',
        text: meeting.text, // Assuming text is available in the object passed back
        uploadedAt: new Date().toISOString(),
        size: 0 // Metadata
    };
    // Add to list instead of replacing
    setFiles(prev => [...prev, meetingAsFile]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-[#130e24] bg-opacity-60 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl flex flex-col overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Fuentes de Datos</h2>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pr-2">
        
        {/* Unified Upload Area */}
        <section>
             <MultiFileUpload onFilesAdded={handleFilesAdded} />
        </section>

        {/* File List */}
        <FileList files={files} onRemove={handleRemoveFile} />

        {/* Fireflies Integration */}
        <div className="border-t border-purple-800/30 pt-8">
           <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Integraciones</h3>
           <FirefliesPanel 
             onSelectMeeting={handleSelectMeeting} 
             // We pass null as selectedMeeting because we don't want highlighting logic to conflict with list logic
             // or we could find if any file in 'files' matches meeting ID
             selectedMeeting={null} 
           />
        </div>
        
      </div>
    </motion.div>
  );
};

export default SourcePanel;
