import axios from 'axios';
import { supabase } from '@/libs/supabaseClient';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds for video uploads
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await supabase.auth.signOut();
    }
    return Promise.reject(error);
  }
);