/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/PhrasesSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioRecorder from "./AudioRecorder";
import Button from "./Button";
import { getUnrecordedPhrases } from "@/axiosFolder/configurations/axiosLinkToBackend";
import SkeletonLoader from "./SkeletonLoader";
import { usePhrases } from "@/contexts/PhraseContexts";
import { useAlert, Alerts } from "next-alert";
import EmptyState from "./EmptyState";

interface Phrase {
  id: number;
  text: string;
  meaning: string;
  recorded: boolean;
}

const PhrasesSection: React.FC<any> = ({
  setActiveView,
  activeView,
}: {
  setActiveView: any;
  activeView: any;
}) => {
  const [pageNumber, setPageNumber] = useState(1);

  const [initialPhraseCount, setInitialPhraseCount] = useState(0);

  const [recordedCount, setRecordedCount] = useState(0);

  const [phrasesLoading, setPhrasesLoading] = useState(false);

  const [unrecordedPhrases, setUnrecordedPhrases] = useState<any>([]);

  const { fetchPhrases } = usePhrases();

  const [totalPages, setTotalPages] = useState(1);

  const { addAlert } = useAlert();

  useEffect(() => {
    async function getData() {
      setPhrasesLoading(true);

      const response: any = await getUnrecordedPhrases(pageNumber);

      if (!response) {
        setUnrecordedPhrases([]);
      }

      if (response.data.data) {
        setUnrecordedPhrases(response.data.data);

        setTotalPages(response.data.totalPages);

        setRecordedCount(0);

        setInitialPhraseCount(response.data.data.length);

        return setPhrasesLoading(false);
      } else {
        setInitialPhraseCount(0);
        setUnrecordedPhrases([]);
      }

      setPhrasesLoading(false);
    }

    getData();
  }, [pageNumber, fetchPhrases]);

  const handleRecordingComplete = (phraseId: any) => {
    setUnrecordedPhrases((prevPhrases: any[]) =>
      prevPhrases.filter((phrase) => phrase.id !== phraseId)
    );

    // Increment the recorded count
    setRecordedCount((prev) => prev + 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(
    null
  );

  const onCloseRecorder = () => {
    return setCurrentPhraseIndex(null);
  };

  const progress = (recordedCount / initialPhraseCount) * 100;

  return (
    <div className="min-h-screen bg-[#e3effc] py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl flex justify-center items-center flex-col font-[600] text-[#001C4C] leading-[1.2] sm:leading-[57px]">
            Èdèdún AI Powered Yorùbá Platform
          </h1>
          <span className="flex font-[400] text-[#012657] leading-[1.5] text-sm sm:text-lg justify-center items-center text-center">
            Select a phrase to record and contribute to the Èdèdún AI Powered
            Yorùbá Platform (APYP)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4">
          <section className="flex flex-col sm:flex-row gap-2 sm:gap-10">
            <div className="text-sm sm:text-base bg-[#4A90E2] px-2 py-1 sm:px-2 rounded-2xl font-semibold text-white leading-normal sm:leading-[57px] text-center">
              Phrases To Record
            </div>
            <div
              onClick={() => setActiveView("Recordings")}
              className="text-sm sm:text-base hover:cursor-pointer hover:scale-105 transition-transform duration-200 bg-gray-300 px-2 py-1 sm:px-2 rounded-2xl font-semibold text-[#001C4C] leading-normal sm:leading-[57px] text-center"
            >
              My Recordings
            </div>
          </section>

          <div className="text-sm font-medium text-black w-full sm:w-auto sm:max-w-xs">
            <div className="text-sm mb-1">Progress</div>
            <div className="overflow-hidden text-sm border bg-gray-100 rounded-full mb-1">
              <div
                className="h-2 bg-[#F0F2F5] text-sm border-2 bg-[#F56630] border-[#F56630] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm">
              You are making incredible progress {Math.round(progress)}% out of
              100%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-4">
        <div className="bg-white p-4 sm:p-6">
  {phrasesLoading ? (
    Array.from({ length: 4 }).map((_, index) => (
      <motion.div
        key={index}
        className="rounded-lg bg-gray-50 border border-gray-200 mb-2"
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-3 rounded-lg border-r-4 border-[#1671D9]">
          <div className="flex items-center justify-between">
            <div className="flex text-[#101928] font-[600] leading-[1.5] items-center">
              <div className="mr-3 flex-shrink-0">
                <SkeletonLoader
                  width="32px"
                  height="32px"
                  borderRadius="50%"
                />
              </div>
              <div>
                <SkeletonLoader
                  width="150px"
                  height="20px"
                  borderRadius="4px"
                />
                <br />
                <SkeletonLoader
                  width="100px"
                  height="15px"
                  borderRadius="4px"
                />
              </div>
            </div>
            <div>
              <SkeletonLoader
                width="120px"
                height="40px"
                borderRadius="8px"
              />
            </div>
          </div>
        </div>
      </motion.div>
    ))
  ) : (
    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
      {unrecordedPhrases.length === 0 ? (
        <EmptyState title="No phrases new phrases uploaded" description="No new phrases yet"/>
      ) : (
        unrecordedPhrases.map((phrase: any, index: any) => (
          <motion.div
            key={phrase.id}
            className={`rounded-lg ${
              currentPhraseIndex === index
                ? "bg-indigo-100 border border-indigo-300"
                : phrase.recorded
                ? "bg-green-50 border border-green-200"
                : "bg-gray-50 border border-gray-200"
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-3 rounded-lg border-r-4 border-[#1671D9]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                <div className="flex text-[#101928] font-[600] max-w-[65%] leading-[1.5] items-center">
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
                  <span
                    className={`${
                      currentPhraseIndex === index ? "font-medium" : ""
                    }`}
                  >
                    <span className="font-[600] text-base sm:text-[16px]">
                      {phrase.yoruba_text}
                    </span>
                    <br />
                    {/* <span className="text-[#008764D9] font-[400]">{phrase.english_text}</span> */}
                  </span>
                </div>
                <div>
                  <Button
                    backgroundColor="#1671D9"
                    onClick={() => setCurrentPhraseIndex(index)}
                  >
                    <div className="flex items-center gap-[5px] sm:gap-[10px]">
                      <div>
                        <svg
                          width="14"
                          height="20"
                          viewBox="0 0 14 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 12.5C8.66 12.5 10 11.16 10 9.5V3.5C10 1.84 8.66 0.5 7 0.5C5.34 0.5 4 1.84 4 3.5V9.5C4 11.16 5.34 12.5 7 12.5Z"
                            fill="white"
                          />
                          <path
                            d="M12 9.5C12 12.26 9.76 14.5 7 14.5C4.24 14.5 2 12.26 2 9.5H0C0 13.03 2.61 15.93 6 16.42V19.5H8V16.42C11.39 15.93 14 13.03 14 9.5H12Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="text-sm sm:text-base">
                        Start Recording
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )}
</div>

          {currentPhraseIndex === null && totalPages > 1 && (
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
              <div>
                <motion.button
                  className="flex bg-[#0F973D] px-3 py-2 sm:px-3 sm:py-3 items-center gap-2 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  disabled={pageNumber === 1}
                  onClick={handlePreviousPage}
                >
                  <div className="flex text-[#FFF] items-center gap-[5px] sm:gap-[10px]">
                    <div>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
                    <div className="text-sm sm:text-base">Previous Page</div>
                  </div>
                </motion.button>
              </div>
              <div>
                <motion.button
                  className="flex bg-[#0F973D] px-3 py-2 sm:px-3 sm:py-3 items-center gap-2 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleNextPage}
                  disabled={pageNumber === totalPages}
                >
                  <div className="flex text-[#FFF] items-center gap-[5px] sm:gap-[10px]">
                    <div>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
                    <div className="text-sm sm:text-base">Next Page</div>
                  </div>
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {currentPhraseIndex !== null && unrecordedPhrases.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`phrase-${currentPhraseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AudioRecorder
                phrase={unrecordedPhrases[currentPhraseIndex]}
                onClose={onCloseRecorder}
                fetchPhrases={fetchPhrases}
                onRecordingComplete={() =>
                  handleRecordingComplete(
                    unrecordedPhrases[currentPhraseIndex].id
                  )
                }
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default PhrasesSection;
