const API_BASE_URL = 'https://rechnungeasyflowwebapi-production.up.railway.app';
const API_KEY = import.meta.env.VITE_API_KEY;

console.log('[build] VITE_API_KEY =', import.meta.env.VITE_API_KEY);
console.log('[build] API_KEY used  =', API_KEY);

export interface InvoiceLineItem {
  description: string;
  quantity?: number | null;
  unitPrice?: number | null;
  totalPrice?: number | null;
}

export interface ApiError {
  error: string;
}

type RequestOptions = RequestInit & {
  suppressUnauthorizedHandler?: boolean;
};

class ApiClient {
  private accessToken: string | null = null;
  private unauthorizedHandler?: (message?: string) => void;

  setUnauthorizedHandler(handler: ((message?: string) => void) | null) {
    this.unauthorizedHandler = handler ?? undefined;
  }

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
    options: RequestOptions = {}
  ): Promise<T> {
    const { suppressUnauthorizedHandler, ...requestOptions } = options;
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      ...requestOptions.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...requestOptions,
      headers,
    });

    if (!response.ok) {
      if (response.status === 204 || response.status === 205) {
        return undefined as T;
      }
      const text = await response.text();
      const error: ApiError = text ? JSON.parse(text) : { error: 'Unknown error' };
      const message = error.error || `HTTP ${response.status}`;

      if (!suppressUnauthorizedHandler && (response.status === 401 || response.status === 403)) {
        this.unauthorizedHandler?.(message);
      }

      const err = new Error(message) as Error & { status?: number };
      err.status = response.status;
      throw err;
    }

    if (response.status === 204 || response.status === 205) {
      return undefined as T;
    }

    const raw = await response.text();
    return raw ? JSON.parse(raw) : ({} as T);
  }

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
    return this.request<{ accessToken: string; refreshToken: string; user: any }>(
      '/api/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        suppressUnauthorizedHandler: true,
      }
    );
  }

  async logout() {
    await this.request('/api/auth/logout', { method: 'POST', suppressUnauthorizedHandler: true });
    this.setAccessToken(null);
  }

  async analyzeInvoice(file: File) {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'X-Api-Key': API_KEY,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const formData = new FormData();
    formData.append('invoice', file);

    const response = await fetch(`${API_BASE_URL}/api/invoices/analyze`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      const error: ApiError = text ? JSON.parse(text) : { error: 'Unknown error' };
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async createInvoice(data: {
    customerName: string;
    serviceDescription: string;
    amount: number;
    invoiceDate: string;
    items?: InvoiceLineItem[];
  }) {
    return this.request<{
      id: string;
      customerName: string;
      serviceDescription: string;
      amount: number;
      currency: string;
      invoiceDate: string;
      downloadUrl: string | null;
      items?: InvoiceLineItem[] | null;
      createdAt: string;
      meta?: Record<string, string> | null;
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
      items?: InvoiceLineItem[] | null;
      createdAt: string;
    }>>(`/api/invoices?page=${page}&pageSize=${pageSize}`);
  }

  async generateInvoicePdf(id: string, template?: 'basic' | 'advanced' | 'elite') {
    const payload = template ? { template } : {};
    return this.request<{ downloadUrl: string; template: string }>(
      `/api/invoices/${id}/generate-pdf`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  }

  async deleteInvoice(id: string) {
    return this.request(`/api/invoices/${id}`, { method: 'DELETE' });
  }

  getInvoicePdfUrl(id: string): string {
    return `${API_BASE_URL}/api/invoices/${id}/pdf`;
  }

  async downloadInvoicePdf(id: string): Promise<Blob> {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'X-Api-Key': API_KEY,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(this.getInvoicePdfUrl(id), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let message = `HTTP ${response.status}`;
      try {
        const text = await response.text();
        if (text) {
          const error: ApiError = JSON.parse(text);
          message = error.error || message;
        }
      } catch {
        // Ignore JSON parse errors and fall back to default message
      }
      throw new Error(message);
    }

    return response.blob();
  }

  async createExpense(formData: FormData) {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'X-Api-Key': API_KEY,
    };
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

  async fetchExpenseReceipt(id: string): Promise<Blob> {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'X-Api-Key': API_KEY,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(this.getExpenseReceiptUrl(id), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to load receipt (${response.status})`);
    }

    return response.blob();
  }

  async analyzeReceipt(file: File) {
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'X-Api-Key': API_KEY,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/receipts/upload`, {
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

  async getMonthlySummary(params?: { year?: number; month?: number; allTime?: boolean }) {
    const search = new URLSearchParams();
    if (params?.year) search.append('year', params.year.toString());
    if (params?.month) search.append('month', params.month.toString());
    if (params?.allTime) search.append('allTime', 'true');

    const query = search.toString();
    return this.request<{
      income: number;
      expenses: number;
      profit: number;
      chart: Array<{
        label: string;
        income: number;
        expenses: number;
      }>;
    }>(`/api/summary/monthly${query ? `?${query}` : ''}`);
  }

  async createCheckout() {
    return this.request<{ url: string; sessionId: string }>('/api/payments/checkout', {
      method: 'POST',
    });
  }

  async createEliteCheckout() {
    return this.request<{ url: string; sessionId: string }>('/api/payments/checkout/elite', {
      method: 'POST',
    });
  }

  async getBillingPortal() {
    return this.request<{ url: string }>('/api/payments/portal');
  }

  async confirmCheckoutSession(sessionId: string) {
    return this.request<{ plan: string }>('/api/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ sessionId }),
    });
  }

  async submitBetaFeedback(payload: { message?: string; source: string; rating?: number }) {
    return this.request('/api/beta/feedback', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async unlockProBeta() {
    return this.request<{ plan: string }>('/api/beta/unlock', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
