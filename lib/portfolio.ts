import type { NavPoint } from './scoring';

export type PortfolioEntry = { key: string; amount: number; date: string };
const dateValue = (value: string) => new Date(`${value}T00:00:00`).getTime();
const navDateValue = (value: string) => {
  const [day, month, year] = value.split('-');
  return new Date(`${year}-${month}-${day}T00:00:00`).getTime();
};

function navOnOrAfter(history: NavPoint[], date: string) {
  const target = dateValue(date);
  return history.find(point => navDateValue(point.date) >= target)?.nav
    ?? history.at(-1)?.nav
    ?? 0;
}

export function portfolioMetrics(entries: PortfolioEntry[], historyByKey: Record<string, NavPoint[]>, asOf = new Date()) {
  const flows: { date: number; amount: number }[] = [];
  let value = 0;
  for (const entry of entries) {
    const history = historyByKey[entry.key] ?? [];
    const purchaseNav = navOnOrAfter(history, entry.date);
    const latestNav = history.at(-1)?.nav ?? 0;
    if (purchaseNav <= 0 || latestNav <= 0) continue;
    value += (entry.amount / purchaseNav) * latestNav;
    flows.push({ date: dateValue(entry.date), amount: -entry.amount });
  }
  if (!flows.length || value <= 0) return { value: entries.reduce((sum, entry) => sum + entry.amount, 0), xirr: null as number | null };
  flows.push({ date: asOf.getTime(), amount: value });
  const first = Math.min(...flows.map(flow => flow.date));
  const npv = (rate: number) => flows.reduce((sum, flow) => sum + flow.amount / Math.pow(1 + rate, (flow.date - first) / (365.25 * 86400000)), 0);
  let low = -0.9999, high = 10;
  if (npv(low) * npv(high) > 0) return { value, xirr: null as number | null };
  for (let i = 0; i < 120; i++) {
    const mid = (low + high) / 2;
    if (npv(mid) > 0) low = mid; else high = mid;
  }
  return { value, xirr: (low + high) / 2 * 100 };
}

export type ReturnPeriod = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

const periodDays: Record<ReturnPeriod, number> = {
  '1D': 1, '1W': 7, '1M': 30, '3M': 91, '6M': 182, '1Y': 365, '3Y': 1095, '5Y': 1826,
};

export function latestNav(history: NavPoint[]) {
  return history.at(-1) ?? null;
}

export function trailingReturn(history: NavPoint[], period: number | ReturnPeriod, asOf?: Date) {
  if (history.length < 2) return null;
  const current = history.at(-1)!;
  const days = typeof period === 'number' ? period * 365.25 : periodDays[period];
  const target = (asOf?.getTime() ?? navDateValue(current.date)) - days * 86400000;
  const reference = history.find(point => navDateValue(point.date) >= target);
  if (!reference || reference.nav <= 0) return null;
  return (current.nav / reference.nav - 1) * 100;
}
