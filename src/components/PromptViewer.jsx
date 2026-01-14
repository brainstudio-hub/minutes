
import React, { useState } from 'react';
import { Copy, Check, Code, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUMMARY_PROMPT_TEMPLATE, ANALYSIS_PROMPT_TEMPLATE } from '@/utils/promptTemplates';
import { toast } from 'react-hot-toast';

const PromptViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'analysis'
  const [copied, setCopied] = useState(false);

  const activePrompt = activeTab === 'summary' ? SUMMARY_PROMPT_TEMPLATE : ANALYSIS_PROMPT_TEMPLATE;

  const handleCopy = () => {
    navigator.clipboard.writeText(activePrompt);
    setCopied(true);
    toast.success("Prompt copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-purple-900/30 rounded-lg bg-[#161026] overflow-hidden mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-purple-900/10 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-300">
          <Terminal className="w-5 h-5" />
          <span className="font-semibold text-sm">Transparencia de Prompts</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-purple-900/30">
          <p className="text-xs text-gray-400 my-4">
            Estos son los "system prompts" exactos utilizados para instruir a la IA. 
            La etiqueta <code className="bg-purple-900/30 text-purple-200 px-1 rounded">{ "{{CONTENT}}" }</code> se reemplaza dinámicamente con el texto de sus documentos.
          </p>

          <div className="flex gap-2 mb-4 border-b border-purple-900/20 pb-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`text-sm px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'summary' 
                  ? 'bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-purple-900/20'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`text-sm px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'analysis' 
                  ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-indigo-900/20'
              }`}
            >
              Análisis
            </button>
          </div>

          <div className="relative group">
            <div className="absolute right-2 top-2 z-10">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 w-8 p-0 bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white backdrop-blur-sm rounded-md border border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <pre className="text-xs font-mono bg-[#0f0a1a] p-4 rounded-lg overflow-x-auto text-gray-300 border border-purple-500/10 leading-relaxed custom-scrollbar max-h-[300px]">
              {activePrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptViewer;
