// Curated color schemes: full palettes selectable by name in the CMS.
// 'Custom' falls through to the individual hex fields in theme.json.
// `second` and `link` are optional accent hues (used by the Salon scheme);
// schemes that omit them fall back to the main accent.
export const SCHEMES: Record<string, {
  paper: string; ink: string; fg2: string; fg3: string; rule: string; accent: string;
  second?: string; link?: string;
}> = {
  'Salon':        { paper: '#EDEAE2', ink: '#211C16', fg2: '#544C42', fg3: '#897F70', rule: '#DBD6CA', accent: '#9A3B24', second: '#A9762E', link: '#2E6A66' },
  'Reading Room': { paper: '#F5F1E8', ink: '#211C16', fg2: '#574F44', fg3: '#8C8474', rule: '#E3DBCB', accent: '#7B2E2E' },
  'Ivory':        { paper: '#FAF7F0', ink: '#1F1B16', fg2: '#5A5246', fg3: '#948B7B', rule: '#E8E2D4', accent: '#8A3324' },
  'Porcelain':    { paper: '#F4F4F2', ink: '#1C1E21', fg2: '#4D5158', fg3: '#878C94', rule: '#E0E1DD', accent: '#355070' },
  'Oxford':       { paper: '#FAFAF8', ink: '#14161A', fg2: '#4A4F58', fg3: '#8A8F98', rule: '#E4E4E0', accent: '#1B365D' },
  'Sage':         { paper: '#F3F4EE', ink: '#20231C', fg2: '#535848', fg3: '#8B907D', rule: '#DFE2D2', accent: '#4A5D43' },
  'Plain':        { paper: '#FFFFFF', ink: '#111111', fg2: '#444444', fg3: '#888888', rule: '#E5E5E5', accent: '#1A56A0' },
};

// Font catalogue: named options available in the CMS.
// Each Google font carries its own URL; Base.astro loads only the selected
// ones via parallel <link> tags (faster than a serial @import in the CSS).
export const FONTS: Record<string, { stack: string; googleUrl?: string }> = {
  // ── Display / heading serifs ────────────────────────────────────────────────
  'Cormorant Garamond': {
    stack: "'Cormorant Garamond', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
  },
  'Playfair Display': {
    stack: "'Playfair Display', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
  },
  'Fraunces': {
    stack: "'Fraunces', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&display=swap',
  },
  'Bodoni Moda': {
    stack: "'Bodoni Moda', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&display=swap',
  },
  // ── Serif (body) ────────────────────────────────────────────────────────────
  'Newsreader': {
    stack: "'Newsreader', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap',
  },
  'Spectral': {
    stack: "'Spectral', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',
  },
  'Georgia': {
    stack: 'Georgia, serif',
  },
  'Palatino': {
    stack: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
  },
  'Libre Baskerville': {
    stack: "'Libre Baskerville', Georgia, serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
  },
  // ── Sans ──────────────────────────────────────────────────────────────────
  'Archivo': {
    stack: "'Archivo', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap',
  },
  'Hanken Grotesk': {
    stack: "'Hanken Grotesk', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap',
  },
  'System': {
    stack: 'system-ui, sans-serif',
  },
  'Inter': {
    stack: "'Inter', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&display=swap',
  },
  'Source Sans 3': {
    stack: "'Source Sans 3', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap',
  },
  // ── Mono ──────────────────────────────────────────────────────────────────
  'Space Mono': {
    stack: "'Space Mono', ui-monospace, monospace",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
  },
  'IBM Plex Mono': {
    stack: "'IBM Plex Mono', ui-monospace, monospace",
    googleUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap',
  },
  'JetBrains Mono': {
    stack: "'JetBrains Mono', ui-monospace, monospace",
    googleUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap',
  },
  'System Mono': {
    stack: 'ui-monospace, Menlo, monospace',
  },
};

function adjust(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map(v => clamp(v + amount).toString(16).padStart(2, '0')).join('');
}

export function getThemeCss(theme: Record<string, string>): string {
  const display = FONTS[theme.font_display]?.stack ?? FONTS['Cormorant Garamond'].stack;
  const serif  = FONTS[theme.font_serif]?.stack  ?? FONTS['Newsreader'].stack;
  const sans   = FONTS[theme.font_sans]?.stack   ?? FONTS['Archivo'].stack;
  const mono   = FONTS[theme.font_mono]?.stack   ?? FONTS['Space Mono'].stack;

  const scheme = SCHEMES[theme.color_scheme];
  const paper  = scheme?.paper  ?? (theme.color_paper  || '#EDEAE2');
  const ink    = scheme?.ink    ?? (theme.color_ink    || '#211C16');
  const fg2    = scheme?.fg2    ?? (theme.color_fg2    || '#544C42');
  const fg3    = scheme?.fg3    ?? (theme.color_fg3    || '#897F70');
  const rule   = scheme?.rule   ?? (theme.color_rule   || '#DBD6CA');
  const accent = scheme?.accent ?? (theme.color_accent || '#9A3B24');
  const second = scheme?.second ?? (theme.color_second || accent);
  const link   = scheme?.link   ?? (theme.color_link   || accent);

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
    `  --second: ${second};`,
    `  --link: ${link};`,
    `  --link-deep: ${adjust(link, -25)};`,
    `  --display: ${display};`,
    `  --serif: ${serif};`,
    `  --sans: ${sans};`,
    `  --mono: ${mono};`,
    '}',
  ];

  if (theme.link_underline === 'always') {
    lines.push('a { text-decoration: underline; }');
  } else if (theme.link_underline === 'none') {
    lines.push('a { text-decoration: none !important; }');
  }

  const hw = theme.heading_weight;
  if (hw && hw !== '400') {
    lines.push(`h1, h2, h3, h4 { font-weight: ${hw}; }`);
  }

  return lines.join('\n');
}

export function getThemeFontLinks(theme: Record<string, string>): string[] {
  const keys = [theme.font_display, theme.font_serif, theme.font_sans, theme.font_mono];
  return [...new Set(keys.flatMap(k => FONTS[k]?.googleUrl ? [FONTS[k]!.googleUrl!] : []))];
}
