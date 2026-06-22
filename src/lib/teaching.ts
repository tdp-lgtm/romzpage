// Shared teaching grouping, used by the Teaching page and the CV.
// Collapses repeat offerings of the same course into one entry, listing the
// years it was taught (newest first), with "(×N)" when taught more than once
// in a single year.
import teachingData from '../../data/teaching.json';

const institutions = (((teachingData as any).items || teachingData) as any[])
  .filter((i: any) => !i || i.published !== false);

const ROLE_ORDER = ['Lecturer', 'Seminar Convenor', 'Teaching Assistant', 'Supervisor', 'Guest Lecture'];

// Collapse a specific study level to just "Undergraduate" or "Graduate".
export function levelLabel(levels?: string[]): string {
  const arr = (Array.isArray(levels) ? levels : levels ? [levels] : []).filter(Boolean);
  if (!arr.length) return '';
  const isUg = (l: string) => /undergrad|^ba\b|bachelor|1st year|first year/i.test(l) || l === 'Undergraduate';
  return arr.some(l => !isUg(l)) ? 'Graduate' : 'Undergraduate';
}

export type Course = { course: string; level: string; note?: string; years: string };
export type RoleGroup = { role: string; courses: Course[] };

function yearsLabel(yearCounts: Record<string, number>): string {
  const years = Object.keys(yearCounts).sort((a, b) => (parseInt(b) || 0) - (parseInt(a) || 0));
  return years.map(y => (yearCounts[y] > 1 ? `${y} (×${yearCounts[y]})` : y)).join(', ');
}

export function teachingByRole(): RoleGroup[] {
  // role -> courseKey -> { course, level, note, yearCounts }
  const roleMap: Record<string, Record<string, { course: string; level: string; note?: string; yearCounts: Record<string, number>; order: number }>> = {};
  let order = 0;
  institutions.forEach((inst: any) => (inst.entries || []).forEach((e: any) => {
    const role = e.role || 'Other';
    const level = levelLabel(e.levels);
    const key = `${e.course}||${level}||${e.note || ''}`;
    roleMap[role] = roleMap[role] || {};
    if (!roleMap[role][key]) roleMap[role][key] = { course: e.course, level, note: e.note, yearCounts: {}, order: order++ };
    const y = String(e.year || '').trim();
    if (y) roleMap[role][key].yearCounts[y] = (roleMap[role][key].yearCounts[y] || 0) + 1;
  }));

  const roles = [
    ...ROLE_ORDER.filter(r => roleMap[r]),
    ...Object.keys(roleMap).filter(r => !ROLE_ORDER.includes(r)),
  ];

  return roles.map(role => ({
    role,
    courses: Object.values(roleMap[role])
      .sort((a, b) => {
        const ay = Math.max(0, ...Object.keys(a.yearCounts).map(y => parseInt(y) || 0));
        const by = Math.max(0, ...Object.keys(b.yearCounts).map(y => parseInt(y) || 0));
        return by - ay || a.order - b.order;
      })
      .map(c => ({ course: c.course, level: c.level, note: c.note, years: yearsLabel(c.yearCounts) })),
  }));
}
