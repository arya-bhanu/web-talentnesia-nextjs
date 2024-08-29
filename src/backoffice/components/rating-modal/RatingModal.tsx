import React, { useState } from 'react';
import RatingModalView from './RatingModal.view';

const RatingModal: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <RatingModalView isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default RatingModal;
