'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, userAPI } from './api/dropdownApi'; 
import Arrow from '@/../public/icons/arrow-up.svg';

interface DropdownProps {
  onUserSelect: (userId: string) => void;
  initialUsers?: User[]; 
}

const Dropdown: React.FC<DropdownProps> = ({ onUserSelect, initialUsers = [] }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(initialUsers.length);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    undefined,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadMoreUsers = async () => {
    if (loading || allLoaded) return;

    setLoading(true);

    try {
      const newUsers = await userAPI.getUsers(limit, offset);

      if (newUsers.length === 0) {
        setAllLoaded(true);
      } else {
        if (newUsers.length < limit) {
          setAllLoaded(true);
        }

        setUsers((prevUsers) => {
          const uniqueUsers = [...prevUsers, ...newUsers].filter(
            (user, index, self) =>
              index === self.findIndex((u) => u.id === user.id),
          );
          return uniqueUsers;
        });

        setOffset((prevOffset) => prevOffset + limit);
      }
    } catch (error) {
      setAllLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownToggle = useCallback(() => {
    if (!dropdownOpen && !allLoaded) {
      loadMoreUsers();
    }
    setDropdownOpen((prev) => !prev);
  }, [dropdownOpen, allLoaded]);

  useEffect(() => {
    if (dropdownOpen) {
      const handleScroll = () => {
        if (dropdownRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = dropdownRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadMoreUsers();
          }
        }
      };

      const dropdownElement = dropdownRef.current;
      dropdownElement?.addEventListener('scroll', handleScroll);

      return () => {
        dropdownElement?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [dropdownOpen, loading, allLoaded]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setDropdownOpen(false);
    onUserSelect(userId); // Panggil prop onUserSelect saat user dipilih
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">Select User</label>
      <div
        className="border border-gray-300 shadow-sm flex w-[26rem] items-center rounded-lg cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <input
          type="text"
          placeholder="Select User"
          value={
            selectedUser
              ? `${selectedUser.name} - ${selectedUser.email}`
              : searchTerm
          }
          onChange={handleSearchChange}
          className="p-2 border-none flex-1 outline-none focus:rounded-l-lg pr-8"
        />
        <Arrow
          className={`mx-2 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 w-[26rem] bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <ul className="divide-y divide-gray-200 overflow-y-auto max-h-60">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleUserSelect(user.id)}
                >
                  <span className="block font-medium">{user.name}</span>
                  <span className="block text-gray-500 text-sm">
                    {user.email}
                  </span>
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">No users found.</li>
            )}
          </ul>
          {loading && (
            <div className="p-2 text-center text-gray-500">Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
