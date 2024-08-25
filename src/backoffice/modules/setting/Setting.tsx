'use client'

import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { SessionData } from '@/lib/lib'
import { getSession } from '@/lib/action'

export const Setting = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [sessionData, setSessionData] = useState<Partial<SessionData> | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const session = await getSession();
      setSessionData(session);
    };

    fetchSessionData();
  }, []);

  const handleCancelClick = () => {
    // handle cancel
  };

  const handleSubmitClick = () => {
    // handle form submission
  };

  return (
    <div className="flex flex-row space-x-8 p-6">
      <div className="w-1/3">
        <DropFile />
      </div>
      <div className="w-2/3 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            placeholder="Nama" 
            value={sessionData?.name || ''}
            onChange={(e) => setSessionData({...sessionData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">No Handphone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            placeholder="No Handphone" 
            // Tambahkan value dan onChange jika nomor telepon tersedia di sessionData
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            placeholder="Email" 
            value={sessionData?.email || ''}
            onChange={(e) => setSessionData({...sessionData, email: e.target.value})}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              // Password tidak diisi otomatis untuk keamanan
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                <Image
                  src={showPassword ? "/icons/icon-eyeslash.svg" : "/icons/icon-eye.svg"}
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                <Image
                  src={showConfirmPassword ? "/icons/icon-eyeslash.svg" : "/icons/icon-eye.svg"}
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>

          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCancelClick}
              className="cancel-button bg-white hover:bg-[#F04438] border-[#F04438] border-2 text-[#F04438] hover:text-white py-2 px-4 rounded-lg font-poppins"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmitClick}
              className="submit-button bg-[#FFC862] hover:bg-[#fbbf24] text-black py-2 px-4 rounded-lg font-poppins"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}