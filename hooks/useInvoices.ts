import { useState } from 'react';
import type { Invoice } from '~/lib/types/invoice';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoiceFormData = () => {
    const invoice = localStorage.getItem('invoice-form');
    return invoice ? JSON.parse(invoice) : null;
  };

  const saveInvoiceFormData = (data: Partial<Invoice>) => {
    localStorage.setItem('invoice-form', JSON.stringify(data));
  };

  const fetchInvoices = async () => {
    const invoices = localStorage.getItem('invoices');
    setInvoices(invoices ? JSON.parse(invoices) : []);
  };

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    // generate random alpha numeric id
    const id = Math.random().toString(36).slice(2, 9);

    // Add the new invoice to the beginning of the array
    // so it appears at the top of the list
    const updatedInvoices = [{ ...invoice, id }, ...invoices];
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  const updateInvoice = (id: string, updatedInvoice: Partial<Invoice>) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
    );
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  const deleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  return {
    invoices,
    getInvoiceFormData,
    saveInvoiceFormData,
    fetchInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
