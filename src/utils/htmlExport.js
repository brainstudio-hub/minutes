
import { STYLES, GRADIENTS, ICONS, COLORS, SPACING, getBrainStudioLogoSVG, formatList } from './reportStyling';
import { createPercentageCircle, createBarChart, createMetricCard, createProgressBar } from './chartVisualization';

export const generateSummaryHTML = (data, sourceTitle) => {
  const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Data extraction with fallbacks
  const topics = data.meeting_topics || [];
  const details = data.discussion_details || [];
  const stats = data.key_stats || [];
  const actions = data.action_items || [];

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Resumen - ${sourceTitle}</title>
</head>
<body style="${STYLES.body}">
  <div style="${STYLES.container}">
    
    <!-- Cover Page -->
    <div style="${STYLES.coverPage}">
       <div>
         ${getBrainStudioLogoSVG()}
         <h1 style="${STYLES.coverTitle}">Resumen Ejecutivo<br><span style="color:${COLORS.primary}; font-weight:400;">Reunión & Acuerdos</span></h1>
         <div style="margin-top: ${SPACING.lg}; font-size: 18px; color: ${COLORS.textLight}; max-width: 600px;">
            Este documento resume los puntos clave, decisiones estratégicas y próximos pasos derivados de la sesión de trabajo.
         </div>
       </div>
       
       <div style="${STYLES.coverMeta}">
         <div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${COLORS.textLight}; margin-bottom: 4px;">Fecha</div>
            <div style="font-size: 16px; font-weight: 600; color: ${COLORS.dark};">${date}</div>
         </div>
         <div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${COLORS.textLight}; margin-bottom: 4px;">Fuente</div>
            <div style="font-size: 16px; font-weight: 600; color: ${COLORS.dark};">${sourceTitle}</div>
         </div>
       </div>
    </div>

    <!-- Content -->
    <div style="${STYLES.content}">
      
      <!-- Key Stats Row -->
      ${stats.length > 0 ? `
        <section style="${STYLES.section}">
          <div style="${STYLES.sectionTitleBox}">
             ${ICONS.chart}
             <h2 style="${STYLES.sectionTitle}">Métricas de la Sesión</h2>
          </div>
          <div style="${STYLES.cardGrid}">
             ${stats.map(stat => createMetricCard(stat.label, stat.value, stat.description, COLORS.primary)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Topics & Details Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: ${SPACING.md}; margin-bottom: ${SPACING.xl};">
        <section style="${STYLES.card}">
            <div style="${STYLES.sectionTitleBox}">
              ${ICONS.target}
              <h3 style="${STYLES.cardTitle}">Temas Tratados</h3>
            </div>
            ${formatList(topics)}
        </section>
        
        <section style="${STYLES.card}">
            <div style="${STYLES.sectionTitleBox}">
              ${ICONS.lightning}
              <h3 style="${STYLES.cardTitle}">Puntos Clave</h3>
            </div>
            ${formatList(details)}
        </section>
      </div>

      <!-- Action Items -->
      <section style="${STYLES.section}">
          <div style="${STYLES.sectionTitleBox}">
             ${ICONS.calendar}
             <h2 style="${STYLES.sectionTitle}">Próximos Pasos</h2>
          </div>
          <div style="display: flex; flex-direction: column; gap: ${SPACING.sm};">
             ${actions.map(action => `
                <div style="${STYLES.card} display: flex; justify-content: space-between; align-items: center; padding: ${SPACING.sm} ${SPACING.md};">
                   <div>
                      <div style="font-weight: 600; color: ${COLORS.dark};">${action.task}</div>
                      <div style="font-size: 12px; color: ${COLORS.textLight};">Responsable: ${action.owner || 'N/A'}</div>
                   </div>
                   <div style="font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 4px; background: ${action.priority === 'Alta' ? '#FEE2E2' : '#EFF6FF'}; color: ${action.priority === 'Alta' ? '#DC2626' : '#2563EB'};">
                      ${action.priority || 'General'}
                   </div>
                </div>
             `).join('')}
             ${actions.length === 0 ? '<div style="color:#6B7280; font-style:italic;">No se detectaron acciones específicas.</div>' : ''}
          </div>
      </section>

    </div>

    <!-- Footer -->
    <footer style="${STYLES.footer}">
      <span>BrainStudio Intelligence</span>
      <span>Confidencial</span>
    </footer>
  </div>
</body>
</html>
  `;
};

export const generateAnalysisHTML = (data, sourceTitle) => {
  const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Extract visual report data or fallback to standard data
  const visualData = data.visual_report_data || {};
  const findings = visualData.key_findings || [];
  const reality = visualData.reality_check || {};
  const horizons = visualData.horizons || [];
  
  // Fallbacks if visual data is missing (e.g. old prompt result)
  const standardInsights = data.consulting_insights || [];
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Análisis Estratégico - ${sourceTitle}</title>
</head>
<body style="${STYLES.body}">
  <div style="${STYLES.container}">
    
    <!-- Cover Page -->
    <div style="${STYLES.coverPage}">
       <div style="position: absolute; top: 40px; right: 40px;">
         <div style="font-size: 64px; font-weight: 800; color: ${COLORS.dark}; opacity: 0.05;">2026</div>
       </div>
       
       <div>
         ${getBrainStudioLogoSVG()}
         <h1 style="${STYLES.coverTitle}">Reporte de<br>Inteligencia Estratégica</h1>
         <div style="margin-top: ${SPACING.lg}; font-size: 20px; color: ${COLORS.text}; font-weight: 500; max-width: 700px; line-height: 1.5;">
            Análisis profundo de tendencias, realidades operativas y horizontes de innovación detectados.
         </div>
       </div>
       
       <div style="${STYLES.coverMeta}">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${COLORS.textLight}; letter-spacing: 1px;">Documento Origen</div>
            <div style="font-size: 14px; font-weight: 600; color: ${COLORS.dark}; margin-top: 4px;">${sourceTitle}</div>
          </div>
          <div>
             <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${COLORS.textLight}; letter-spacing: 1px;">Fecha de Análisis</div>
             <div style="font-size: 14px; font-weight: 600; color: ${COLORS.dark}; margin-top: 4px;">${date}</div>
          </div>
       </div>
    </div>

    <!-- Section 1: Key Findings (Hallazgos Clave) -->
    <div style="padding: ${SPACING.xl}; background: #fff;">
       <div style="${STYLES.sectionTitleBox}">
          ${ICONS.target}
          <h2 style="${STYLES.sectionTitle}">Hallazgos Clave - Lo que descubrimos</h2>
       </div>
       
       ${findings.length > 0 ? `
         <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; grid-template-rows: auto auto; gap: 16px;">
            <!-- Main Highlight Card -->
            <div style="${STYLES.card} ${STYLES.cardLime} grid-row: span 2;">
               <h3 style="${STYLES.cardTitle} font-size: 20px; margin-bottom: ${SPACING.md};">${findings[0].title}</h3>
               <p style="${STYLES.cardText} font-size: 15px; line-height: 1.7;">${findings[0].description}</p>
            </div>
            
            <!-- Secondary Cards -->
            ${findings.slice(1, 5).map(f => `
              <div style="${STYLES.card}">
                 <div style="margin-bottom: 12px;">${ICONS[f.icon] || ICONS.lightning}</div>
                 <h4 style="${STYLES.cardTitle}">${f.title}</h4>
                 <p style="${STYLES.cardText} font-size: 13px; color: ${COLORS.textLight};">${f.description}</p>
              </div>
            `).join('')}
         </div>
       ` : `
         <div style="${STYLES.card}">
            ${formatList(standardInsights)}
         </div>
       `}
    </div>

    <!-- Section 2: Reality Check (Realidad #3) -->
    <div style="padding: ${SPACING.xl}; background: #FAFAFA; border-top: 1px solid ${COLORS.border}; border-bottom: 1px solid ${COLORS.border};">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: ${SPACING.xl};">
         
         <!-- Left Content -->
         <div>
            <div style="font-size: 24px; font-weight: 700; color: ${COLORS.dark}; margin-bottom: ${SPACING.sm}; line-height: 1.2;">
               ${reality.title || "Realidad del Negocio"}
            </div>
            <div style="width: 60px; height: 4px; background: ${COLORS.primary}; margin-bottom: ${SPACING.lg};"></div>
            
            <h3 style="font-size: 18px; font-weight: 600; color: ${COLORS.dark}; margin-bottom: ${SPACING.sm};">La realidad</h3>
            <p style="font-size: 15px; color: ${COLORS.text}; line-height: 1.8; margin-bottom: ${SPACING.lg};">
               ${reality.description || "Análisis de la situación actual basado en la transcripción."}
            </p>
            
            <div style="display: flex; align-items: center; gap: 12px; margin-top: ${SPACING.xl};">
               <span style="font-size: 16px; font-weight: 500; color: ${COLORS.dark};">Lo que estamos viendo</span>
               <div style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid ${COLORS.dark}; display: flex; align-items: center; justify-content: center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </div>
            </div>
         </div>

         <!-- Right Metrics -->
         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${(reality.metrics || []).map((m, i) => {
               // Alternate between simple metric and circle chart for visual variety
               const isCircle = i % 2 !== 0; 
               const cleanVal = parseInt(m.value) || 0;
               
               return `
                 <div style="${STYLES.card} display: flex; flex-direction: column; justify-content: space-between;">
                    ${isCircle ? `
                       <div style="display: flex; gap: 12px; align-items: center;">
                          ${createPercentageCircle(cleanVal, COLORS.primary, 48)}
                          <div>
                             <div style="font-size: 24px; font-weight: 700; color: ${COLORS.dark};">${m.value}</div>
                             <div style="font-size: 11px; line-height: 1.2; color: ${COLORS.text}; margin-top: 2px;">${m.subtext}</div>
                          </div>
                       </div>
                    ` : `
                       <div>
                          <div style="font-size: 36px; font-weight: 300; color: ${COLORS.dark}; margin-bottom: 4px;">${m.value}</div>
                          <div style="font-size: 12px; font-weight: 600; color: ${COLORS.dark}; margin-bottom: 8px;">${m.label}</div>
                          <div style="font-size: 11px; color: ${COLORS.textLight}; line-height: 1.3;">${m.subtext}</div>
                          ${createProgressBar(cleanVal, COLORS.primary)}
                       </div>
                    `}
                 </div>
               `;
            }).join('')}
         </div>
      </div>
    </div>

    <!-- Section 3: Horizons (Anticipando lo Inevitable) -->
    <div style="padding: ${SPACING.xl}; background: #fff;">
       <div style="display: grid; grid-template-columns: 1fr 2fr; gap: ${SPACING.lg};">
          
          <!-- Left Purple Card -->
          <div style="${STYLES.card} ${STYLES.cardPurple} display: flex; flex-direction: column; justify-content: center;">
             <h2 style="font-size: 32px; font-weight: 700; margin-bottom: ${SPACING.md}; line-height: 1.1;">Anticipando<br>lo Inevitable</h2>
             <p style="font-size: 14px; opacity: 0.9; line-height: 1.6; margin-bottom: ${SPACING.lg};">
                Esta sección no es ciencia ficción. Es análisis de señales que ya están aquí.
                Organizamos estas tendencias en tres horizontes según su probabilidad de materializarse.
             </p>
             <div style="height: 1px; background: rgba(255,255,255,0.3); width: 100%;"></div>
          </div>

          <!-- Right Horizons List -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
             ${horizons.length > 0 ? horizons.map((h, i) => `
                <div style="${STYLES.card} background: ${i === 0 ? '#FAFAFA' : '#fff'}; border-left: 4px solid ${i === 0 ? COLORS.primary : COLORS.border};">
                   <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <span style="font-size: 20px; font-weight: 600; color: ${COLORS.primary};">${h.horizon}</span>
                      <span style="font-size: 12px; font-weight: 700; color: ${COLORS.textLight};">Probabilidad: ${h.probability}</span>
                   </div>
                   <div style="font-size: 14px; font-weight: 500; color: ${COLORS.textLight}; margin-bottom: 4px;">${h.title}</div>
                   <p style="font-size: 13px; color: ${COLORS.text}; margin: 0;">${h.description}</p>
                </div>
             `).join('') : `
                <div style="${STYLES.card}">
                   <p>No se generaron datos de horizontes específicos en este análisis.</p>
                </div>
             `}
          </div>

       </div>
       
       <!-- Why it matters footer -->
       <div style="margin-top: ${SPACING.lg}; padding: ${SPACING.md}; background: ${GRADIENTS.limeSoft}; border-radius: 12px; border: 1px solid ${COLORS.secondaryLight}; display: flex; align-items: center; gap: ${SPACING.md};">
          <div style="font-size: 18px; font-weight: 700; color: ${COLORS.dark}; white-space: nowrap;">¿Por qué importa?</div>
          <div style="font-size: 13px; color: ${COLORS.text}; line-height: 1.5;">
             Los líderes que anticipan estos cambios pueden experimentar temprano, aprender de errores en privado, y estar listos cuando estas tendencias se vuelvan obligatorias.
          </div>
       </div>
    </div>

    <!-- Footer -->
    <footer style="${STYLES.footer}">
       <span>BrainStudio 2026 Strategy Report</span>
       <span>Pagina 3</span>
    </footer>
  </div>
</body>
</html>
  `;
};
