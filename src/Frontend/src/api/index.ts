import axios from 'axios';
import type { 
  ApiResponse, 
  FormOptions, 
  RegistrationRequest, 
  Registrant, 
  PagedResult,
  RegistrationStatistics 
} from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses - clear token (redirect will be handled by React components)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, the token is invalid/expired - clear it
    if (error.response?.status === 401) {
      // Don't clear token for login attempts (they don't have a token yet)
      const isLoginEndpoint = error.config?.url?.includes('/auth/login');
      if (!isLoginEndpoint) {
        localStorage.removeItem('adminToken');
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: async (username: string, password: string): Promise<{ token: string; expiresAt: string }> => {
    const { data } = await api.post<{ token: string; expiresAt: string }>('/auth/login', {
      username,
      password,
    });
    return data;
  },

  validate: async (): Promise<boolean> => {
    try {
      await api.get('/auth/validate');
      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  getToken: (): string | null => {
    return localStorage.getItem('adminToken');
  },

  setToken: (token: string) => {
    localStorage.setItem('adminToken', token);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },
};

// Registration endpoints
export const registrationApi = {
  getFormOptions: async (): Promise<FormOptions> => {
    const { data } = await api.get<ApiResponse<FormOptions>>('/registration/options');
    return data.data!;
  },

  register: async (request: RegistrationRequest): Promise<string> => {
    const { data } = await api.post<ApiResponse<string>>('/registration', request);
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }
    return data.data!;
  },

  getById: async (id: string): Promise<Registrant> => {
    const { data } = await api.get<ApiResponse<Registrant>>(`/registration/${id}`);
    return data.data!;
  },
};

// Admin endpoints
export const adminApi = {
  getRegistrations: async (
    page = 1, 
    pageSize = 10, 
    search?: string
  ): Promise<PagedResult<Registrant>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    if (search) {
      params.append('search', search);
    }
    const { data } = await api.get<ApiResponse<PagedResult<Registrant>>>(
      `/admin/registrations?${params}`
    );
    return data.data!;
  },

  getAllRegistrations: async (): Promise<Registrant[]> => {
    const { data } = await api.get<ApiResponse<Registrant[]>>('/admin/registrations/all');
    return data.data!;
  },

  getStatistics: async (): Promise<RegistrationStatistics> => {
    const { data } = await api.get<ApiResponse<RegistrationStatistics>>('/admin/statistics');
    return data.data!;
  },

  deleteRegistration: async (id: string): Promise<void> => {
    await api.delete(`/admin/registrations/${id}`);
  },
};

export default api;
