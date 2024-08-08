'use client';

import React, { useEffect, useState } from 'react';
import { religions, maritalStatus, academicTitles, provinces, cityDistrict, subDistrict, placesOfBirth } from './mentors.data';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'flowbite';

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


const MentorView = () => {
    const [form, setForm] = useState({
        name: '',
        nik: '',
        npwp: '',
        placeOfBirth: '',
        dateOfBirth: '',
        religion: '',
        gender: 'Male',
        maritalStatus: '',
        numberOfChildren: '',
        phoneNumber: '',
        email: '',
        province: '',
        // city: '',
        subDistrict: '',
        zipCode: '',
        addressKtp: '',
        addressDomicile: '',
        education: [{
            universityName: '',
            academicTitle: '',
            major: '',
            gpa: '',
            yearGraduated: '',
            certificateNumber: ''
        }],
        profilePicture: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleProfilePictureRemove = () => {
        setForm({ ...form, profilePicture: null });
    };

    const addEducation = () => {
        setForm({
            ...form,
            education: [...form.education, {
                universityName: '',
                academicTitle: '',
                major: '',
                gpa: '',
                yearGraduated: '',
                certificateNumber: ''
            }]
        });
    };

    const removeEducation = (index: number) => {
        setForm({
            ...form,
            education: form.education.filter((_, i) => i !== index)
        });
    };

    return (
        <>
        <div className="container mx-auto p-8 max-w-full">
            {/* <h1 className="text-3xl font-bold mb-8">Add Mentor</h1>
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
                            <input type="text" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins" placeholder="Input name" required />
                        </div>
                        <div className='rounded-lg w-full p-2.5 hidden md:block'></div>
                        <div>
                            <label className="flex mb-1">NIK<div className='text-red-600'>*</div></label>
                            <input type="text" name="nik" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " placeholder="Input NIK" required />
                        </div>
                        <div>
                            <label className="block mb-1">NPWP</label>
                            <input type="text" name="npwp" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins" placeholder="Input NPWP" required />
                        </div>
                        <div>
                            <label className="block mb-1">Foto KTP</label>
                            <FileInput id="ktp-file" label="Foto KTP" />
                        </div>
                        <div>
                            <label className="block mb-1">Foto NPWP</label>
                            <FileInput id="npwp-file" label="Foto NPWP" />
                        </div>
                        <div>
                            <label className="flex mb-1">Place of Birth<div className='text-red-600'>*</div></label>
                            <select name="placeOfBirth" onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
                            {/* <option className='hidden' value={''} disabled selected>Select Place of Birth</option> */}
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
                        onChange={handleChange} 
                        value={form.religion}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins"
                        >
                        <option value="" disabled>Select Religion</option>
                        {religions.map((religion, index) => (
                            <option key={index} value={religion}>{religion}</option>
                        ))}
                        </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Gender<div className='text-red-600'>*</div></label>
                            <div className="flex items-center mt-3 space-x-4">
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Male" onChange={handleChange} checked={form.gender === 'Male'} className="mr-2 size-4 md:size-6 text-sm md:text-base place-self-center" />
                                    Male
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Female" onChange={handleChange} checked={form.gender === 'Female'} className="mr-2 size-4 md:size-6 text-sm md:text-base" />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="flex mb-1">Mariage Status<div className='text-red-600'>*</div></label>
                            <select name="maritalStatus" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins ">
                            {/* <option className='hidden' value={''} disabled selected>Select Mariage Status</option> */}
                                {maritalStatus.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Number of Children</label>
                            <input type="number" name="numberOfChildren" placeholder="Input Number of Child" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Employee Contract<div className='text-red-600'>*</div></label>
                            <FileInput id="contract-file" label="Employee Contract" />
                        </div>
                    </div>
                </div>

                {/* Section B: Contact Information */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">B. Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="flex mb-1">Phone Number<div className='text-red-600'>*</div></label>
                            <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">LinkedIn Link<div className='text-red-600'>*</div></label>
                            <input type="text" name="linkedin" placeholder="Linkedin Link" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Email<div className='text-red-600'>*</div></label>
                            <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Emergency Contact<div className='text-red-600'>*</div></label>
                            <input type="text" name="emergencyContact" placeholder="Emergency Contact" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                    </div>
                </div>

                {/* Section C: Address */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">C. Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex mb-1">Province<div className='text-red-600'>*</div></label>
                            <select name="province" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                                {/* <option className='hidden' value={''} disabled selected>Select Province</option> */}
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="flex mb-1">City/District<div className='text-red-600'>*</div></label>
                            <select name="city" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                                {/* <option className='hidden' value={''} disabled selected>Select City/District</option> */}
                                {cityDistrict.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Sub District<div className='text-red-600'>*</div></label>
                            <select name="subDistrict" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins">
                            {/* <option className='hidden' value={''} disabled selected>Select Sub District</option> */}
                            {subDistrict.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                            <label className="flex mb-1">Zip Code<div className='text-red-600'>*</div></label>
                            <input type="text" name="zipCode" placeholder="Input Zip Code" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Address (KTP)<div className='text-red-600'>*</div></label>
                            <input type="text" name="addressKtp" placeholder="Input Address (KTP)" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                        <div>
                            <label className="flex mb-1">Address (Domicile)<div className='text-red-600'>*</div></label>
                            <input type="text" name="addressDomicile" placeholder="Input Address (Domicile)" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                        </div>
                    </div>
                </div>

                {/* Section D: Education */}
                <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">D. Education</h2>
                        
                        <button 
                            type="button" 
                            onClick={addEducation} 
                            className="text-black px-4 py-2 rounded"
                        >
                            <div className='flex text-[12px] md:text-lg font-poppins'>
                            <Image src="/img/manage-user/mdi_plus-circle.svg" width={20} height={20} alt="AddEducation" className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                            Add New Education
                            </div>
                        </button>
                </div>

                    {form.education.map((education, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <div className="flex justify-between items-center mb-4 w-full">
                                <div>
                                    <h3 className="text-lg font-semibold">{index + 1}.</h3>
                                </div>
                                <div>
                                    {form.education.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeEducation(index)} 
                                                className="text-red-500 px-4 py-2 rounded flex items-center"
                                            >
                                                <Image src="/img/manage-user/Delete.svg" width={50} height={50} alt="RemoveEducation" className="w-8 h-8 md:w-12 md:h-12 cursor-pointer mr-2"
 />
                                            </button>
                                        )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex mb-1">University Name<div className='text-red-600'>*</div></label>
                                    <input type="text" name={`universityName-${index}`} placeholder="University Name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                                </div>
                                <div>
                                    <label className="flex mb-1">Academic Title<div className='text-red-600'>*</div></label>
                                    <select name={`academicTitle-${index}`} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins ">
                                        {/* <option className='hidden' value={''} disabled selected>Select Academic Title</option> */}
                                        {academicTitles.map((title, idx) => (
                                            <option key={idx} value={title}>{title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="flex mb-1">Major<div className='text-red-600'>*</div></label>
                                    <input type="text" name={`major-${index}`} placeholder="Input Major" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                                </div>
                                <div>
                                    <label className="flex mb-1">GPA<div className='text-red-600'>*</div></label>
                                    <input type="text" name={`gpa-${index}`} placeholder="Input GPA" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                                </div>
                                <div>
                                    <label className="flex mb-1">Year Graduated<div className='text-red-600'>*</div></label>
                                    <Datepicker/>
                                </div>
                                <div>
                                    <label className="flex mb-1">Certificate Number<div className='text-red-600'>*</div></label>
                                    <input type="text" name={`certificateNumber-${index}`} placeholder="Input Certificate Number" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   font-poppins " />
                                </div>
                                <div>
                                    <label className="flex mb-1">Academic Certificate<div className='text-red-600'>*</div></label>
                                    <FileInput id={`certificate-file-${index}`} label={`Academic Certificate ${index + 1}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                    <button type="button" className="bg-white border-red-500 border-2 text-red-500 py-2 px-4 rounded font-poppins">Cancel</button>
                    <button type="submit" className="bg-yellow-400 text-black py-2 px-4 rounded font-poppins">Submit</button>
                </div>
            </form>
        </div>
    </>
    );
};

export default MentorView;
