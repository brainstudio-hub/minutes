import React, { useState } from 'react';
import { Brain, Loader2, Download, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import frontendApiService from '@/services/frontendApiService';
import { generateAnalysisPDF } from '@/utils/pdfExport';
import { generateAnalysisHTML } from '@/utils/htmlExport';
import { downloadHTML } from '@/utils/downloadUtils';
import { toast } from 'react-hot-toast';
import { ANALYSIS_PROMPT_TEMPLATE } from '@/utils/promptTemplates';

const CompleteAnalysis = ({ files, content, sourceTitle }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if ((!files || files.length === 0) && !content) return;
    setLoading(true);
    setError(null);

    try {
       let combinedPrompt = "";

       if (files && files.length > 0) {
           combinedPrompt = await frontendApiService.generateBatchAnalysis(files);
       } else {
           combinedPrompt = content;
       }

       // Use the template from utils
       const prompt = ANALYSIS_PROMPT_TEMPLATE.replace('{{CONTENT}}', combinedPrompt.substring(0, 25000));
      
      const resultString = await frontendApiService.generateCompletion(prompt, "Eres un consultor de negocios senior experto que responde siempre en JSON y en Español.");
      const result = JSON.parse(resultString);
      setAnalysisData(result);
      
      toast.success("✅ Análisis unificado listo");

    } catch (err) {
      setError(err.message);
      console.error(err);
      toast.error("Error al generar el análisis");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!analysisData) return;
    toast.loading("Generando PDF...", { duration: 2000 });
    generateAnalysisPDF(analysisData, sourceTitle);
  };

  const handleDownloadHTML = () => {
    if (!analysisData) return;
    const htmlContent = generateAnalysisHTML(analysisData, sourceTitle);
    const filename = `Analisis_BrainStudio_${Date.now()}.html`;
    downloadHTML(htmlContent, filename);
    toast.success("Descargando reporte HTML...");
  };

  return (
    <div className="space-y-4">
      {!analysisData && !loading && (
        <Button 
          onClick={handleGenerate} 
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 h-12 shadow-lg shadow-indigo-900/20"
        >
          <Brain className="w-4 h-4 mr-2" />
          Generar Análisis Completo (Unificado)
        </Button>
      )}

      {loading && (
        <div className="p-8 text-center bg-[#1e1633] rounded-lg border border-purple-900/30">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto mb-3" />
          <p className="text-violet-200">Realizando análisis cruzado de fuentes...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 flex items-start gap-3">
           <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
           <div>
             <p className="font-semibold">Error al generar análisis</p>
             <p className="text-sm opacity-80">{error}</p>
             <Button variant="link" onClick={handleGenerate} className="text-red-300 p-0 h-auto mt-2 underline">Reintentar</Button>
           </div>
        </div>
      )}

      {analysisData && !loading && (
         <div className="bg-[#1e1633] rounded-lg p-6 border border-indigo-900/30 shadow-md space-y-4">
          <div className="flex flex-col items-center gap-4 text-center pb-4 border-b border-indigo-800/30">
            <div className="bg-indigo-500/10 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Análisis Estratégico Unificado</h3>
              <p className="text-sm text-gray-400">Recomendaciones basadas en todas las fuentes.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
               <Button 
                onClick={handleDownloadHTML} 
                className="flex-1 bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-100 border border-indigo-500/30"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Descargar HTML
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>
          
          <div className="text-left text-sm text-gray-300 space-y-2">
             <p><strong className="text-indigo-400">Insight:</strong> {analysisData.consulting_insights?.[0]?.substring(0, 100) || 'Análisis generado'}...</p>
            <p><strong className="text-indigo-400">Recomendaciones:</strong> {analysisData.recommendations?.length} generadas</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteAnalysis;