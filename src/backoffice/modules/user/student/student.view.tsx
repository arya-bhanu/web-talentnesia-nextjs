'use client';

import React, { useState } from 'react';
import { religions, maritalStatus, provinces, cityDistrict, subDistrict, placesOfBirth, academicLevels } from './student.data';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useStudentForm } from "./student";
import './student.style.css';


const Datepicker = dynamic(
() => import('@/backoffice/components/datepicker/Datepicker').then((mod) => mod.Component),
  { ssr: false }
);

const FileInput = dynamic(
  () => import('@/backoffice/components/file-input/FileInput').then((mod) => mod.Component),
  { ssr: false }
);

const ProfilePictureInput = dynamic(
  () => import('@/backoffice/components/profile-picture-input/ProfilePictureInput').then((mod) => mod.ProfilePictureInput),
  { ssr: false }
);



type StudentViewProps = ReturnType<typeof useStudentForm>;

export const StudentView: React.FC<StudentViewProps> = ({
  form,
  handleInputChange,
  handleEducationChange,
  resetForm
}) => {

    return (
        <>
        <div className="container mx-auto p-1 max-w-full">
            {/* <h1 className="text-3xl font-bold mb-8">Add Student</h1>
            <Breadcrumb pathSegments={[]}/> */}
            <form className="space-y-8">
                <div className="border p-6 rounded-lg shadow-sm bg-white">
                    <div className="flex items-center space-x-4">
                        <ProfilePictureInput/>
                    </div>
                </div>

                {/* Section A: Information Detail */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="md:text-xl font-semibold mb-4">A. Information Detail</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex mb-1">Name<div className='text-red-600'>*</div></label>
                            <input type="text" name="name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins" placeholder="Input name" required />
                        </div>
                        <div className='rounded-lg w-full p-2.5 hidden md:block'></div>
                        <div>
                            <label className="flex mb-1">NIK/Identity Number<div className='text-red-600'>*</div></label>
                            <input type="text" name="nik" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " placeholder="Input NIK" required />
                        </div>
                        <div>
                            <label className="block mb-1">Foto KTP</label>
                            <FileInput id="ktp-file" label="Foto KTP" />
                        </div>  
                        <div>
                            <label className="flex mb-1">Place of Birth<div className='text-red-600'>*</div></label>
                            <select name="placeOfBirth" onChange={handleInputChange} value={form.placeOfBirth || ""} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
                            <option className='hidden' value="" disabled>Select Place of Birth</option>
                            {placesOfBirth.map((place, index) => (
                                <option key={index} value={place}>{place}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Date of Birth<div className='text-red-600'>*</div></label>
                            <Datepicker/>
                        </div>
                        <div>
                            <label className="flex mb-1">Religion<div className='text-red-600'>*</div></label>
                        <select 
                        name="religion" 
                        onChange={handleInputChange} 
                        value={form.religion || ""}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins"
                        >
                        <option className='hidden' value="" disabled>Select Religion</option>
                        {religions.map((religion, index) => (
                            <option key={index} value={religion}>{religion}</option>
                        ))}
                        </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Gender<div className='text-red-600'>*</div></label>
                            <div className="flex items-center mt-3 space-x-4">
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Male" onChange={handleInputChange} checked={form.gender === 'Male'} className="mr-2 size-4 md:size-6 text-sm md:text-base place-self-center" />
                                    Male
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Female" onChange={handleInputChange} checked={form.gender === 'Female'} className="mr-2 size-4 md:size-6 text-sm md:text-base" />
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section B: Contact Information */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">B. Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="flex mb-1">Phone Number<div className='text-red-600'>*</div></label>
                            <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Email<div className='text-red-600'>*</div></label>
                            <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                    </div>
                </div>

                {/* Section C: Address */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">C. Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex mb-1">Province<div className='text-red-600'>*</div></label>
                            <select name="province" value={form.province || ""} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                                <option className='hidden' value="" disabled>Select Province</option>
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="flex mb-1">City/District<div className='text-red-600'>*</div></label>
                            <select name="city" value={form.city || ""} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                                <option className='hidden' value={''} disabled>Select City/District</option>
                                {cityDistrict.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Sub District<div className='text-red-600'>*</div></label>
                            <select name="subDistrict" value={form.subDistrict || ""} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                            <option className='hidden' value={''} disabled>Select Sub District</option>
                            {subDistrict.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Zip Code<div className='text-red-600'>*</div></label>
                            <input type="text" name="zipCode" placeholder="Input Zip Code" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Address (KTP)<div className='text-red-600'>*</div></label>
                            <input type="text" name="addressKtp" placeholder="Input Address (KTP)" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Address (Domicile)<div className='text-red-600'>*</div></label>
                            <input type="text" name="addressDomicile" placeholder="Input Address (Domicile)" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                    </div>
                </div>

                {/* Section D: Education */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">D. Last Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                    <label className="flex mb-1">Institution Name<div className='text-red-600'>*</div></label>
                                    <input type="text" name={"universityName"} placeholder="University Name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                                </div>
                                <div>
                                    <label className="flex mb-1">Academic Level<div className='text-red-600'>*</div></label>
                                    <select name="academicLevel" value={form.academicLevel || ""} onChange={handleInputChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins ">
                                    <option className='hidden' value="" disabled>Select Academic Level</option>
                                        {academicLevels.map((level, idx) => (
                                            <option key={idx} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="flex mb-1"> Start From<div className='text-red-600'>*</div></label>
                                    <Datepicker/>
                                </div>
                                <div>
                                    <label className="flex mb-1"> Until<div className='text-red-600'>*</div></label>
                                    <Datepicker/>
                                </div>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                <button 
                    type="button" 
                    onClick={resetForm} 
                    className="cancel-button bg-white border-red-500 border-2 text-red-500 py-2 px-4 rounded font-poppins"
                    >
                    Cancel
                    </button>
                    <button 
                    type="submit" 
                    className="submit-button bg-yellow-400 text-black py-2 px-4 rounded font-poppins"
                    >
                    Submit
                    </button>
                </div>
            </form>
        </div>
    </>
    );
};

export default StudentView;
