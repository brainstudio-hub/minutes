import React, { useState } from 'react';
import { FileText, Loader2, Download, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import frontendApiService from '@/services/frontendApiService';
import { generateSummaryPDF } from '@/utils/pdfExport';
import { generateSummaryHTML } from '@/utils/htmlExport';
import { downloadHTML } from '@/utils/downloadUtils';
import { toast } from 'react-hot-toast';
import { SUMMARY_PROMPT_TEMPLATE } from '@/utils/promptTemplates';

const GeneralSummary = ({ files, content, sourceTitle }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    // Check inputs
    if ((!files || files.length === 0) && !content) return;
    
    setLoading(true);
    setError(null);

    try {
      let combinedPrompt = "";

      if (files && files.length > 0) {
          // Use batch helper
          combinedPrompt = await frontendApiService.generateBatchAnalysis(files);
      } else {
          // Fallback to legacy single content string
          combinedPrompt = content;
      }

      // Use the template from utils
      const prompt = SUMMARY_PROMPT_TEMPLATE.replace('{{CONTENT}}', combinedPrompt.substring(0, 25000));
      
      const resultString = await frontendApiService.generateCompletion(prompt, "Eres un asistente administrativo experto que extrae hechos objetivos y responde siempre en JSON y en Español.");
      const result = JSON.parse(resultString);
      setSummaryData(result);
      
      toast.success("✅ Resumen unificado listo");

    } catch (err) {
      setError(err.message);
      console.error(err);
      toast.error("Error al generar el resumen");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!summaryData) return;
    toast.loading("Generando PDF...", { duration: 2000 });
    generateSummaryPDF(summaryData, sourceTitle);
  };

  const handleDownloadHTML = () => {
    if (!summaryData) return;
    const htmlContent = generateSummaryHTML(summaryData, sourceTitle);
    const filename = `Resumen_BrainStudio_${Date.now()}.html`;
    downloadHTML(htmlContent, filename);
    toast.success("Descargando reporte HTML...");
  };

  return (
    <div className="space-y-4">
      {!summaryData && !loading && (
        <Button 
          onClick={handleGenerate} 
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 h-12 shadow-lg shadow-purple-900/20"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generar Resumen General (Unificado)
        </Button>
      )}

      {loading && (
        <div className="p-8 text-center bg-[#1e1633] rounded-lg border border-purple-900/30">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-3" />
          <p className="text-purple-200">Analizando múltiples fuentes...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 flex items-start gap-3">
           <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
           <div>
             <p className="font-semibold">Error al generar resumen</p>
             <p className="text-sm opacity-80">{error}</p>
             <Button variant="link" onClick={handleGenerate} className="text-red-300 p-0 h-auto mt-2 underline">Reintentar</Button>
           </div>
        </div>
      )}

      {summaryData && !loading && (
        <div className="bg-[#1e1633] rounded-lg p-6 border border-purple-900/30 shadow-md space-y-4">
          <div className="flex flex-col items-center gap-4 text-center pb-4 border-b border-purple-800/30">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Resumen Unificado</h3>
              <p className="text-sm text-gray-400">Datos integrados correctamente.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
               <Button 
                onClick={handleDownloadHTML} 
                className="flex-1 bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 border border-purple-500/30"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Descargar HTML
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>
          
          <div className="text-left text-sm text-gray-300 space-y-2">
            <p><strong className="text-purple-400">Temas:</strong> {summaryData.meeting_topics?.join(", ")}</p>
            {summaryData.participants?.length > 0 && (
                 <p><strong className="text-purple-400">Participantes:</strong> {summaryData.participants.length}</p>
            )}
            {summaryData.meeting_duration && (
                 <p><strong className="text-purple-400">Duración:</strong> {summaryData.meeting_duration}</p>
            )}
            {summaryData.agreements?.length > 0 && (
                 <p><strong className="text-purple-400">Acuerdos:</strong> {summaryData.agreements.length} identificados</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSummary;
