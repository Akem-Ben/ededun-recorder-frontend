import { Alerts } from "next-alert";
import { FC, useState } from "react";

type DeleteModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onDelete: (recordingId: string) => Promise<void>; // Make onDelete async
  recordingId: string;
};

const DeleteModal: FC<DeleteModalProps> = ({ onClose, onDelete, recordingId }) => {
  const [loading, setLoading] = useState(false); // State to track loading

  const handleDelete = async () => {
    setLoading(true); // Disable buttons and show "Deleting..."
    await onDelete(recordingId); // Call the onDelete function
    setLoading(false); // Re-enable buttons
    onClose?.(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl px-6 py-12">
        <h2 className="text-lg font-semibold text-gray-900">Want to Delete Recording?</h2>
        <p className="text-gray-600 mt-2">Deleting the recording means you won’t have it again on the server.</p>
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={loading} // Disable when loading
            className={`px-4 py-2 rounded-2xl bg-[#BA110B] text-white hover:bg-red-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            disabled={loading} // Disable when loading
            className={`px-4 py-2 rounded-2xl bg-[#0F973D] text-white hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Deleting..." : "Yes"} {/* Show "Deleting..." when loading */}
          </button>
        </div>
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

export default DeleteModal;