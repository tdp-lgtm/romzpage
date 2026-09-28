// Typographic clean-up applied to text nodes only (never inside tags).
export function smarten(text: string): string {
  return text
    .replace(/(\d)-(\d)/g, '$1–$2')
    .replace(/ - /g, ' – ')
    .replace(/(^|[\s(\[—–>])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[—–])'/g, '$1‘')
    .replace(/'/g, '’');
}

export function smartenHtml(html: string): string {
  // Split into tags and text; only touch the text.
  return html.split(/(<[^>]+>)/g).map(part => (part.startsWith('<') ? part : smarten(part))).join('');
}

export function prepHtml(text: string | undefined): string {
  let html = text || '';
  if (!/<\w+/.test(html)) {
    html = html.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  }
  // Leftovers from the old Wix site: stray underline tags and classes.
  html = html
    .replace(/<\/?u>/g, '')
    .replace(/\s*class="wixui-rich-text__text"/g, '')
    // Pasted non-breaking spaces glue words together and wreck line breaks.
    .replace(/&nbsp;(?=<\/p>)/g, '')
    .replace(/([A-Za-z,.;:])&nbsp;(?=[A-Za-z])/g, '$1 ');
  html = smartenHtml(html);
  // Add target/rel to external links that don't already have a target.
  html = html.replace(
    /<a (?![^>]*\btarget=)([^>]*href=["']https?:\/\/[^"']*["'][^>]*)>/g,
    '<a target="_blank" rel="noopener" $1>'
  );
  return html;
}

// Publication / talk titles: trim and drop a trailing full stop.
export function cleanTitle(t: string | undefined): string {
  return smarten((t || '').trim().replace(/\s*\.$/, ''));
}

// Italicise only the container title of a venue string: "Oxford Handbook …,
// ed. Betzler & Stroud (Oxford: OUP)" keeps editors and publisher in roman,
// and a bare "Place: Publisher" stays roman entirely.
export function venueHtml(journal: string | undefined): string {
  const j = smarten((journal || '').trim());
  if (!j) return '';
  if (/^[^,()]+:\s/.test(j)) return j;
  const m = j.match(/^(.*?)((?:,\s*(?:vol|eds?)\.\s|\s\().*)$/);
  return m ? `<em>${m[1]}</em>${m[2]}` : `<em>${j}</em>`;
}
