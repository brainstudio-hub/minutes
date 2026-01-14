
// Centralized storage for AI prompts to ensure consistency and transparency

export const SUMMARY_PROMPT_TEMPLATE = `
Analiza el siguiente contenido integrado de múltiples fuentes y genera un resumen ejecutivo visualmente estructurado.

Responde estrictamente en formato JSON.

Estructura requerida:
{
  "meeting_topics": ["Tema tratado 1", "Tema tratado 2"],
  "discussion_details": ["Punto clave 1", "Punto clave 2"],
  "agreed_dates": ["Fecha 1: Contexto", "Fecha 2: Contexto"],
  "responsible_parties": ["Nombre 1: Responsabilidad", "Nombre 2: Responsabilidad"],
  
  "key_stats": [
    {"label": "Participación", "value": "85%", "description": "Asistencia registrada"},
    {"label": "Duración", "value": "45m", "description": "Tiempo efectivo"}
  ],
  "action_items": [
    {"task": "Acción inmediata requerida", "priority": "Alta", "owner": "Nombre"},
    {"task": "Seguimiento posterior", "priority": "Media", "owner": "Nombre"}
  ]
}

{{CONTENT}}
`;

export const ANALYSIS_PROMPT_TEMPLATE = `
Realiza un análisis consultivo profundo e identifica tendencias clave, "horizontes" de innovación y "realidades" actuales del negocio basándote en la información.

Responde estrictamente en formato JSON.

Estructura requerida:
{
  "meeting_topics": ["Tema 1", "Tema 2"],
  "consulting_insights": ["Insight estratégico 1", "Conclusión 2"],
  "observations": ["Observación crítica 1", "Observación 2"],
  "recommendations": [
     {"title": "Estrategia Recomendada", "description": "Pasos tácticos.", "priority": "Alta"},
     {"title": "Estrategia Recomendada", "description": "Pasos tácticos.", "priority": "Media"}
  ],
  "opportunities": [
     {"title": "Oportunidad Detectada", "description": "Descripción del potencial."}
  ],

  "visual_report_data": {
    "key_findings": [
      {
        "title": "Hallazgo Principal (Titular Impactante)",
        "description": "Descripción breve y potente del hallazgo más importante.",
        "highlight": true
      },
      {
        "title": "Hallazgo Secundario 1",
        "description": "Dato o tendencia relevante.",
        "icon": "lightning"
      },
      {
        "title": "Hallazgo Secundario 2",
        "description": "Dato o tendencia relevante.",
        "icon": "settings"
      },
      {
        "title": "Hallazgo Secundario 3",
        "description": "Dato o tendencia relevante.",
        "icon": "chart"
      },
      {
        "title": "Hallazgo Secundario 4",
        "description": "Dato o tendencia relevante.",
        "icon": "users"
      }
    ],
    "reality_check": {
      "title": "Realidad del Negocio: Titular",
      "description": "Párrafo explicativo detallado sobre la situación actual, retos y contexto operativo detectado en la transcripción/documentos.",
      "metrics": [
        {"label": "Adopción", "value": "70%", "subtext": "De las empresas lo usan"},
        {"label": "Crecimiento", "value": "24%", "subtext": "Incremento anual"},
        {"label": "Eficiencia", "value": "67%", "subtext": "Mejora en procesos"},
        {"label": "Riesgo", "value": "34%", "subtext": "Exposición actual"}
      ]
    },
    "horizons": [
      {
        "horizon": "Horizonte 1",
        "title": "Alta Probabilidad (2024-2025)",
        "description": "Tendencias o acciones que ya están ocurriendo o son inminentes. Inversiones seguras.",
        "probability": "80-90%"
      },
      {
        "horizon": "Horizonte 2",
        "title": "Probabilidad Media (2026-2027)",
        "description": "Tecnologías o estrategias emergentes que requieren preparación pero tienen incertidumbre.",
        "probability": "40-60%"
      },
      {
        "horizon": "Horizonte 3",
        "title": "Baja Probabilidad (2028+)",
        "description": "Visión futurista, apuestas a largo plazo con alto riesgo pero alto retorno.",
        "probability": "15-25%"
      }
    ]
  }
}

INSTRUCCIONES DE GENERACIÓN:
1. Extrae porcentajes y métricas específicas del texto si existen. Si no, estímalo basado en el contexto o usa "N/A".
2. Para "visual_report_data.reality_check.metrics", genera 4 métricas clave visualizables (porcentajes) que resuman el estado actual.
3. Para "horizons", clasifica las iniciativas en Corto (H1), Mediano (H2) y Largo Plazo (H3).

{{CONTENT}}
`;
