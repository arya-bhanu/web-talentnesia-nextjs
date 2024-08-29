import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'flowbite-react';
import { RatingModalProps } from './ratingModal.type';
import Image from 'next/image';
import ratingImage from '@/../public/images/rating.png';
import starGray from '@/../public/icons/rate-star-gray.svg';
import Star from '@/../public/icons/rate-star.svg';

const RatingModalView: React.FC<RatingModalProps> = ({ isOpen, onClose }) => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleStarClick = (star: number) => {
    setSelectedStar(star);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Modal show={isOpen} onClose={onClose} ref={modalRef}>
      <Modal.Body>
        <div className="text-center">
          <div className="mb-4">
            <Image
              src={ratingImage}
              alt="Rating"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            What do you think about this course?
          </h2>
          <p className="text-sm px-8 text-gray-900 mb-4">
            Before you download your certificate, please let us know what you
            thought of the course. Your opinion will not affect your previous
            grade.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="relative w-8 h-8"
              >
                <Image
                  src={
                    star <= (selectedStar || 0)
                      ? '/icons/rate-star.svg'
                      : '/icons/rate-star-gray.svg'
                  }
                  alt={`Star ${star}`}
                  layout="fill"
                  objectFit="contain"
                />
              </button>
            ))}
          </div>
          <div className="mb-2 text-left px-8">
            <p className="text-gray-800 text-sm font-bold mb-2">Suggestions*</p>
            <input
              type="text"
              placeholder="Leave your comments here..."
              className="w-full p-3 border border-gray-300 rounded h-40 placeholder:text-sm placeholder:top-2 placeholder:absolute placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-end space-x-2">
        <button
          className="rounded-full px-4 py-2 border border-yellow-300 text-gray-700 font-semibold text-sm bg-transparent hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="rounded-full px-4 py-2 border border-yellow-400 bg-yellow-400 font-semibold text-sm text-gray-700 hover:bg-yellow-300"
          onClick={onClose}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RatingModalView;
