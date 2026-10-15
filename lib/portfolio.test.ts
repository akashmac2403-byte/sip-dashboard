import { describe, expect, it } from 'vitest';
import { portfolioMetrics, trailingReturn } from './portfolio';
import type { NavPoint } from './scoring';
const history: NavPoint[] = [
  { date: '15-10-2024', nav: 100 },
  { date: '15-10-2025', nav: 110 },
  { date: '15-10-2026', nav: 121 },
];
describe('portfolio calculations', () => {
  it('uses dated NAVs to estimate units and current value', () => {
    const result = portfolioMetrics([{ key: 'fund', amount: 1000, date: '2024-10-15' }], { fund: history }, new Date('2026-10-15T00:00:00'));
    expect(result.value).toBeCloseTo(1210);
    expect(result.xirr).toBeCloseTo(10, 0);
  });
  it('calculates trailing annualized-period return', () => {
    expect(trailingReturn(history, 1, new Date('2026-10-15T00:00:00'))).toBeCloseTo(10);
  });
  it('calculates shorter returns from the most recent available NAV date', () => {
    const shortHistory: NavPoint[] = [
      { date: '08-10-2026', nav: 100 },
      { date: '14-10-2026', nav: 105 },
      { date: '15-10-2026', nav: 110 },
    ];
    expect(trailingReturn(shortHistory, '1W')).toBeCloseTo(10);
    expect(trailingReturn(shortHistory, '1D')).toBeCloseTo(110 / 105 * 100 - 100);
  });
  it('annualizes 3-year and 5-year returns', () => {
    const longHistory: NavPoint[] = [
      { date: '15-10-2021', nav: 100 },
      { date: '15-10-2023', nav: 110 },
      { date: '15-10-2026', nav: 133.1 },
    ];
    expect(trailingReturn(longHistory, '3Y')).toBeCloseTo(6.56, 1);
    expect(trailingReturn(longHistory, '5Y')).toBeCloseTo(5.91, 1);
  });
  it('shows no return when history is too short', () => {
    expect(trailingReturn(history.slice(-1), 1)).toBeNull();
    expect(trailingReturn(history, '5Y', new Date('2026-10-15T00:00:00'))).toBeNull();
  });
});
