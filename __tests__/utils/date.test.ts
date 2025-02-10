import { formatDate } from '~/utils/date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('formats date from date object', () => {
      const date = new Date('2023-01-01');
      const result = formatDate(date);
      expect(result).toBe('Jan 1, 2023');
    });

    it('formats date from string', () => {
      const result = formatDate('2024-05-07');
      expect(result).toBe('May 7, 2024');
    });
  });
});
