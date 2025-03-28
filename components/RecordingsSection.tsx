/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import DeleteModal from "./DeleteModal";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import { usePhrases } from "@/contexts/PhraseContexts";
import { useAlert, Alerts } from "next-alert";
import {
  deleteARecording,
  getRecordings,
} from "@/axiosFolder/axiosFunctions/axiosLinkToBackend";

interface Phrase {
  id: number;
  text: string;
  meaning: string;
  recorded: boolean;
}

const Recordings: React.FC<any> = ({
  setActiveView,
  activeView,
}: {
  setActiveView: any;
  activeView: any;
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { fetchUserRecordings } = usePhrases();
  // const [totalPages, setTotalPages] = useState(1);
  const [recordings, setRecordings] = useState<any>([]);
  const [recordingToDelete, setRecordingToDelete] = useState<string | null>(
    null
  );
  const { addAlert } = useAlert();
  const [phrasesLoading, setPhrasesLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [trackRecording, setTrackRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const [duration, setDuration] = useState(0); // Track total duration of the audio
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null); // Track the currently playing audio URL

  useEffect(() => {
    async function getData() {
      setPhrasesLoading(true);
      const response: any = await getRecordings(pageNumber);

      console.log("res", response);

      if (response.status !== 200) {
        setRecordings([]);
      }

      if (response.data.data.data) {
        console.log(response.data.data);
        setRecordings(response.data.data.data);
        // setTotalPages(response.data.data.totalPages);
      } else {
        setRecordings([]);
      }

      setPhrasesLoading(false);
    }

    getData();
  }, [pageNumber, fetchUserRecordings]);

  // const handleNextPage = () => {
  //   if (pageNumber < totalPages) {
  //     setPageNumber((prev) => prev + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (pageNumber > 1) {
  //     setPageNumber((prev) => prev - 1);
  //   }
  // };

  const handlePlayStop = (recordingUrl: string) => {
    if (currentlyPlaying === recordingUrl) {
      // If the same audio is playing, stop it
      const audioElement = document.getElementById(
        "audio-element"
      ) as HTMLAudioElement;
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setCurrentlyPlaying(null);
      setTrackRecording(false);
      setCurrentTime(0);
    } else {
      if (currentlyPlaying) {
        const previousAudioElement = document.getElementById(
          "audio-element"
        ) as HTMLAudioElement;
        if (previousAudioElement) {
          previousAudioElement.pause();
          previousAudioElement.currentTime = 0;
        }
      }
      setCurrentlyPlaying(recordingUrl);
      setTrackRecording(true);
    }
  };

  const handleDelete = async (recordingUrl: string) => {
    setDeleteLoading(true);
    const data = await deleteARecording(recordingUrl);
    if (!data) {
      setDeleteLoading(false);
      return addAlert(
        "Error",
        "Unable to delete, please try again or contact admin",
        "error"
      );
    }

    addAlert("Success", "Recording deleted successfully", "success");
    setDeleteLoading(false);
    await fetchUserRecordings(1);
    setRecordings((prev: any) =>
      prev.filter((recording: any) => recording?.recording_url !== recordingUrl)
    );
  };

  return (
    <div className="min-h-screen bg-[#e3effc] py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl flex justify-center items-center flex-col font-[600] text-[#001C4C] leading-[1.2] sm:leading-[57px]">
            Èdèdún AI Powered Yorùbá Platform
          </h1>
          <span className="flex font-[500] text-[#001C4C] leading-[1.5] text-lg sm:text-2xl justify-center items-center text-center">
            Your Previous Recordings
          </span>
        </div>

        <section className="flex flex-col sm:flex-row gap-2 sm:gap-10 justify-center mb-4">
            <div onClick={() => setActiveView("Phrases")} className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
          <button
            className="text-sm sm:text-base hover:cursor-pointer hover:scale-105 transition-transform duration-200 bg-gray-300 px-2 py-1 sm:px-2 rounded-2xl font-semibold text-[#001C4C] leading-normal sm:leading-[57px] text-center"
          >
            Phrases To Record
          </button>
             </div>       
        <div className="bg-[#4A90E2] flex justify-center items-center p-2 rounded-xl">
          <button disabled className="text-sm sm:text-base sm:px-2 font-semibold text-white leading-normal sm:leading-[57px] text-center">
            My Recordings
          </button>
          </div>
        </section>

        <div className="rounded-lg bg-white shadow-md mb-4">
          <div className="mt-6 p-4 sm:p-6">
            {phrasesLoading ? (
              // Skeleton Loader for Loading State
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
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="space-y-2 max-h-120 overflow-y-auto pr-2">
                {recordings.length === 0 ? (
                  <EmptyState
                    title="No Recordings Found"
                    description={
                      "You haven't made any recordings yet. Start recording to see them here!"
                    }
                  />
                ) : (
                  recordings.map((recording: any, index: any) => (
                    <motion.div
                      key={recording.id}
                      className="rounded-lg bg-gray-50 border border-gray-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="p-3 rounded-lg border-r-4 border-[#1671D9]">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                          <div className="flex text-[#101928] font-[600] leading-[1.5] items-center">
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
                            <span>
                              <span className="font-[600] text-lg sm:text-[20px]">
                                {recording.phrase.yoruba_text} (
                                {recording.phrase.english_text})
                              </span>
                            </span>
                          </div>
                          <div>
                            <div className="flex gap-2 sm:gap-12">
                              <motion.button
                                onClick={() =>
                                  handlePlayStop(recording.recording_url)
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 bg-[#FFF] font-[700] w-full sm:auto text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto"
                                style={{
                                  borderRadius: "8px",
                                  border: "1px solid black",
                                }}
                              >
                                <div className="flex text-[#101928] items-center gap-[5px] sm:gap-[10px]">
                                  <div>
                                    {currentlyPlaying ===
                                    recording.recording_url ? (
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.002 0.499023C4.48195 0.499023 0.00195312 4.97902 0.00195312 10.499C0.00195312 16.019 4.48195 20.499 10.002 20.499C15.522 20.499 20.002 16.019 20.002 10.499C20.002 4.97902 15.522 0.499023 10.002 0.499023ZM10.002 18.499C5.59195 18.499 2.00195 14.909 2.00195 10.499C2.00195 6.08902 5.59195 2.49902 10.002 2.49902C14.412 2.49902 18.002 6.08902 18.002 10.499C18.002 14.909 14.412 18.499 10.002 18.499ZM6.5 7.49902H13.5V13.499H6.5V7.49902Z"
                                          fill="#101928"
                                        />
                                      </svg>
                                    ) : (
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
                                    )}
                                  </div>
                                  <div className="text-sm sm:text-base">
                                    {currentlyPlaying ===
                                    recording.recording_url
                                      ? "Stop"
                                      : "Play"}
                                  </div>
                                </div>
                              </motion.button>

                              <motion.button
                                onClick={() => {
                                  setRecordingToDelete(recording.id);
                                  setDeleteModal(true);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                disabled={trackRecording}
                                className="flex items-center gap-2 bg-[#CE2C31] font-[700] w-full sm:auto text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto"
                                style={{ borderRadius: "8px" }}
                              >
                                <div className="flex text-[#FFF] items-center gap-[5px] sm:gap-[10px]">
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
                                  <div className="text-sm sm:text-base">
                                    Delete
                                  </div>
                                </div>
                              </motion.button>
                            </div>
                            <div className="mt-2">
                              {currentlyPlaying === recording.recording_url ? (
                                <span className="italic text-red-800">
                                  Playing...
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* {totalPages > 1 && (
            <div className="p-4 sm:p-6 flex flex-row sm:flex-col justify-between gap-2 sm:gap-0">
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  disabled={pageNumber === 1}
                  onClick={handlePreviousPage}
                  className="flex items-center gap-2 bg-[#0F973D] font-[700] w-full sm:auto text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex text-[#FFF] items-center gap-[5px] sm:gap-[10px]">
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
                    <div className="text-sm sm:text-base">Previous</div>
                  </div>
                </motion.button>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleNextPage}
                  disabled={pageNumber === totalPages}
                  className="flex items-center gap-2 bg-[#0F973D] font-[700] w-full sm:auto text-white text-base h-[48px] px-6 py-[12px] transition-colors w-full sm:w-auto"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex text-[#FFF] items-center gap-[5px] sm:gap-[10px]">
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
                    <div className="text-sm sm:text-base">Next</div>
                  </div>
                </motion.button>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {deleteModal && (
        <DeleteModal
          onClose={() => {
            setDeleteModal(false); // Close the modal
            setRecordingToDelete(null); // Reset the recording ID
          }}
          onDelete={async (recordingId) => {
            setDeleteLoading(true); // Set global loading state (optional)
            const data = await deleteARecording(recordingId); // Call the delete endpoint
            if (!data) {
              setDeleteLoading(false); // Reset global loading state
              return addAlert(
                "Error",
                "Unable to delete, please try again or contact admin",
                "error"
              );
            }
            addAlert("Success", "Recording deleted successfully", "success");
            setDeleteLoading(false); // Reset global loading state
            await fetchUserRecordings(1); // Refresh the recordings list
            setRecordings((prev: any) =>
              prev.filter(
                (recording: any) => recording?.recording_url !== recordingId
              )
            );
          }}
          recordingId={recordingToDelete || ""} // Pass the recording ID to the modal
        />
      )}
      {/* Hidden audio element for playback */}
      {currentlyPlaying && (
        <audio
          id="audio-element"
          src={currentlyPlaying}
          autoPlay
          onEnded={() => {
            setCurrentlyPlaying(null); // Clear the currently playing audio
            setTrackRecording(false); // Re-enable delete buttons
            setCurrentTime(0); // Reset progress bar
            setDuration(0); // Reset duration
          }}
          onTimeUpdate={(e) => {
            const audioElement = e.target as HTMLAudioElement;
            setCurrentTime(audioElement.currentTime); // Update current time
          }}
          onLoadedMetadata={(e) => {
            const audioElement = e.target as HTMLAudioElement;
            setDuration(audioElement.duration); // Set total duration
          }}
        />
      )}
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default Recordings;
