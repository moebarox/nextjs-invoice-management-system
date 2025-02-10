import { generateInvoiceNumber } from '~/utils/invoice';

describe('Date Utils', () => {
  describe('generateInvoiceNumber', () => {
    it('generate next invoice number', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-01-12T10:00:00'));

      const result = generateInvoiceNumber('INV20230112010');
      expect(result).toBe('INV20230112011');
    });
  });
});
