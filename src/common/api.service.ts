import axios from 'axios';

import { API_URL } from './config';
import { Params, RequestData } from '@/types';

// Create an axios instance with the base API URL
const api = axios.create({
  baseURL: API_URL,
});

// Generic error handler for all API methods
function handlerError(err: unknown, apiType: string): never {
  if (err instanceof Error) {
    throw new Error(`[ApiService:${apiType}] ${err.message}`);
  }
  throw new Error(`[ApiService:${apiType}] Unknown or unexpected error`);
}

// Main API service object with common HTTP methods
export const callApi = {
  // GET request with query parameters
  async query<T>(resource: string, { params }: { params?: Params }): Promise<T> {
    try {
      const response = await api.get<T>(resource, { params });
      return response.data;
    } catch (error: unknown) {
      handlerError(error, 'query');
    }
  },

  // GET request by resource and optional slug
  async get<T>(resource: string, slug: string = ''): Promise<T> {
    try {
      const response = await api.get<T>(`${resource}/${slug}`);
      return response.data;
    } catch (error: unknown) {
      handlerError(error, 'get');
    }
  },

  // POST request for creating new data
  async post<T>(resource: string, data: RequestData): Promise<T> {
    try {
      const response = await api.post<T>(resource, data);
      return response.data;
    } catch (error: unknown) {
      handlerError(error, 'post');
    }
  },

  // PUT request for updating existing data
  async put<T>(resource: string, slug: string = '', data: RequestData): Promise<T> {
    try {
      const response = await api.put<T>(`${resource}/${slug}`, data);
      return response.data;
    } catch (error: unknown) {
      handlerError(error, 'put');
    }
  },

  // DELETE request for removing data
  async delete<T>(resource: string): Promise<T> {
    try {
      const response = await api.delete<T>(resource);
      return response.data;
    } catch (error: unknown) {
      handlerError(error, 'delete');
    }
  },
};



