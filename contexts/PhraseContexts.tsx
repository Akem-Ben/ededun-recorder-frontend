/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getRecordings, getUnrecordedPhrases, saveRecording } from '../axiosFolder/configurations/axiosLinkToBackend'; // Import your API functions

// Define the shape of the context
interface PhrasesContextType {
  phrases: any[]; // Replace `any` with your phrase type
  recordings: any[]; // Replace `any` with your recording type
  isLoading: boolean;
  fetchPhrases: (page?: number) => Promise<void>;
  saveRecording: (audioBlob: Blob, phraseId: string) => Promise<void>;
  fetchUserRecordings: (page?: number) => Promise<void>;
//   deleteRecording: (recordingId: string) => Promise<void>;
}

// Create the context
const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

// Custom hook to use the context
export const usePhrases = () => {
  const context = useContext(PhrasesContext);
  if (!context) {
    throw new Error('usePhrases must be used within a PhrasesProvider');
  }
  return context;
};

// Context provider component
export const PhrasesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [phrases, setPhrases] = useState<any[]>([]); // Replace `any` with your phrase type
  const [recordings, setRecordings] = useState<any[]>([]); // Replace `any` with your recording type
  const [isLoading, setIsLoading] = useState(false);

  // Fetch unrecorded phrases
  const fetchPhrases = async (page?: number) => {
    setIsLoading(true);
    try {
      const response:any = await getUnrecordedPhrases(page);
      if (response) {
        setPhrases(response.data.data);
      }
      return response;
    } catch (error) {
      console.error('Error fetching phrases:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchUserRecordings = async (page?: number) => {
    setIsLoading(true);
    try {
      const response:any = await getRecordings(page);
      if (response) {
        setRecordings(response.data.data);
      }
      return response;
    } catch (error) {
      console.error('Error fetching phrases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save a recording
  const saveRecordingHandler = async (audioBlob: Blob, phraseId: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, `recording_${phraseId}.wav`);
      formData.append('phraseId', phraseId);

      const response = await saveRecording(formData);
      if (response) {
        console.log('Recording saved successfully:', response.data);
        // Optionally update the recordings state
        setRecordings((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error saving recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a recording
//   const deleteRecordingHandler = async (recordingId: string) => {
//     setIsLoading(true);
//     try {
//       const response = await deleteRecording(recordingId);
//       if (response) {
//         console.log('Recording deleted successfully:', response.data);
//         // Update the recordings state
//         setRecordings((prev) => prev.filter((rec) => rec.id !== recordingId));
//       }
//     } catch (error) {
//       console.error('Error deleting recording:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // Provide the context value
  const contextValue: PhrasesContextType = {
    phrases,
    recordings,
    isLoading,
    fetchPhrases,
    saveRecording: saveRecordingHandler,
    fetchUserRecordings
  };

  return (
    <PhrasesContext.Provider value={contextValue}>
      {children}
    </PhrasesContext.Provider>
  );
};