/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

/**
 * A reusable error handling wrapper for API calls.
 * @param apiCall - The API function to call.
 * @returns A consistent response object with `data` and `error` fields.
 */

export const withErrorHandling = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
): Promise<{ data: AxiosResponse<T> | null; error: AxiosError | null }> => {
  try {
    const response = await apiCall();
    return { data: response, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      console.error('Unauthorized: Redirecting to landing page...');
      window.location.href = '/login';
      toast.error('Please login again, session expired');
    }

    console.error('API Error:', axiosError);
    return { data: null, error: axiosError };
  }
};