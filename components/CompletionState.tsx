import React from "react";

const CompletionState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <svg
          className="w-20 h-20 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Congratulations! 🎉
        </h2>
        <p className="mt-2 text-gray-600">
          You have finished the first set. Great job! Proceed to the next page
          to continue.
        </p>
      </div>
    </div>
  );
};

export default CompletionState;
