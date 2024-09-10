'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Arrow from '@/../public/icons/arrow-down.svg';
import debounce from 'lodash.debounce';

interface DropdownProps<T> {
  onItemSelect: (itemId: string) => void;
  getItems: (limit: number, offset: number) => Promise<T[]>;
  initialItems?: T[];
  itemToString: (item: T) => string;  
  containerClassName?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  listItemClassName?: string;
  labelClassName?: string;
  placeholderText?: string;
  label?: string;
  disabled?: boolean;
  resetOnChange?: boolean;
}
const Dropdown = <T extends { id: string }>({
  onItemSelect,
  getItems,
  initialItems = [],
  itemToString,
  containerClassName = '',
  inputClassName = '',
  dropdownClassName = '',
  listItemClassName = '',
  labelClassName = '',
  placeholderText = '',
  label = '',
  disabled = false,
  resetOnChange = false,
}: DropdownProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [offset, setOffset] = useState(initialItems.length);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resetOnChange) {
      setItems([]);
      setOffset(0);
      setAllLoaded(false);
      setSelectedItemId(undefined);
      setSearchTerm('');
    }
  }, [resetOnChange]);
  const loadMoreItems = useCallback(
    async () => {
      if (loading || allLoaded) return;

      setLoading(true);

      try {
        const newItems = await getItems(20, offset); 

        if (newItems.length === 0) {
          setAllLoaded(true);
        } else {
          setItems(prevItems => {
            const combinedItems = [...prevItems, ...newItems];
            const uniqueItems = Array.from(new Set(combinedItems.map(item => item.id)))
              .map(id => combinedItems.find(item => item.id === id))
              .filter((item): item is T => item !== undefined);
            return uniqueItems;
          });
          setOffset(prevOffset => prevOffset + newItems.length);
        }
      } catch (error) {
        console.error('Error loading items:', error);
        setError('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [loading, allLoaded, getItems, offset]
  );  );  const handleDropdownToggle = useCallback(() => {
    if (!dropdownOpen) {
      loadMoreItems(); 
    }
    setDropdownOpen((prev) => !prev);
  }, [dropdownOpen, loadMoreItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = dropdownRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && !allLoaded) { // Increased sensitivity
          loadMoreItems();
        }
      }
    };

    const dropdownElement = dropdownRef.current;

    if (dropdownOpen && dropdownElement) {
      dropdownElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      dropdownElement?.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen, loadMoreItems, loading, allLoaded]);

  const handleItemSelect = (itemId: string) => {
    if (selectedItemId !== itemId) {
      setSelectedItemId(itemId);
      onItemSelect(itemId);
    }
    setDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (selectedItem && newValue !== itemToString(selectedItem)) {
      clearSelectedItem();
    }
    setSearchTerm(newValue);
  };

  const clearSelectedItem = () => {
    setSelectedItemId(undefined);
    onItemSelect('');
  };
  
  const selectedItem = items.find((item) => item.id === selectedItemId);
  const filteredItems = items.filter((item) =>
    itemToString(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={`relative ${containerClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <label className={`block mb-2 text-sm font-medium text-gray-900 ${labelClassName}`}>
        {label}
      </label>
      <div
        className={`border border-gray-300 shadow-sm flex w-[26rem] items-center rounded-lg ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${inputClassName}`}
        onClick={disabled ? undefined : handleDropdownToggle}
      >
        <div className="relative flex items-center w-full">
          <input
            type="text"
            placeholder={placeholderText}
            value={selectedItem ? itemToString(selectedItem) : searchTerm}
            onChange={handleSearchChange}
            className={`p-2 border-none flex-1 outline-none pr-8 ${inputClassName}`}
          />
          <Arrow className={`mx-2 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full left-0 mt-2 w-[26rem] bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10 ${dropdownClassName}`}
        >
          {error && <div className="p-2 text-red-500 text-sm">{error}</div>}
          <ul className="divide-y divide-gray-200">
      {filteredItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${listItemClassName}`}
                onClick={() => handleItemSelect(item.id)}
              >
                <span className="block font-normal text-sm text-gray-700">{itemToString(item)}</span>
              </li>
            ))}
          </ul>
          {loading && (            <div className="p-2 text-center text-gray-500">Loading...</div>
          )}
          {!loading && !allLoaded && (
            <div className="p-2 text-center text-gray-500">Scroll for more...</div>
          )}
          {allLoaded && (
            <div className="p-2 text-center text-gray-500">All items loaded</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
