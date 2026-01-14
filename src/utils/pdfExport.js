
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generateSummaryHTML, generateAnalysisHTML } from './htmlExport';
import { STYLES } from './reportStyling';

const generatePDFFromHTML = async (htmlString, filename) => {
  // Create a container for the HTML
  // We use a container to render the HTML content off-screen but visible to the DOM
  const container = document.createElement('div');
  
  // Apply body styles from reportStyling to the container to ensure consistent look
  // We append essential positioning styles to keep it off-screen but renderable
  container.style.cssText = `
    ${STYLES.body}
    position: absolute;
    left: -9999px;
    top: 0;
    width: 800px; /* Fixed width A4-like */
    z-index: -9999;
  `;
  
  // Inject HTML
  // Note: innerHTML strips <html>, <head>, and <body> tags, leaving just the content.
  // This is why we applied STYLES.body to the container above.
  container.innerHTML = htmlString;
  
  document.body.appendChild(container);

  try {
    // Wait for images and fonts to settle
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Convert DOM to canvas
    const canvas = await html2canvas(container, {
      scale: 2, // 2x scale for better resolution (Retina-like)
      useCORS: true, // Allow cross-origin images
      logging: false,
      backgroundColor: '#E5E5E5', // Match the body background color
      windowWidth: 800
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Initialize PDF (A4 Portrait)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit A4 width
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    
    // Add subsequent pages if content overflows
    while (heightLeft > 0) {
      position -= pdfHeight; // Move the image up to show the next section
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    
    pdf.save(filename);
    
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Hubo un error generando el PDF. Por favor intente nuevamente.");
  } finally {
    // Cleanup
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};

export const generateSummaryPDF = (data, sourceTitle) => {
  const htmlContent = generateSummaryHTML(data, sourceTitle);
  const filename = `Resumen_BrainStudio_${Date.now()}.pdf`;
  generatePDFFromHTML(htmlContent, filename);
};

export const generateAnalysisPDF = (data, sourceTitle) => {
  const htmlContent = generateAnalysisHTML(data, sourceTitle);
  const filename = `Analisis_BrainStudio_${Date.now()}.pdf`;
  generatePDFFromHTML(htmlContent, filename);
};
