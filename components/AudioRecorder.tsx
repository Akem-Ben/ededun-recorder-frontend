// components/AudioRecorder.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';

interface AudioRecorderProps {
  phrase: string;
  onSave?: (audioBlob: Blob) => Promise<void>;
  onComplete?: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ phrase, onSave, onComplete }) => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Set up audio element
//   useEffect(() => {
//     if (audioURL) {
//       audioRef.current = new Audio(audioURL);
//       audioRef.current.addEventListener('loadedmetadata', () => {
//         if (audioRef.current) {
//           setDuration(audioRef.current.duration);
//         }
//       });
      
//       audioRef.current.addEventListener('timeupdate', () => {
//         if (audioRef.current) {
//           setCurrentTime(audioRef.current.currentTime);
//         }
//       });
      
//       audioRef.current.addEventListener('ended', () => {
//         setIsPlaying(false);
//         setCurrentTime(0);
//         cancelAnimationFrame(animationRef.current as number);
//       });
      
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause();
//           audioRef.current.src = '';
//         }
//       };
//     }
//   }, [audioURL]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      });
      
      mediaRecorderRef.current.start();
      setRecordingState('recording');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
    }
  };
  
  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      // Stop the microphone access
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecordingState('stopped');
    }
  };
  
  const playAudio = () => {
    if (audioRef.current && audioURL) {
      audioRef.current.play();
      setIsPlaying(true);
      
      animationRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current as number);
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
    }
    
    setAudioURL(null);
    setRecordingState('idle');
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
  
//   const handleSave = async () => {
//     if (!audioURL) return;
    
//     try {
//       setIsLoading(true);
//       const audioBlob = await fetch(audioURL).then(r => r.blob());
//       await onSave(audioBlob);
//       onComplete();
//     } catch (error) {
//       console.error('Error saving recording:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Phrase to record:</h3>
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <p className="text-indigo-800">{phrase}</p>
        </div>
      </div>
      
      {recordingState === 'recording' && (
        <div className="flex justify-center mb-4">
          <motion.div 
            className="w-4 h-4 rounded-full bg-red-500"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}
      
      {audioURL && (
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {formatTime(currentTime)}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <motion.div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
                animate={{ 
                  width: `${(currentTime / duration) * 100}%` 
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <AnimatePresence mode="wait">
          {recordingState === 'idle' && (
            <motion.button
              key="start-recording"
              onClick={startRecording}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-indigo-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              Record
            </motion.button>
          )}
          
          {recordingState === 'recording' && (
            <>
              <motion.button
                key="pause-recording"
                onClick={pauseRecording}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="4" height="12" fill="currentColor" />
                  <rect x="14" y="6" width="4" height="12" fill="currentColor" />
                </svg>
                Pause
              </motion.button>
              
              <motion.button
                key="stop-recording"
                onClick={stopRecording}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="12" height="12" fill="currentColor" />
                </svg>
                Stop
              </motion.button>
            </>
          )}
          
          {recordingState === 'paused' && (
            <>
              <motion.button
                key="resume-recording"
                onClick={resumeRecording}
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-green-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
                Resume
              </motion.button>
              
              <motion.button
                key="play-paused"
                onClick={playAudio}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                disabled={!audioURL}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="8,5 19,12 8,19" fill="currentColor" />
                </svg>
                Play
              </motion.button>
              
              <motion.button
                key="stop-paused"
                onClick={stopRecording}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="12" height="12" fill="currentColor" />
                </svg>
                Stop
              </motion.button>
            </>
          )}
          
          {recordingState === 'stopped' && (
            <>
              {!isPlaying ? (
                <motion.button
                  key="play-recording"
                  onClick={playAudio}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="8,5 19,12 8,19" fill="currentColor" />
                  </svg>
                  Play
                </motion.button>
              ) : (
                <motion.button
                  key="pause-playback"
                  onClick={pauseAudio}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="4" height="12" fill="currentColor" />
                    <rect x="14" y="6" width="4" height="12" fill="currentColor" />
                  </svg>
                  Pause
                </motion.button>
              )}
              
              <motion.button
                key="delete-recording"
                onClick={resetRecording}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
              </motion.button>
              
              <motion.button
                key="save-recording"
                // onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 transition-colors hover:bg-green-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save
                  </>
                )}
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AudioRecorder;