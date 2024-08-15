import React, { useState, useEffect } from 'react';

interface ModalFormEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  initialData: { [key: string]: string } | null;
  id: string;
  title: string;
  fields: Array<{ name: string; label: string }>;
  apiUpdate: (id: string, data: any) => Promise<void>;
}

export const ModalFormEdit: React.FC<ModalFormEditProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  id, 
  title, 
  fields, 
  apiUpdate 
}) => {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = initialData?.[field.name] || '';
    return acc;
  }, {} as { [key: string]: string });

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(fields.reduce((acc, field) => {
        acc[field.name] = initialData[field.name] || '';
        return acc;
      }, {} as { [key: string]: string }));
    }
  }, [initialData, fields]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await apiUpdate(id, formData);
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to update data', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="text-sm font-medium text-gray-700 flex">
              <span>{field.label}</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={`Input ${field.label.toLowerCase()}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required
            />
          </div>
        ))}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
