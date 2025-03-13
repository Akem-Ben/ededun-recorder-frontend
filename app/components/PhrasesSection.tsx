// components/PhrasesSection.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioRecorder from './AudioRecorder';
// import { useRouter } from 'next/router';

interface Phrase {
  id: number;
  text: string;
  meaning: string;
  recorded: boolean;
}

const PhrasesSection: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([
    {
        id: 1,
        recorded: false,
        text: 'Bàwò ni?',
        meaning: "How are you?"
    },
    {
        id: 2,
        recorded: false,
        text: 'Dáadáa ni',
        meaning: "I am fine"
    },
    {
        id: 3,
        recorded: false,
        text: 'Ẹ káàrọ̀',
        meaning: "Good Morning"
    },
    {
        id: 4,
        recorded: false,
        text: 'Ẹ káàsán',
        meaning: "Good afternoon"
    },
    {
        id: 1,
        recorded: false,
        text: 'Ẹ káàlẹ́',
        meaning: "Good late evening"
    },
    {
        id: 2,
        recorded: false,
        text: 'O dàbọ̀',
        meaning: "Goodbye (Until we meet again)"
    },
    {
        id: 3,
        recorded: false,
        text: 'A dúpẹ́',
        meaning: "Thank you"
    },
    {
        id: 4,
        recorded: false,
        text: 'Jọ̀wọ́',
        meaning: "Please"
    }
  ]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
//   const router = useRouter();
  
//   useEffect(() => {
//     const fetchPhrases = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//         //   router.push('/login');
//           return;
//         }
        
//         const response = await fetch('/api/phrases', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (!response.ok) {
//           if (response.status === 401) {
//             localStorage.removeItem('token');
//             // router.push('/login');
//             return;
//           }
//           throw new Error('Failed to fetch phrases');
//         }
        
//         const data = await response.json();
//         setPhrases(data);
        
//         // Set the first unrecorded phrase as current
//         const unrecordedIndex = data.findIndex((p:any) => !p.recorded);
//         if (unrecordedIndex !== -1) {
//           setCurrentPhraseIndex(unrecordedIndex);
//         } else if (data.length > 0) {
//           setCurrentPhraseIndex(0);
//         }
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchPhrases();
//   }, []);
  
//   const handleSaveRecording = async (audioBlob: Blob) => {
//     if (currentPhraseIndex === null) return;
    
//     try {
//     //   const token = localStorage.getItem('token');
//     //   if (!token) {
//     //     // router.push('/login');
//     //     return;
//     //   }
      
//       const currentPhrase = phrases[currentPhraseIndex];
      
//       // Create form data to upload the audio file
//       const formData = new FormData();
//       formData.append('audio', audioBlob, `phrase_${currentPhrase.id}.wav`);
      
//       const response = await fetch(`/api/phrases/${currentPhrase.id}/recording`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to save recording');
//       }
      
//       // Update the phrases state to mark this phrase as recorded
//       const updatedPhrases = [...phrases];
//       updatedPhrases[currentPhraseIndex].recorded = true;
//       setPhrases(updatedPhrases);
      
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };
  
//   const moveToNextPhrase = () => {
//     if (currentPhraseIndex === null) return;
    
//     // Find the next unrecorded phrase
//     const nextUnrecorded = phrases.findIndex((p, index) => !p.recorded && index > currentPhraseIndex);
    
//     if (nextUnrecorded !== -1) {
//       setCurrentPhraseIndex(nextUnrecorded);
//     } else {
//       // If all phrases are recorded, stay on the current one
//       // or we could choose to do something else
//     }
//   };
  
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     // router.push('/login');
//   };
  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <p className="text-indigo-800">Loading phrases...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
//           <h3 className="text-lg font-medium mb-2">Error</h3>
//           <p>{error}</p>
//           <button 
//             // onClick={() => router.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Èdèdún APYP (AI Powered Yorùbá Platform)</h1>
          <motion.button
            // onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            // components/PhrasesSection.tsx (continued)
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Phrases To Record</h2>
            <div className="text-sm font-medium text-indigo-600">
              {phrases.filter(p => p.recorded).length} of {phrases.length} recorded
            </div>
          </div>
          
          <div className="overflow-hidden bg-gray-100 rounded-full mb-6">
            <div 
              className="h-2 bg-indigo-500 rounded-full"
              style={{ width: `${(phrases.filter(p => p.recorded).length / phrases.length) * 100}%` }}
            />
          </div>
          
          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2">
            {phrases.map((phrase, index) => (
              <motion.div 
                key={phrase.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  currentPhraseIndex === index 
                    ? 'bg-indigo-100 border border-indigo-300' 
                    : phrase.recorded 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setCurrentPhraseIndex(index)}
              >
                <div className="flex text-blue-800 hover:cursor-pointer items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                    phrase.recorded ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {phrase.recorded && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`${currentPhraseIndex === index ? 'font-medium' : ''}`}>
                    {phrase.text}
                    <br />
                    <span className='text-red-900 italic'>{phrase.meaning}</span>
                  </span>
                </div>
                
                {currentPhraseIndex === index && (
                  <span className="text-xs px-2 py-1 bg-indigo-500 text-white rounded-full">
                    Current
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {currentPhraseIndex !== null && phrases.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`phrase-${currentPhraseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AudioRecorder 
                phrase={phrases[currentPhraseIndex].text}
                // onSave={handleSaveRecording}
                // onComplete={moveToNextPhrase}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PhrasesSection;