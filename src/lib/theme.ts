// Curated colour schemes, selectable by name in the CMS (Appearance).
// Order of values: paper / ink / fg2 / fg3 / rule / accent. Links use the
// accent unless a scheme sets `link`. 'Custom' falls through to the hex
// fields in theme.json.
export const SCHEMES: Record<string, {
  paper: string; ink: string; fg2: string; fg3: string; rule: string; accent: string;
  link?: string;
}> = {
  'Graphite':  { paper: '#F6F7F9', ink: '#111418', fg2: '#434A55', fg3: '#646B77', rule: '#DCE0E6', accent: '#434A55', link: '#111418' },
  'Graphite Crimson': { paper: '#F6F7F9', ink: '#111418', fg2: '#434A55', fg3: '#646B77', rule: '#DCE0E6', accent: '#A4162B' },
  'Offprint':  { paper: '#FFFFFF', ink: '#161616', fg2: '#474747', fg3: '#6B6B6B', rule: '#E3E3E3', accent: '#1F3F77' },
  'Loeb':      { paper: '#FFFFFF', ink: '#1E1F1D', fg2: '#4A4C48', fg3: '#6A6D68', rule: '#DCDFDA', accent: '#2F5D4A' },
  'Delft':     { paper: '#EAF0F6', ink: '#14213D', fg2: '#34466B', fg3: '#52617F', rule: '#C5D0DE', accent: '#1F4FA3' },
  'Porcelain': { paper: '#F4F4F2', ink: '#1C1E21', fg2: '#4D5158', fg3: '#6B7079', rule: '#E0E1DD', accent: '#355070' },
  'Oxford':    { paper: '#FAFAF8', ink: '#14161A', fg2: '#4A4F58', fg3: '#676C75', rule: '#E4E4E0', accent: '#1B365D' },
  'Plain':     { paper: '#FFFFFF', ink: '#111111', fg2: '#444444', fg3: '#6B6B6B', rule: '#E5E5E5', accent: '#1A56A0' },
};

// Font catalogue: named options available in the CMS. Every option is a
// book serif, apart from 'Ysabeau Office' (a Garamond-proportioned humanist
// sans meant only for figures: years, counts, amounts). Each Google font
// carries its own css2 URL; Base.astro loads only the selected ones.
// `sc: true` marks a small-caps family: labels set in it are lower-cased so
// they render as true small capitals rather than full caps.
export const FONTS: Record<string, { stack: string; googleUrl?: string; sc?: boolean }> = {
  'Same as text': { stack: 'var(--serif)' },
  'Literata': {
    stack: "'Literata', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300..700;1,7..72,400..500&display=swap',
  },
  'Source Serif 4': {
    stack: "'Source Serif 4', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,400..500&display=swap',
  },
  'Alegreya': {
    stack: "'Alegreya', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..700;1,400..500&display=swap',
  },
  'Alegreya SC': {
    stack: "'Alegreya SC', 'Alegreya', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@400;500&display=swap',
    sc: true,
  },
  'Castoro': {
    stack: "'Castoro', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&display=swap',
  },
  'Castoro Titling': {
    stack: "'Castoro Titling', 'Castoro', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Castoro+Titling&display=swap',
  },
  'Vollkorn': {
    stack: "'Vollkorn', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400..700;1,400..500&display=swap',
  },
  'Vollkorn SC': {
    stack: "'Vollkorn SC', 'Vollkorn', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600&display=swap',
    sc: true,
  },
  'EB Garamond': {
    stack: "'EB Garamond', Garamond, Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..500&display=swap',
  },
  'Libre Caslon Text': {
    stack: "'Libre Caslon Text', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap',
  },
  'Spectral': {
    stack: "'Spectral', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',
  },
  'Libre Baskerville': {
    stack: "'Libre Baskerville', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
  },
  'Georgia': {
    stack: 'Georgia, serif',
  },
  'Palatino': {
    stack: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
  },
  // Figures only (years, counts, amounts)
  'Ysabeau Office': {
    stack: "'Ysabeau Office', 'Literata', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Ysabeau+Office:wght@400;500&display=swap',
  },
};

function adjust(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map(v => clamp(v + amount).toString(16).padStart(2, '0')).join('');
}

// Role mapping (JSON keys kept for CMS compatibility):
//   font_display = Headings, font_serif = Text,
//   font_sans = Labels (section heads, nav), font_mono = Figures (years, counts).
export function getThemeCss(theme: Record<string, string>): string {
  const display = FONTS[theme.font_display]?.stack ?? FONTS['Literata'].stack;
  const serif   = (theme.font_serif !== 'Same as text' && FONTS[theme.font_serif]?.stack) || FONTS['Literata'].stack;
  const label   = FONTS[theme.font_sans]?.stack ?? 'var(--serif)';
  const figures = FONTS[theme.font_mono]?.stack ?? 'var(--serif)';
  const labelCase = FONTS[theme.font_sans]?.sc ? 'lowercase' : 'none';

  const scheme = SCHEMES[theme.color_scheme];
  const paper  = scheme?.paper  ?? (theme.color_paper  || '#F6F7F9');
  const ink    = scheme?.ink    ?? (theme.color_ink    || '#111418');
  const fg2    = scheme?.fg2    ?? (theme.color_fg2    || '#434A55');
  const fg3    = scheme?.fg3    ?? (theme.color_fg3    || '#646B77');
  const rule   = scheme?.rule   ?? (theme.color_rule   || '#DCE0E6');
  const accent = scheme?.accent ?? (theme.color_accent || '#A4162B');
  const link   = scheme?.link   ?? accent;

  const lines = [
    ':root {',
    `  --paper: ${paper};`,
    `  --paper-2: ${adjust(paper, 9)};`,
    `  --paper-sunk: ${adjust(paper, -9)};`,
    `  --ink: ${ink};`,
    `  --fg-1: ${ink};`,
    `  --fg-2: ${fg2};`,
    `  --fg-3: ${fg3};`,
    `  --rule: ${rule};`,
    `  --rule-strong: ${adjust(rule, -20)};`,
    `  --accent: ${accent};`,
    `  --accent-deep: ${adjust(accent, -25)};`,
    `  --second: var(--fg-3);`,
    `  --link: ${link};`,
    `  --link-deep: ${adjust(link, -25)};`,
    `  --display: ${display};`,
    `  --serif: ${serif};`,
    `  --label: ${label};`,
    `  --figures: ${figures};`,
    `  --sans: var(--label);`,
    `  --mono: var(--figures);`,
    `  --label-case: ${labelCase};`,
    '}',
  ];

  if (theme.link_underline === 'hover') {
    lines.push('.about-body a, .research-bio a, .workshop-description a, .cv-contact a, .pp-list .venue a { text-decoration-color: transparent; }');
    lines.push('.about-body a:hover, .research-bio a:hover, .workshop-description a:hover, .cv-contact a:hover { text-decoration-color: currentColor; }');
  } else if (theme.link_underline === 'none') {
    lines.push('a { text-decoration: none !important; }');
  }

  const hw = theme.heading_weight;
  if (hw) {
    lines.push(`.section-label { font-weight: ${hw}; }`);
  }

  return lines.join('\n');
}

export function getThemeFontLinks(theme: Record<string, string>): string[] {
  const keys = [theme.font_display, theme.font_serif, theme.font_sans, theme.font_mono];
  return [...new Set(keys.flatMap(k => FONTS[k]?.googleUrl ? [FONTS[k]!.googleUrl!] : []))];
}
