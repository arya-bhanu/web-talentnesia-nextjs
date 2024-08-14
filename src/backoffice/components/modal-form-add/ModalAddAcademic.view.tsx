import React from 'react';
import { ModalAddAcademicLevelViewProps } from './modalAddAcademic.type';

export const ModalAddAcademicLevelView: React.FC<
  ModalAddAcademicLevelViewProps
> = ({ isOpen, onClose, onSave, code, setCode, name, setName, hasError }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-6">Add Academic Level</h2>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 flex">
            <span>Code</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`mt-1 block w-full border ${hasError && !code ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Input code"
            required
          />
          {hasError && !code && (
            <p className="text-red-500 text-sm mt-1">Code is required.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 flex">
            <span>Academic Level Name</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full border ${hasError && !name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Input level name"
            required
          />
          {hasError && !name && (
            <p className="text-red-500 text-sm mt-1">
              Academic Level Name is required.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
