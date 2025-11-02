const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface ApiError {
  error: string;
}

class ApiClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async register(email: string, password: string, companyName?: string) {
    return this.request<{ accessToken: string; refreshToken: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, companyName }),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ accessToken: string; refreshToken: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request<{ accessToken: string; refreshToken: string; user: any }>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout() {
    await this.request('/api/auth/logout', { method: 'POST' });
    this.setAccessToken(null);
  }

  // Invoices
  async createInvoice(data: {
    customerName: string;
    serviceDescription: string;
    amount: number;
    invoiceDate: string;
  }) {
    return this.request<{
      id: string;
      customerName: string;
      serviceDescription: string;
      amount: number;
      currency: string;
      invoiceDate: string;
      downloadUrl: string;
      createdAt: string;
    }>('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getInvoices(page = 1, pageSize = 20) {
    return this.request<Array<{
      id: string;
      customerName: string;
      serviceDescription: string;
      amount: number;
      currency: string;
      invoiceDate: string;
      downloadUrl: string | null;
      createdAt: string;
    }>>(`/api/invoices?page=${page}&pageSize=${pageSize}`);
  }

  async deleteInvoice(id: string) {
    return this.request(`/api/invoices/${id}`, { method: 'DELETE' });
  }

  getInvoicePdfUrl(id: string): string {
    return `${API_BASE_URL}/api/invoices/${id}/pdf`;
  }

  // Expenses
  async createExpense(formData: FormData) {
    const token = this.getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/expenses`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getExpenses(page = 1, pageSize = 20) {
    return this.request<Array<{
      id: string;
      amount: number;
      note: string | null;
      receiptUrl: string | null;
      expenseDate: string;
      createdAt: string;
    }>>(`/api/expenses?page=${page}&pageSize=${pageSize}`);
  }

  async deleteExpense(id: string) {
    return this.request(`/api/expenses/${id}`, { method: 'DELETE' });
  }

  getExpenseReceiptUrl(id: string): string {
    return `${API_BASE_URL}/api/expenses/${id}/receipt`;
  }

  // Summary
  async getMonthlySummary(year?: number, month?: number) {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());
    return this.request<{
      income: number;
      expenses: number;
      profit: number;
      chart: Array<{
        label: string;
        income: number;
        expenses: number;
      }>;
    }>(`/api/summary/monthly?${params.toString()}`);
  }

  // Payments
  async createCheckout() {
    return this.request<{ url: string; sessionId: string }>('/api/payments/checkout', {
      method: 'POST',
    });
  }

  async getBillingPortal() {
    return this.request<{ url: string }>('/api/payments/portal');
  }
}

export const apiClient = new ApiClient();

