// Shared CV section builder, used by both the full CV (/cv) and the short CV
// (/cv-short). Pass { short: true } for the condensed variant.
import pubData from '../../data/publications.json';
import talksData from '../../data/talks.json';
import cvJson from '../../data/cv.json';
import { teachingByRole } from './teaching';

export type Section = { key: string; label: string; content: string; id?: string };

const cv = cvJson as any;
const publications = (pubData.items || []) as any[];
const wip = (pubData.wip || []) as any[];
const talkEvents = ((talksData as any).items || talksData) as any[];

const isPublished = (i: any) => !i || i.published !== false;
const isOnCV = (i: any) => !i || i.cv !== false;

const contact = cv.contact || {};
export const contactHtml = [
  contact.website ? `<a href="https://${contact.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener">${contact.website}</a>` : '',
  contact.email ? `<a href="mailto:${contact.email}">${contact.email}</a>` : '',
].filter(Boolean).join('<span class="cv-contact-sep">·</span>');
export const contactAddr = contact.address || '';

// Publication grouping (shared with the Publications page)
export const PUB_GROUPS = [
  { types: ['Book'], label: 'Books' },
  { types: ['Article', 'Chapter', undefined, null, ''], label: 'Articles and Chapters' },
  { types: ['Editor'], label: 'Editor' },
  { types: ['Review'], label: 'Reviews' },
] as const;

function volStr(p: any) {
  if (p.volume || p.issue) {
    const vi = p.volume ? (p.issue ? `${p.volume}(${p.issue})` : p.volume) : `(${p.issue})`;
    return vi + (p.pages ? `: ${p.pages}` : '');
  }
  return p.pages || '';
}

function renderCVSection(items: { year?: string; detail: string; sub?: string; link?: string }[]) {
  if (!items.length) return '<p class="empty">Nothing to show yet.</p>';
  return items.map(item => `
    <div class="cv-item">
      <span class="cv-year">${item.year || ''}</span>
      <span class="cv-detail">
        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.detail}</a>` : item.detail}
        ${item.sub ? `<span class="cv-detail-sub">${item.sub}</span>` : ''}
      </span>
    </div>`).join('');
}

const yearVal = (y: any) => { const n = parseInt(String(y)); return isNaN(n) ? Infinity : n; };

export function buildSections(short = false): Record<string, Section> {
  // Education — short keeps just degree + institution; full lists thesis (first),
  // then supervisors/examiners, then the award nomination, each on its own line.
  const educationHtml = renderCVSection((cv.education || []).map((e: any) => {
    if (short) return { year: e.year, detail: `${e.degree}, ${e.institution}` };
    const supLabel = e.supervisors && e.supervisors.split(',').filter((s: string) => s.trim()).length > 1 ? 'Supervisors' : 'Supervisor';
    const exLabel = e.examiners && e.examiners.split(',').filter((s: string) => s.trim()).length > 1 ? 'Examiners' : 'Examiner';
    const parts = [
      e.thesis ? `Thesis: <em>${e.thesis}</em>` : '',
      e.supervisors ? `${supLabel}: ${e.supervisors}` : '',
      e.examiners ? `${exLabel}: ${e.examiners}` : '',
      e.note,
    ].filter(Boolean);
    return { year: e.year, detail: `${e.degree}, ${e.institution}`, sub: parts.join('<br>') };
  }));

  const employmentHtml = renderCVSection((cv.employment || []).map((e: any) => ({ year: e.year, detail: e.title, sub: e.institution })));
  const visitsHtml = renderCVSection((cv.visits || []).map((v: any) => ({ year: v.year, detail: `${v.title}, ${v.institution}`, sub: v.note || '' })));
  const commentariesHtml = renderCVSection((cv.commentaries || []).map((c: any) => ({ year: c.year, detail: c.title, sub: c.institution || '' })));
  const qualificationsHtml = renderCVSection((cv.qualifications || []).map((q: any) => ({ year: q.year, detail: q.title || q.description, sub: q.institution || '' })));
  const eventsHtml = renderCVSection((cv.events || []).map((e: any) => ({
    year: e.year,
    detail: `${e.event || e.title}${e.role ? ` <span class="cv-meta-sans">${e.role}</span>` : ''}`,
  })));

  const serviceHtml = renderCVSection([
    ...(cv.service || []).map((s: any) => ({ year: s.year, detail: s.description })),
    ...(cv.reviewer ? [{ year: 'Reviewer', detail: `<em>${cv.reviewer}</em>` }] : []),
  ]);

  // Publications (co-authors in brackets after the title, in the title font)
  const cvPubs = publications.filter(p => isPublished(p) && isOnCV(p));
  const publicationsContent = PUB_GROUPS.map(({ types, label }) => {
    const items = cvPubs.filter(p => (types as readonly any[]).indexOf(p.type || 'Article') > -1);
    if (!items.length) return '';
    const rows = items.map(p => {
      const vol = volStr(p);
      const journalPart = p.journal ? `<span class="cv-detail-inline"><em>${p.journal}</em></span>` : '';
      const volPart = vol ? `<span class="cv-detail-vol">${vol}.</span>` : '';
      const prize = p.prize ? `<span class="cv-prize">${p.prize}</span>` : '';
      const coa = p.coauthors ? ` (with ${p.coauthors})` : '';
      return `<div class="cv-item">
        <span class="cv-year">${p.year || ''}</span>
        <span class="cv-detail">
          <span class="cv-pub-title">${p.title}${coa}${/[.?!]$/.test(p.title) ? '' : '.'}</span>${journalPart ? ` ${journalPart}` : ''}${volPart ? ` ${volPart}` : ''}${prize}
        </span>
      </div>`;
    }).join('');
    return `<div class="cv-subsection-label">${label}</div>${rows}`;
  }).join('') || '<p class="empty">Nothing to show yet.</p>';

  // Work in progress (omitted from short CV)
  const wipGroupOrder: string[] = [];
  const wipGroupMap: Record<string, any[]> = {};
  wip.filter(p => isPublished(p) && isOnCV(p)).forEach(p => {
    const key = p.status || 'In preparation';
    if (!wipGroupMap[key]) { wipGroupMap[key] = []; wipGroupOrder.push(key); }
    wipGroupMap[key].push(p);
  });
  const wipContent = wipGroupOrder.length === 0 ? '' : wipGroupOrder.map(status => {
    const rows = wipGroupMap[status].map(p => `<div class="cv-item"><span class="cv-year"></span><span class="cv-detail">${p.title}.</span></div>`).join('');
    return `<div class="cv-subsection-label">${status}</div>${rows}`;
  }).join('');

  // Presentations — flat list of events (no paper titles). Short shows the
  // most recent eight; full shows all.
  let events = talkEvents.filter(p => isPublished(p) && isOnCV(p)).slice();
  events.sort((a, b) => yearVal(b.year) - yearVal(a.year));
  if (short) events = events.slice(0, 8);
  const presContent = events.length === 0 ? '<p class="empty">Nothing to show yet.</p>' : events.map((p: any) => {
    const tag = p.type === 'Invited' ? '<span class="talk-tag">Invited</span>' : p.type === 'Peer-Review' ? '<span class="talk-tag">Peer-reviewed</span>' : '';
    const where = [p.venue, p.institution].filter(Boolean).join(', ');
    return `<div class="cv-item"><span class="cv-year">${p.year || ''}</span><span class="cv-detail">${where}${tag}</span></div>`;
  }).join('');

  // Teaching (repeats collapsed; Supervision is a subsection, full CV only)
  const roleGroups = teachingByRole();
  let teachingContent = roleGroups.length === 0 ? '<p class="empty">Nothing to show yet.</p>' : roleGroups.map(g => {
    const rows = g.courses.map(c => {
      const meta = [
        c.years ? `<span class="cv-meta-mono">${c.years}</span>` : '',
        c.level ? `<span class="cv-meta-sans">${c.level}</span>` : '',
        c.note ? `<span class="cv-meta-sans">${c.note}</span>` : '',
      ].join('');
      return `<div class="cv-item"><span class="cv-year"></span><span class="cv-detail">${c.course}${meta}</span></div>`;
    }).join('');
    return `<div class="cv-subsection-label">${g.role}</div>${rows}`;
  }).join('');
  if (!short && (cv.supervision || []).length) {
    const rows = (cv.supervision as any[]).map((s: any) => {
      const txt = (typeof s === 'string' ? s : s.detail || '').replace(/\((×\d+)\)/g, '<span class="cv-count">($1)</span>');
      return `<div class="cv-item"><span class="cv-year"></span><span class="cv-detail">${txt}</span></div>`;
    }).join('');
    teachingContent += `<div class="cv-subsection-label">Supervision</div>${rows}`;
  }

  // Funding & awards — split into major research grants and other funding/awards
  const renderAwards = (list: any[]) => list.map((a: any) =>
    `<div class="cv-item"><span class="cv-year">${a.year || ''}</span><span class="cv-detail">${a.description}${a.amount ? ` <span class="cv-award-amount">${a.amount}</span>` : ''}</span></div>`
  ).join('');
  const allAwards = (cv.awards || []) as any[];
  const majorAwards = allAwards.filter(a => a.major);
  const otherAwards = allAwards.filter(a => !a.major);
  const awardsContent = allAwards.length === 0 ? '<p class="empty">Nothing to show yet.</p>'
    : (majorAwards.length ? `<div class="cv-subsection-label">Major research grants</div>${renderAwards(majorAwards)}` : '')
    + (otherAwards.length ? `<div class="cv-subsection-label">Other funding and awards</div>${renderAwards(otherAwards)}` : '');

  const referencesContent = (cv.references || []).length === 0 ? '' : (cv.references || []).map((r: any) =>
    `<div class="cv-ref"><div class="cv-ref-name">${r.name}</div><div class="cv-ref-detail">${r.title}</div><div class="cv-ref-detail">${r.institution}</div>${r.email ? `<div class="cv-ref-detail"><a href="mailto:${r.email}">${r.email}</a></div>` : ''}</div>`
  ).join('');

  const interestsContent = [
    cv.aos ? `<div class="cv-item"><span class="cv-year cv-area-label">AOS</span><span class="cv-detail">${cv.aos}</span></div>` : '',
    cv.aoc ? `<div class="cv-item"><span class="cv-year cv-area-label">AOC</span><span class="cv-detail">${cv.aoc}</span></div>` : '',
  ].filter(Boolean).join('') || '';

  const map: Record<string, Section> = {
    interests: { key: 'interests', label: 'Research interests', content: interestsContent },
    positions: { key: 'positions', label: 'Positions', content: employmentHtml },
    visits: { key: 'visits', label: 'International visits', content: visitsHtml },
    education: { key: 'education', label: 'Education', content: educationHtml },
    publications: { key: 'publications', label: 'Publications', content: publicationsContent },
    wip: { key: 'wip', label: 'Work in progress', content: wipContent },
    presentations: { key: 'presentations', id: 'cv-talks', label: short ? 'Selected presentations' : 'Presentations', content: presContent },
    commentaries: { key: 'commentaries', label: 'Invited commentaries', content: commentariesHtml },
    teaching: { key: 'teaching', label: 'Teaching', content: teachingContent },
    qualifications: { key: 'qualifications', label: 'Qualifications & training', content: qualificationsHtml },
    awards: { key: 'awards', label: 'Funding and Awards', content: awardsContent },
    events: { key: 'events', label: 'Event organising and service', content: eventsHtml },
    service: { key: 'service', label: 'Professional service', content: serviceHtml },
    references: { key: 'references', label: 'References', content: referencesContent },
  };

  ((cv.custom_sections || []) as any[]).forEach((cs: any) => {
    if (!cs.slot || !cs.title) return;
    map[cs.slot] = {
      key: cs.slot, label: cs.title,
      content: renderCVSection((cs.items || []).map((i: any) => ({ year: i.year, detail: i.detail, sub: i.sub, link: i.link }))),
    };
  });

  return map;
}

// Fixed, sensible order for the condensed CV.
export const SHORT_ORDER = ['interests', 'positions', 'education', 'publications', 'presentations', 'awards', 'teaching'];
