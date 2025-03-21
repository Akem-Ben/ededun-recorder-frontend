/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { withErrorHandling } from './axiosSetup';

// // Create a custom Axios instance
// const customAxios = axios

// const newAxios = customAxios.create({
//     baseURL: 'http://localhost:3050/api/v1',
//   });

// // Handle successful responses
// const handleResponse = (response: AxiosResponse): AxiosResponse => {
//   const newAccessToken = response.headers['x-access-token'];
//   const newRefreshToken = response.headers['x-refresh-token'];

//   if (newAccessToken && newRefreshToken) {
//     storeTokens(newAccessToken, newRefreshToken);
//   }

//   return response;
// };

// // Handle errors
// const handleError = async (error: AxiosError) => {
//   if (error.response?.status === 401) {
//     const refreshToken = getRefreshToken();

//     if (refreshToken) {
//       try {
//         const originalRequest = error.config as AxiosRequestConfig;
//         return await retryWithNewTokens(originalRequest);
//       } catch (retryError) {
//         clearClientStorage();
//         redirectToHomePage();
//         return Promise.reject(retryError);
//       }
//     }

//     clearClientStorage();
//     redirectToHomePage();
//   }

//   return Promise.reject(error);
// };

// // Retry the request with new tokens
// const retryWithNewTokens = async (originalConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
//   const newAccessToken = getAccessToken();

//   if (newAccessToken) {
//     originalConfig.headers = {
//       ...originalConfig.headers,
//       Authorization: `Bearer ${newAccessToken}`,
//     };
//     return await newAxios(originalConfig);
//   }

//   throw new Error('Failed to retry with new access token.');
// };

// // Add request interceptor to attach the access token
// newAxios.interceptors.request.use(
//   (config:any) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor to handle responses and errors
// newAxios.interceptors.response.use(handleResponse, handleError);

// const storeTokens = (accessToken: string, refreshToken: string): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//   }
// };

// const clearClientStorage = (): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.clear();
//   }
// };

// const redirectToHomePage = (): void => {
//   if (typeof window !== 'undefined') {
//     window.location.href = '/';
//   }
// };


// // Helper functions for token management
const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        return accessToken;
      }
    }
    return null;
  };

  const getRefreshToken = (): string | null => {
    if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          return refreshToken;
        }
      }
  return null;
};

const newAxios = axios.create({
    baseURL: "https://ededun-recorder-backend.onrender.com/api/v1"
    // "https://ededun-recorder-backend.onrender.com/api/v1"
    // 'http://localhost:3050/api/v1'
})

// API functions


export const getUnrecordedPhrases = async (page?: number): Promise<AxiosResponse | null> => {
    const accessToken = getAccessToken();
    const { data, error } = await withErrorHandling(async () => {
      const response = await newAxios.get(`/users/unrecorded-phrases?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    });
  
    if (error) {
      console.error('Error fetching unrecorded phrases:', error);
      return null;
    }
  
    return data as AxiosResponse;
  };

  
export const registerUser = async (body: any): Promise<AxiosResponse> => {
  try {
    const response = await newAxios.post('/users/register', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const loginUser = async (body: any): Promise<AxiosResponse> => {
  try {
    const response = await newAxios.post('/users/login', body);
    return response;
  } catch (error: any) {
    return error.response;
  }
};


export const saveRecording = async (
  body: FormData,
): Promise<{ data: AxiosResponse | null; error: AxiosError | null }> => {
  const accessToken = getAccessToken();

  const { data, error } = await withErrorHandling(async () => {
    const response = await newAxios.post(`/users/save-recording`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  });

  if (error) {
    console.error('Error saving recording:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

  export const getRecordings = async (page?: number): Promise<AxiosResponse | null> => {
    const accessToken = getAccessToken();
    const { data, error } = await withErrorHandling(async () => {
      const response = await newAxios.get(`/users/all-my-recordings?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    });
  
    if (error) {
      console.error("Error fetching recordings:", error);
      return null;
    }
  
    return data as AxiosResponse;
  };

  export const deleteARecording = async (recordingId: string): Promise<AxiosResponse | null> => {
    const accessToken = getAccessToken();
    const { data, error } = await withErrorHandling(async () => {
      const response = await newAxios.delete(`/users/delete-my-recording/${recordingId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    });
  
    if (error) {
      console.error("Error deleting recording:", error);
      return null;
    }
  
    return data as AxiosResponse;
  };


// export default newAxios;