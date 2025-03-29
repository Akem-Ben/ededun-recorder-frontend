/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { withErrorHandling } from '../configurations/axiosSetup';

// Helper functions for token management
const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        return accessToken;
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
): Promise<{ data: AxiosResponse | null | any; error: AxiosError | null }> => {
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