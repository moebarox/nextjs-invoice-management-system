import { useState } from 'react';
import type { Invoice, InvoiceFormData } from '~/lib/types/invoice';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoiceFormData = () => {
    const invoice = localStorage.getItem('invoice-form');
    return invoice ? JSON.parse(invoice) : null;
  };

  const saveInvoiceFormData = (data: Partial<InvoiceFormData>) => {
    localStorage.setItem('invoice-form', JSON.stringify(data));
  };

  const deleteInvoiceFormData = () => {
    localStorage.removeItem('invoice-form');
  };

  const getInvoiceById = (id: string): Invoice | undefined => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const fetchInvoices = async ({
    keywords = '',
    status = '',
  }: {
    keywords?: string;
    status?: string;
  } = {}) => {
    const result = localStorage.getItem('invoices');
    const invoices = result ? JSON.parse(result) : [];
    let filteredInvoices = invoices;

    if (keywords?.trim()) {
      filteredInvoices = filteredInvoices.filter(
        (invoice: Invoice) =>
          invoice.name.toLowerCase().includes(keywords.toLowerCase()) ||
          invoice.number.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    if (status) {
      filteredInvoices = filteredInvoices.filter(
        (invoice: Invoice) => invoice.status === status
      );
    }

    setInvoices(filteredInvoices);
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
    deleteInvoiceFormData,
    getInvoiceById,
    fetchInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
