// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (title) {
      onSave(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Event Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
