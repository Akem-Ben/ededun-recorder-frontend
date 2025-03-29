/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import {
  getUnrecordedPhrases,
  saveRecording,
} from "@/axiosFolder/axiosFunctions/axiosLinkToBackend";
import { useAlert, Alerts } from "next-alert";
import { usePhrases } from "@/contexts/PhraseContexts";

type RecordingState = "idle" | "recording" | "paused" | "stopped";

interface AudioRecorderProps {
  phrase: any;
  onSave?: (audioBlob: Blob) => Promise<void>;
  onComplete?: () => void;
  onClose?: () => void;
  onRecordingComplete: (id: any) => void;
  fetchPhrases: (pageNumber: number) => Promise<any>;
  onLoadingChange?: (isLoading: boolean) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  phrase,
  onSave,
  onComplete,
  onClose,
  onRecordingComplete,
  onLoadingChange,
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recorderButtonsDisable, setRecorderButtonsDisable] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const recordingStateRef = useRef(recordingState);
  const streamRef = useRef<MediaStream | null>(null);

  const { addAlert } = useAlert();
  const { fetchPhrases } = usePhrases();

  useEffect(() => {
    if (!audioURL) return;
  
    const audio = new Audio(audioURL);
    audioRef.current = audio;
  
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
  
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.src = "";
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [audioURL]);

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const checkMicrophonePermission = async () => {
    try {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({
          name: 'microphone' as any
        });
        
        setHasPermission(permissionStatus.state === 'granted');
        
        permissionStatus.onchange = () => {
          setHasPermission(permissionStatus.state === 'granted');
        };
      } else {
        // Fallback for browsers without Permissions API
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      }
    } catch (error) {
      setHasPermission(false);
    }
  };
  
  useEffect(() => {
    checkMicrophonePermission();
    
    return () => {
      // Cleanup on unmount
      if (mediaRecorderRef.current && recordingStateRef.current === "recording") {
        mediaRecorderRef.current.stop();
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, []);

  const startRecording = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });

      streamRef.current = stream;
      setHasPermission(true);

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      const handleDataAvailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      const handleStop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Remove event listeners
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.removeEventListener("dataavailable", handleDataAvailable);
          mediaRecorderRef.current.removeEventListener("stop", handleStop);
        }
      };

      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.addEventListener("stop", handleStop);

      mediaRecorderRef.current.start();
      setRecordingState("recording");

      const timeoutId = setTimeout(() => {
        if (mediaRecorderRef.current && recordingStateRef.current === "recording") {
          stopRecording();
        }
      }, 30000);

      return () => {
        clearTimeout(timeoutId);
      };
    } catch (error) {
      let errorMessage = "Error accessing microphone";
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage = "Microphone access was denied. Please enable it in your browser settings.";
            setHasPermission(false);
            break;
          case 'NotFoundError':
            errorMessage = "No microphone found";
            break;
          case 'NotReadableError':
            errorMessage = "Microphone is already in use";
            break;
          default:
            errorMessage = "Could not access microphone";
        }
      }
      
      addAlert('Error', errorMessage, 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      
      setRecordingState("stopped");
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioURL) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          animationRef.current = requestAnimationFrame(updatePlaybackTime);
        })
        .catch(error => {
          console.error("Error playing audio:", error);
          addAlert('Error', 'Failed to play audio', 'error');
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };

  const updatePlaybackTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  };

  const resetRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }

    setRecordingState("idle");
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    audioChunksRef.current = [];
  };

  const handleRecorderClose = () => {
    if (mediaRecorderRef.current && (recordingState === "recording" || recordingState === "paused")) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    setRecordingState("idle");
    setAudioURL(null);
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setIsLoading(false);

    audioChunksRef.current = [];

    if (onClose) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (!audioURL || !phrase?.id || !phrase?.yoruba_text) {
      addAlert('Error', 'Missing required phrase data', 'error');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setRecorderButtonsDisable(true)
    try {
      const formData = new FormData();
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      formData.append("audio", audioBlob, `recording_${phrase.id}.wav`);
      formData.append("phraseId", phrase.id.toString());

      const { data, error }: any = await saveRecording(formData);

      if (data) {
        addAlert("Success", data.message, "success");
        if (onComplete) onComplete();
        onRecordingComplete(phrase.id);
      } else {
        addAlert("Error", error?.message || "Failed to save recording", "error");
      }
    } catch (error) {
      console.error("Error saving recording:", error);
      addAlert("Error", "Failed to save recording", "error");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setRecorderButtonsDisable(false)
        if (onClose) onClose();
      }, 1000);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formattedCurrentTime = useMemo(() => formatTime(currentTime), [currentTime]);
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header Section */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div className="text-lg font-semibold text-[#001C4C]">
            {recordingState === "recording" ? (
              <span className="text-[#CD2200EA]">Recording...</span>
            ) : (
              <span>Phrase To Record</span>
            )}
          </div>
          <button
            className="text-lg font-semibold text-[#CE2C31] hover:text-[#a02226] transition-colors"
            onClick={handleRecorderClose}
            disabled={isLoading}
          >
          X
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Phrase Text Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex text-[#101928] font-[600] max-w-[70%] leading-[145%] items-center">
              <div className="mr-3 flex-shrink-0">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="15.5"
                    fill="#CE2C31"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="15.5"
                    stroke="#C6DDF7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22ZM18.4503 15.1583C18.7218 14.9096 18.7403 14.4879 18.4916 14.2164C18.243 13.9449 17.8213 13.9264 17.5497 14.175L15.0883 16.4293L14.4503 15.8449C14.1787 15.5962 13.757 15.6148 13.5084 15.8863C13.2597 16.1578 13.2782 16.5795 13.5497 16.8282L14.6381 17.825C14.8929 18.0583 15.2838 18.0583 15.5386 17.825L18.4503 15.1583Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="font-medium">
                <span className="font-[600] text-[20px]">
                  {phrase.yoruba_text}
                </span>
                <br />
                <span className="text-[#CE2C31] text-sm font-[400] italic">
                  {phrase.pronounciation_note}
                </span>
              </span>
            </div>

            {/* Recording Indicator */}
            {recordingState === "recording" && (
              <div className="flex justify-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-red-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </div>

          {/* Audio Player Section */}
          {audioURL && (
            <div className="mb-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {formattedCurrentTime} / {formattedDuration}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <motion.div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    animate={{
                      width: `${(currentTime / duration) * 100}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatePresence mode="wait">
              {recordingState === "idle" && (
                <motion.button
                  key="start-recording"
                  onClick={startRecording}
                  className="flex items-center justify-center bg-[#1671D9] font-[700] text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  disabled={isLoading || isPlaying}
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex items-center gap-[10px] justify-center">
                    <div>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                      </svg>
                    </div>
                    <div>Record</div>
                  </div>
                </motion.button>
              )}

              {recordingState === "recording" && (
                <motion.button
                  key="stop-recording"
                  onClick={stopRecording}
                  className="flex items-center justify-center bg-[#CE2C31] font-[700] text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  disabled={isLoading}
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex items-center gap-[10px] justify-center">
                    <div>
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.002 2.49902V10.499H2.00195V2.49902H10.002ZM12.002 0.499023H0.00195312V12.499H12.002V0.499023Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div>Stop</div>
                  </div>
                </motion.button>
              )}

              {recordingState === "stopped" && (
                <>
                  {!isPlaying ? (
                    <motion.button
                      key="play-recording"
                      onClick={playAudio}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      disabled={isLoading || isPlaying || !audioURL || recorderButtonsDisable}
                      className="flex items-center justify-center bg-white font-[700] text-[#101928] text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                      style={{ borderRadius: "8px", border: "1px solid black" }}
                    >
                      <div className="flex items-center gap-[10px] justify-center">
                        <div>
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.002 0.499023C4.48195 0.499023 0.00195312 4.97902 0.00195312 10.499C0.00195312 16.019 4.48195 20.499 10.002 20.499C15.522 20.499 20.002 16.019 20.002 10.499C20.002 4.97902 15.522 0.499023 10.002 0.499023ZM10.002 18.499C5.59195 18.499 2.00195 14.909 2.00195 10.499C2.00195 6.08902 5.59195 2.49902 10.002 2.49902C14.412 2.49902 18.002 6.08902 18.002 10.499C18.002 14.909 14.412 18.499 10.002 18.499ZM7.50195 14.999L14.502 10.499L7.50195 5.99902V14.999Z"
                              fill="#101928"
                            />
                          </svg>
                        </div>
                        <div>Play</div>
                      </div>
                    </motion.button>
                  ) : (
                    <motion.button
                      key="pause-playback"
                      onClick={pauseAudio}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      disabled={isLoading || !audioURL || recorderButtonsDisable}
                      className="flex items-center justify-center bg-white font-[700] text-[#101928] text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                      style={{ borderRadius: "8px", border: "1px solid black" }}
                    >
                      <div className="flex items-center gap-[10px] justify-center">
                        <div>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="6"
                              y="6"
                              width="4"
                              height="12"
                              fill="currentColor"
                            />
                            <rect
                              x="14"
                              y="6"
                              width="4"
                              height="12"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div>Pause</div>
                      </div>
                    </motion.button>
                  )}
                  <motion.button
                    key="delete-recording"
                    onClick={resetRecording}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    disabled={isLoading || isPlaying || !audioURL || recorderButtonsDisable}
                    className="flex items-center justify-center bg-[#CE2C31] font-[700] text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="flex items-center gap-[10px] justify-center">
                      <div>
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="#FFF"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5001 6H3.5"
                            stroke="#FFF"
                            strokeWidth="2.0"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                            stroke="#FFF"
                            strokeWidth="2.0"
                          />
                          <path
                            d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                            stroke="#FFF"
                            strokeWidth="2.0"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>Delete</div>
                    </div>
                  </motion.button>
                  <motion.button
                    key="save-recording"
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    disabled={isLoading || isPlaying || !audioURL || recorderButtonsDisable}
                    className="flex items-center justify-center gap-2 bg-[#0F973D] font-[700] text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto disabled:opacity-50"
                    style={{ borderRadius: "8px" }}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-[10px] justify-center">
                        <div>
                          <svg
                            className="w-5 h-5 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                            />
                          </svg>
                        </div>
                        <div>Saving...</div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-[10px] justify-center">
                        <div>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>Save</div>
                      </div>
                    )}
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4 text-center text-red-700 text-sm italic">
            The audio recorder will end automatically after 30 seconds of recording
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioRecorder;