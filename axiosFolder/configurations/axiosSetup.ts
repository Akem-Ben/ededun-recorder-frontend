/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios, { AxiosResponse, AxiosError } from 'axios';

// import config from './axiosLinkToBackend';

// const { apiHost } = config().secrets;

// const customAxios = axios.create({
//   baseURL: apiHost,
// });

// customAxios.interceptors.response.use(
//   (response) => handleResponse(response),
//   (error) => handleError(error)
// );

// const handleResponse = (response: AxiosResponse): AxiosResponse => {

//   const newAccessToken = response.headers['x-access-token'];
//   const newRefreshToken = response.headers['x-refresh-token'];

//   if (newAccessToken && newRefreshToken) {
//     storeTokens(newAccessToken, newRefreshToken);
//   }

//   return response;
// };

// const handleError = async (error: AxiosError | any): Promise<AxiosError> => {
//   if (error.response?.status === 401) {
//     const refreshToken = getRefreshToken();

//     if (refreshToken) {
//       try {
//         return await retryWithNewTokens(error.config) as any
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

// const retryWithNewTokens = async (originalConfig: any): Promise<AxiosResponse> => {
//   const newAccessToken = getAccessToken();

//   if (newAccessToken) {
//     originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
//     return await axios(originalConfig);
//   }

//   throw new Error('Failed to retry with new access token.');
// };

// customAxios.interceptors.request.use(
//   (config: any) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const getAccessToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//     const user = localStorage.getItem('user')
//     if(user){
//       const access = JSON.parse(user)
//      const accessToken = access.accessToken
//      return accessToken
//     }
//     return null
//   }
//   return null;
// };

// const getRefreshToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//    const user = localStorage.getItem('user')
//    if(user){
//     const refresh = JSON.parse(user)
//     const refreshToken = refresh.refreshToken
//     return refreshToken
//    }
//    return null
//   }
//   return null;
// };

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

// export default customAxios;



import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

/**
 * A reusable error handling wrapper for API calls.
 * @param apiCall - The API function to call.
 * @returns A consistent response object with `data` and `error` fields.
 */

export const withErrorHandling = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
): Promise<{ data: T | null; error: string | null }> => {
  try {
    
    const response:any = await apiCall();
    return { data: response.data, error: null };
  } catch (error: any) {
    const axiosError:any = error as AxiosError;

    // Handle 401 Unauthorized errors
    if (axiosError.response?.status === 401) {
      console.error('Unauthorized: Redirecting to landing page...');

      // Redirect to the landing page (for React apps)
      // router.push('/'); // Replace with your landing page route

      // Alternatively, for non-React apps, you can use:
      window.location.href = '/login';

      toast.error('Please login again, session expired')
    }

    // Handle other errors
    const errorMessage =
      axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred.';
    console.error('API Error:', errorMessage);

    return { data: null, error: errorMessage };
  }
};