
// Utilities for HTML and PDF Report Styling

export const COLORS = {
  primary: '#6B46C1', // Purple brand color
  primaryLight: '#805AD5',
  secondary: '#84CC16', // Lime Green accent
  secondaryLight: '#A3E635',
  dark: '#1F2937', // Dark Gray for headings
  textDark: '#111827',
  text: '#374151',
  textLight: '#6B7280',
  border: '#E5E7EB',
  bg: '#F9FAFB',
  white: '#FFFFFF',
  
  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6'
};

export const GRADIENTS = {
  header: 'linear-gradient(135deg, #ffffff 0%, #F3F4F6 100%)',
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
  limeSoft: 'linear-gradient(135deg, #ECFCCB 0%, #FFFFFF 100%)',
  purpleSoft: 'linear-gradient(135deg, #F3E8FF 0%, #FFFFFF 100%)',
  blueSoft: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)',
  graySoft: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
  cover: `linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 50%, #ECFCCB 100%)`
};

export const TYPOGRAPHY = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  h1: "font-size: 36px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;",
  h2: "font-size: 24px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.2;",
  h3: "font-size: 18px; font-weight: 600; line-height: 1.3;",
  body: "font-size: 14px; line-height: 1.6; color: #374151;",
  small: "font-size: 12px; line-height: 1.5; color: #6B7280;"
};

export const SPACING = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px'
};

export const STYLES = {
  // Global
  body: `font-family: ${TYPOGRAPHY.fontFamily}; background-color: #E5E5E5; margin: 0; padding: 40px; -webkit-font-smoothing: antialiased;`,
  container: "max-width: 900px; margin: 0 auto; background: #ffffff; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden; position: relative;",
  
  // Header / Cover
  coverPage: `height: 800px; padding: ${SPACING.xxl}; display: flex; flex-direction: column; justify-content: space-between; background: ${GRADIENTS.cover}; position: relative;`,
  coverHeader: "display: flex; justify-content: space-between; align-items: flex-start;",
  coverTitle: `${TYPOGRAPHY.h1} color: ${COLORS.dark}; margin-top: ${SPACING.xl}; max-width: 80%;`,
  coverMeta: `display: flex; gap: ${SPACING.md}; margin-top: ${SPACING.lg}; border-top: 1px solid ${COLORS.textDark}; padding-top: ${SPACING.md};`,
  
  // Standard Header
  header: `background: ${COLORS.white}; padding: ${SPACING.lg} ${SPACING.xl}; border-bottom: 1px solid ${COLORS.border}; display: flex; justify-content: space-between; align-items: center;`,
  reportBadge: `background: ${COLORS.primary}; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;`,
  
  // Sections
  content: `padding: ${SPACING.xl};`,
  section: `margin-bottom: ${SPACING.xl}; page-break-inside: avoid;`,
  sectionTitleBox: `margin-bottom: ${SPACING.md}; display: flex; align-items: center; gap: ${SPACING.sm};`,
  sectionTitle: `${TYPOGRAPHY.h2} color: ${COLORS.dark}; margin: 0;`,
  
  // Cards
  cardGrid: "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;",
  card: `background: ${COLORS.white}; border-radius: 16px; padding: ${SPACING.md}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid ${COLORS.border}; transition: all 0.2s;`,
  cardLime: `background: ${GRADIENTS.limeSoft}; border: 1px solid #D9F99D;`,
  cardPurple: `background: ${GRADIENTS.primary}; color: white; border: none;`,
  
  // Typography helpers
  cardTitle: `${TYPOGRAPHY.h3} margin-bottom: ${SPACING.xs}; display: block;`,
  cardText: `${TYPOGRAPHY.body} margin: 0;`,
  
  // Footer
  footer: `background: ${COLORS.white}; border-top: 1px solid ${COLORS.border}; padding: ${SPACING.md} ${SPACING.xl}; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: ${COLORS.textLight};`,
};

export const formatList = (items) => {
  if (!items) return '';
  const listItems = Array.isArray(items) ? items : [items];
  
  return `
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${listItems.map(item => `
        <li style="position: relative; padding-left: 16px; margin-bottom: 8px; font-size: 14px; color: ${COLORS.text};">
          <span style="position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; background: ${COLORS.secondary};"></span>
          ${item}
        </li>
      `).join('')}
    </ul>
  `;
};

export const getBrainStudioLogoSVG = () => `
<img src="https://horizons-cdn.hostinger.com/1af5ba22-48aa-4ebb-9e41-db8e711d6980/f994308f948d72e8aace1a0365fab777.png" alt="Brain Studio" style="width: 140px; height: auto; display: block;" />
`;

export const ICONS = {
  logoSmall: `<div style="width:24px; height:24px; background:${COLORS.primary}; border-radius:4px;"></div>`, // Placeholder if needed
  target: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.secondary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  bulb: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 9.5 6 4.65 4.65 0 0 0 8 11.5c0 1.4 1 2.35 1.5 3"></path></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.info}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textLight}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  lightning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.dark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.dark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
};
