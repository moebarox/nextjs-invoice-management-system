import { formatCurrency } from '~/utils/number';

describe('Number Utils', () => {
  describe('formatCurrency', () => {
    it('formats currency', () => {
      const result = formatCurrency(10_000);
      expect(result).toMatch(/Rp\s10\.000/);
    });
  });
});
