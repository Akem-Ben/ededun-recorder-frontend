import { FC } from "react";

type DeleteModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ onClose, onDelete }) => {
//   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl px-6 py-12">
        <h2 className="text-lg font-semibold text-gray-900">Want to Delete Recording?</h2>
        <p className="text-gray-600 mt-2">Deleting the recording means you won’t have it again on the server.</p>
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-[#BA110B] text-white hover:bg-red-600 transition"
          >
            Close
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-2xl bg-[#0F973D] text-white hover:bg-green-700 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;