
import React, { useState, useCallback } from 'react';
import SourcePanel from './SourcePanel';
import WorkspacePanel from './WorkspacePanel';

const MainLayout = () => {
  const [selectedSource, setSelectedSource] = useState(null);

  const handleSelectSource = useCallback((source) => {
    setSelectedSource(source);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0a1a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e1065] via-[#0f0a1a] to-[#0f0a1a] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
          <SourcePanel
            selectedSource={selectedSource}
            onSelectSource={handleSelectSource}
          />
          
          <WorkspacePanel selectedSource={selectedSource} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
