import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ListProgramCardView } from './ListProgramCard.view';
import { ListProgramCardAPI } from './api/listProgramCardApi';
import { ListProgramCardType } from './listProgramCard.type';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';

interface ListProgramCardProps {
    className?: string;
}

const ListProgramCard: React.FC<ListProgramCardProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();
    const [programCards, setProgramCards] = useState<ListProgramCardType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProgramCards = async () => {
            if (!id) {
                setError("No school ID provided");
                return;
            }

            try {
                const data = await ListProgramCardAPI.fetchProgram(id);
                setProgramCards(data);
            } catch (error) {
                console.error('Failed to fetch program cards:');
                setError("Failed to load program cards. Please try again.");
            }
        };
        fetchProgramCards();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredItems = Array.isArray(programCards) 
        ? programCards.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded"
            />
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
                    <p className="w-full min-w-max">data out of {filteredItems.length}</p>
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
                            disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
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
