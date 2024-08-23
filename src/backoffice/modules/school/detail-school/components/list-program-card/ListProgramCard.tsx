import React, { useState } from 'react';
import { ListProgramCardView } from './ListProgramCard.view';
import { ListProgramCardData } from './listProgramCard.data';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';

interface ListProgramCardProps {
    className?: string;
}

const ListProgramCard: React.FC<ListProgramCardProps> = ({ className = '' }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ListProgramCardData.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(ListProgramCardData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    return (
        <div>
            <div className={`flex flex-wrap -mx-4 ${className}`}>
                {currentItems.map((item, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                        <ListProgramCardView data={item} />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center w-full mt-5">
                <div className="flex items-center gap-2 text-[#667085]">
                    <label htmlFor="pagination" className="block">Showing</label>
                    <select
                        id="pagination"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                    <p className="w-full min-w-max">data out of {ListProgramCardData.length}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#667085]">Data per page</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="p-2 text-white rounded"
                        >
                            <IconLeft />
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(ListProgramCardData.length / itemsPerPage)}
                            className="p-2 text-white rounded"
                        >
                            <IconRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProgramCard;
