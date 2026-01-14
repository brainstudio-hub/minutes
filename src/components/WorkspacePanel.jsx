
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, AlertCircle, Mic, Layers, Info } from 'lucide-react';
import GeneralSummary from './GeneralSummary';
import CompleteAnalysis from './CompleteAnalysis';
import PromptViewer from './PromptViewer';

const WorkspacePanel = ({ selectedSource }) => {
  
  // Helper to determine what we are looking at
  const isMultiSource = selectedSource?.type === 'multi-source';
  const files = isMultiSource ? selectedSource.files : (selectedSource ? [selectedSource] : []);
  const fileCount = files.length;

  const getSourceTitle = () => {
    if (!selectedSource) return 'Sin selección';
    if (isMultiSource) return 'Análisis Integrado';
    return selectedSource.data?.title || selectedSource.title || 'Documento';
  };

  // Prepare content for the analysis components
  // We pass the RAW files array if possible, or a concatenated string
  const getContentForAnalysis = () => {
      // GeneralSummary/CompleteAnalysis expect 'content' string OR we update them to handle objects.
      // Based on previous edits, they take 'content' string. 
      // However, for better prompting, passing the structured list is better.
      // BUT, existing components take 'content' prop.
      // I will update them to accept 'files' prop optionally, or fallback to 'content' string.
      // For now, I'll pass the files array as a special prop and also the text for compatibility.
      return selectedSource?.text || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-[#130e24] bg-opacity-60 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl flex flex-col"
    >
      <div className="mb-6 border-b border-purple-800/30 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Espacio de Trabajo</h2>
        <div className="flex items-center gap-2 text-purple-300 h-6">
          {selectedSource ? (
            <>
               <Layers className="w-4 h-4" />
               <span className="text-sm font-medium truncate">{getSourceTitle()}</span>
               <span className="text-xs text-gray-500 bg-purple-900/30 px-2 py-0.5 rounded">
                 {fileCount} fuente(s)
               </span>
            </>
          ) : (
             <span className="text-sm text-gray-500 italic">Añade archivos para comenzar el análisis</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {!selectedSource || fileCount === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
             <Sparkles className="w-16 h-16 mb-4 text-purple-400" />
             <p className="text-lg font-medium">Esperando contenido...</p>
             <p className="text-sm">Sube audios o documentos en el panel izquierdo</p>
           </div>
        ) : (
           <div className="space-y-8">
              {/* Context Info */}
              <div className="bg-[#0f0a1a] rounded-lg p-4 border border-purple-900/20 flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-300 mb-1">Contexto de Análisis</h4>
                    <p className="text-xs text-gray-400">
                      Se analizarán {fileCount} archivo(s) conjuntamente. La IA integrará la información de todas las fuentes para generar reportes unificados.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {files.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[10px] bg-purple-900/40 text-purple-200 px-2 py-0.5 rounded border border-purple-500/20 truncate max-w-[150px]">
                                {f.title}
                            </span>
                        ))}
                        {fileCount > 3 && <span className="text-[10px] text-gray-500">+{fileCount - 3} más</span>}
                    </div>
                  </div>
              </div>

              <div className="grid gap-6">
                {/* 
                   We pass 'files' array to the components.
                   They will handle generating the batch prompt.
                */}
                <GeneralSummary files={files} sourceTitle={getSourceTitle()} />
                <CompleteAnalysis files={files} sourceTitle={getSourceTitle()} />
              </div>

              {/* Added PromptViewer here at the bottom of the list */}
              <PromptViewer />
           </div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkspacePanel;
