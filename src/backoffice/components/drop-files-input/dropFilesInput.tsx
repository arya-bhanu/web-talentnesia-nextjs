import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useFormDetailStore } from '@/backoffice/modules/manage-program/form-program/components/form-detail/formDetail.store';

export function DropFile() {
  const { data, setData } = useFormDetailStore();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      const { image, ...res } = data;
      setData({ ...res, image: file });
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#219EBC] rounded-lg p-4 cursor-pointer"
    >
      {!file ? (
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mb-4 text-gray-800 dark:text-white mx-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#989FAD"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
            />
          </svg>
          <p className="mb-2 font-medium">Drag file here</p>
          <p className="text-sm text-gray-500 mb-2">or</p>
          <Button
            className="text-[#219EBC] border-spacing-2 border-[#219EBC]"
            color="light"
            onClick={handleClick}
          >
            Browse Files
          </Button>
        </div>
      ) : (
        <div className="text-center p-4">
          <p className="mb-2 font-medium">File Uploaded:</p>
          <p className="text-sm text-gray-500">{file.name}</p>
          {file.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded file preview"
              className="mt-4 max-w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: '200px', padding: '10px' }} // Sesuaikan maxHeight dan padding sesuai kebutuhan
            />
          )}
        </div>
      )}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileUpload"
      />
    </div>
  );
}
