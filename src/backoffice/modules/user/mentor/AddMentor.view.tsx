'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useMentorForm } from './AddMentor';
import './addMentor.style.css';
import { provinceAPI } from '../../master-data/region/province/api/provinceApi';
import { cityAPI } from '../../master-data/region/city/api/cityApi';
import { subDistrictAPI } from '../../master-data/region/sub-disctrict/api/subDistrictApi';
import { academicTitleAPI } from '../../master-data/academic-title/api/academicTitleApi';
import { religionAPI } from '../../master-data/religion/api/religionApi';
import { Component as Datepicker } from '../components/datepicker/Datepicker';
import { Component as FileInput } from '../components/file-input/FileInput';
import { ProfilePictureInput } from '../components/profile-picture-input/ProfilePictureInput';
import { SelectYear } from '../components/select-year/selectYear';
import { Region } from './addMentor.type';

type MentorViewProps = ReturnType<typeof useMentorForm>;

export const MentorView: React.FC<MentorViewProps> = ({
  form,
    handleInputChange,
    handleEducationChange,
    addEducation,
    removeEducation,
    resetForm,
    handleFileChange,
    handleProfilePictureChange,
    handleEducationFileChange,
    handleSubmit,
}) => {
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [subDistricts, setSubDistricts] = useState<Region[]>([]);
  const [academicTitles, setAcademicTitles] = useState<Region[]>([]);
  const [religions, setReligions] = useState<Region[]>([]);

  const styles = {
    inputField: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProvinces = await provinceAPI.all();
        setProvinces(fetchedProvinces);

        const fetchedDistricts = await cityAPI.all();
        setDistricts(fetchedDistricts);

        const fetchedSubDistricts = await subDistrictAPI.all();
        setSubDistricts(fetchedSubDistricts);

        const fetchedAcademicTitles = await academicTitleAPI.all();
        setAcademicTitles(fetchedAcademicTitles);

        const fetchedReligions = await religionAPI.all();
        setReligions(fetchedReligions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-1 max-w-full">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="border p-6 rounded-lg shadow-sm bg-white">
            <div className="flex items-center space-x-4">
            <ProfilePictureInput
              onChange={handleProfilePictureChange}
            />
            </div>
          </div>

          {/* Section A: Information Detail */}
          <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
            <h2 className="md:text-xl font-semibold mb-4">
              A. Information Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex mb-1">
                  Name<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input name"
                  required
                />
              </div>
              <div className="rounded-lg w-full p-2.5 hidden md:block"></div>
              <div>
                <label className="flex mb-1">
                  NIK<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="nik"
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input NIK"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">NPWP</label>
                <input
                  type="text"
                  name="npwp"
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input NPWP"
                />
              </div>
              <div>
                <label className="block mb-1">Foto KTP</label>
                <FileInput
                  id="ktp-file"
                  label="Foto KTP"
                  onChange={handleFileChange('photoKtp')}
                />
              </div>
              <div>
                <label className="block mb-1">Foto NPWP</label>
                <FileInput
                  id="npwp-file"
                  label="Foto NPWP"
                  onChange={handleFileChange('photoNpwp')}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Place of Birth<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  onChange={handleInputChange}
                  value={form.placeOfBirth || ''}
                  required
                  className={styles.inputField}
                  placeholder="Enter Place of Birth"
                />
              </div>
              <div>
              <label className="flex mb-1">
                Date of Birth<div className="text-red-600">*</div>
              </label>
              <Datepicker
                id="dateOfBirth"
                onChange={(date: Date | null) => {
                  const customEvent = {
                    target: {
                      name: 'dateOfBirth',
                      value: date ? date.toISOString().split('T')[0] : '',
                    },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(customEvent);
                }}
                value={form.dateOfBirth ? new Date(form.dateOfBirth) : null}
                placeholder="Select Date of Birth"
              />
            </div>
              <div>
                <label className="flex mb-1">
                  Religion<div className="text-red-600">*</div>
                </label>
                <select
                  name="religionId"
                  onChange={handleInputChange}
                  value={form.religionId || ''}
                  className={styles.inputField}
                >
                  <option className="hidden" value="" disabled>
                    Select Religion
                  </option>
                  {religions.map((religion, index) => (
                    <option key={index} value={religion.id}>
                      {religion.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
            <label className="flex mb-1">
              Gender<div className="text-red-600">*</div>
            </label>
            <div className="flex items-center mt-3 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  onChange={handleInputChange}
                  checked={form.gender === 1}
                  className="mr-2 size-4 md:size-6 text-sm md:text-base place-self-center"
                />
                Male
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  onChange={handleInputChange}
                  checked={form.gender === 2}
                  className="mr-2 size-4 md:size-6 text-sm md:text-base"
                />
                Female
              </label>
            </div>
          </div>
              <div>
                <label className="flex mb-1">
                  Mariage Status<div className="text-red-600">*</div>
                </label>
                <select
                  name="mariageStatus"
                  onChange={handleInputChange}
                  value={form.mariageStatus || ''}
                  className={styles.inputField}
                >
                  <option className="hidden" value="" disabled>
                    Select Mariage Status
                  </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Number of Children</label>
                <input
                  type="number"
                  name="numberOfChildren"
                  placeholder="Input Number of Child"
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Employee Contract<div className="text-red-600">*</div>
                </label>
                <FileInput
                  id="contract-file"
                  label="Employee Contract"
                  onChange={handleFileChange('contract')}
                />
              </div>
            </div>
          </div>

          {/* Section B: Contact Information */}
          <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              B. Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex mb-1">
                  Phone Number<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  LinkedIn Link<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="Linkedin Link"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Email<div className="text-red-600">*</div>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Emergency Contact<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  placeholder="Emergency Contact"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
            </div>
          </div>

          {/* Section C: Address */}
          <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              C. Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex mb-1">
                  Province<div className="text-red-600">*</div>
                </label>
                <select
                name="provinceId"
                value={form.provinceId || ''}
                onChange={handleInputChange}
                className={styles.inputField}
              >
                <option className="hidden" value="" disabled>
                  Select Province
                </option>
                {provinces?.map((province, index) => (
                  <option key={index} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              </div>
              <div>
                <label className="flex mb-1">
                  City/District<div className="text-red-600">*</div>
                </label>
                <select
                  name="districtId"
                  value={form.districtId || ''}
                  onChange={handleInputChange}
                  className={styles.inputField}
                >
                  <option className="hidden" value="" disabled>
                    Select City/District
                  </option>
                  {districts?.map((district, index) => (
                    <option key={index} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex mb-1">
                  Sub District<div className="text-red-600">*</div>
                </label>
                <select
                  name="subDistrictId"
                  value={form.subDistrictId || ''}
                  onChange={handleInputChange}
                  className={styles.inputField}
                >
                  <option className="hidden" value="" disabled>
                    Select Sub District
                  </option>
                  {subDistricts?.map((subDistrict, index) => (
                    <option key={index} value={subDistrict.id}>
                      {subDistrict.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex mb-1">
                  Zip Code<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Input Zip Code"
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Address (KTP)<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="addressKtp"
                  placeholder="Input Address (KTP)"
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Address (Domicile)<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="addressDomicile"
                  placeholder="Input Address (Domicile)"
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
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
                <div className="flex text-[12px] md:text-lg font-poppins">
                  <Image
                    src="/img/manage-user/mdi_plus-circle.svg"
                    width={20}
                    height={20}
                    alt="AddEducation"
                    className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
                  />
                  Add New Education
                </div>
              </button>
            </div>

            {form.educations.map((education, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center mb-4 w-full">
                  <div>
                    <h3 className="text-lg font-semibold">{index + 1}.</h3>
                  </div>
                  <div>
                    {form.educations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 px-4 py-2 rounded flex items-center"
                      >
                        <Image
                          src="/img/manage-user/Delete.svg"
                          width={50}
                          height={50}
                          alt="RemoveEducation"
                          className="w-8 h-8 md:w-12 md:h-12 cursor-pointer mr-2"
                        />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex mb-1">
                      University Name<div className="text-red-600">*</div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="University Name"
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                    <label className="flex mb-1">
                      Academic Title<div className="text-red-600">*</div>
                    </label>
                    <select
                      name="titleId"
                      value={education.titleId || ''}
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    >
                      <option className="hidden" value="" disabled>
                        Select Academic Title
                      </option>
                      {academicTitles.map((level, idx) => (
                        <option key={idx} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex mb-1">
                      Major<div className="text-red-600">*</div>
                    </label>
                    <input
                      type="text"
                      name="major"
                      placeholder="Input Major"
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                    <label className="flex mb-1">
                      GPA<div className="text-red-600">*</div>
                    </label>
                    <input
                      type="text"
                      name="gpa"
                      placeholder="Input GPA"
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                  <label className="flex mb-1">
                    Year Graduated<div className="text-red-600">*</div>
                  </label>
                  <SelectYear
                    id={`educations.${index}.yearGraduate`}
                    value={education.yearGraduate ? parseInt(education.yearGraduate, 10) : null}
                    onChange={(year) => {
                      const event = {
                        target: {
                          name: 'yearGraduate',
                          value: year.toString(),
                        },
                      } as React.ChangeEvent<{ name?: string; value?: string }>;
                      handleEducationChange(event, index);
                    }}
                  />
                </div>
                  <div>
                    <label className="flex mb-1">
                      Certificate Number<div className="text-red-600">*</div>
                    </label>
                    <input
                      type="text"
                      name="certificateNumber"
                      placeholder="Input Certificate Number"
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                    <label className="flex mb-1">
                      Academic Certificate<div className="text-red-600">*</div>
                    </label>
                    <FileInput
                      id={`certificate-file-${index}`}
                      label={`Academic Certificate ${index + 1}`}
                      onChange={handleEducationFileChange(index, 'certificate')}
                    />
                  </div>
                </div>
              </div>
            ))}
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

export default MentorView;
