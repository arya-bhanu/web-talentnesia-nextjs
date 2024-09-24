'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useMentorForm } from './MentorForm';
import { academicTitleAPI } from '../../master-data/academic-title/api/academicTitleApi';
import { religionAPI } from '../../master-data/religion/api/religionApi';
import { Component as Datepicker } from '../components/datepicker/Datepicker';
import { Component as FileInput } from '../components/file-input/FileInput';
import { ProfilePictureInput } from '../components/profile-picture-input/ProfilePictureInput';
import { Component as SelectYear } from '../components/select-year/selectYear';
import { Region } from '../mentor/mentorForm.type';
import Link from 'next/link';
import { ResponseModal } from '../components/response-modal/responseModal';
import {
  APIResponseReligion,
  IComboReligion,
} from '../../master-data/religion/religion.type';
import { APIResponseAcademicLevel } from '../../master-data/academic-level/academicLevel.type';
import {
  APIResponseAcademicTitle,
  IComboAcademicTitle,
} from '../../master-data/academic-title/academicTitle.type';
import Dropdown from '@/backoffice/components/dropdown/Dropdown';
import {
  provinceAPI,
  Province,
  District,
  districtAPI,
  SubDistrict,
  subDistrictAPI,
} from '@/backoffice/components/dropdown/api/dropdownApi';
import AlertModal from '@/backoffice/components/alert-modal';
import ToasterProvider from '@/utils/ToasterProvider';
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
  showConfirmModal,
  setShowConfirmModal,
  showResultModal,
  setShowResultModal,
  isSuccess,
  confirmSubmit,
  showAlertModal,
  setShowAlertModal,
  setIsConfirmed,
  openModal,
}) => {
  const [religions, setReligions] = useState<APIResponseReligion[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null,
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );
  const [academicLevels, setAcademicLevels] = useState<
    APIResponseAcademicLevel[]
  >([]);
  const [academicTitles, setAcademicTitles] = useState<
    APIResponseAcademicTitle[]
  >([]);

  const styles = {
    inputField:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fetchedProvinces,
          fetchedAcademicTitles,
          fetchedReligions
        ] = await Promise.all([
          provinceAPI.getProvinces(100, 0),
          academicTitleAPI.all(),
          religionAPI.all()
        ]);

        setProvinces(fetchedProvinces);
        setAcademicTitles((fetchedAcademicTitles as IComboAcademicTitle).data);
        setReligions((fetchedReligions as IComboReligion).data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
  const fetchInitialData = async () => {
    if (form.provinceId) {
      setSelectedProvinceId(form.provinceId);
      const fetchedDistricts = await districtAPI.getDistrictsByProvince(
        form.provinceId,
        100,
        0,
      );
      setDistricts(fetchedDistricts);
    }
    if (form.districtId) {
      setSelectedDistrictId(form.districtId);
      const fetchedSubDistricts = await subDistrictAPI.getSubDistrictsByDistrict(
        form.districtId,
        100,
        0,
      );
      setSubDistricts(fetchedSubDistricts);
    }
  };

  fetchInitialData();
}, [form.provinceId, form.districtId]);

  
  return (
    <>
      <div className="container mx-auto p-1 max-w-full">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={form.id || ''} />
          <div className=" p-6 rounded-lg shadow-sm bg-white">
            <div className="flex items-center space-x-4">
              <ProfilePictureInput
                onChange={handleProfilePictureChange}
                initialValue={form.profilePicture}
                idCheck={form.id}
                id={form.id}
              />
            </div>
          </div>
          {/* Section A: Information Detail */}
          <div className=" p-4 md:p-6 rounded-lg shadow-sm bg-white">
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
                  value={form.name}
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
                  value={form.nik}
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
                  value={form.npwp}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input NPWP"
                />
              </div>
              <div>
                <label className="block mb-1">Foto KTP</label>
                <FileInput
                  id="photoKtp"
                  label="Upload KTP"
                  onChange={handleFileChange('photoKtp')}
                  initialValue={form.photoKtp}
                  initialFilename={form.photoKtpOrigin}
                />
              </div>
              <div>
                <label className="block mb-1">Foto NPWP</label>
                <FileInput
                  id="photoNpwp"
                  label="Upload NPWP"
                  onChange={handleFileChange('photoNpwp')}
                  initialValue={form.photoNpwp}
                  initialFilename={form.photoNpwpOrigin}
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
                  required
                >
                  <option className="hidden" value="" disabled>
                    Select Religion
                  </option>
                  {religions.map((religion: APIResponseReligion) => (
                    <option key={religion.id} value={religion.id}>
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
                      required
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
                  required
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
                  value={form.numberOfChildren ?? ''}
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
                  id="contract"
                  label="Upload Contract"
                  onChange={handleFileChange('contract')}
                  initialValue={form.contract}
                  initialFilename={form.contractOrigin}
                />
              </div>
            </div>
          </div>

          {/* Section B: Contact Information */}
          <div className=" p-4 md:p-6 rounded-lg shadow-sm bg-white">
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
                  value={form.phone}
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
                  value={form.linkedin}
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
                  value={form.email}
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
                  value={form.emergencyContact}
                  placeholder="Emergency Contact"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
            </div>
          </div>

          {/* Section C: Address */}
          <div className=" p-4 md:p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              C. Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="flex mb-1">
                  Province<div className="text-red-600">*</div>
                </label>
                <Dropdown<Province>
                  onItemSelect={(provinceId) => {
                    setSelectedProvinceId(provinceId);
                    handleInputChange({
                      target: { name: 'provinceId', value: provinceId },
                    } as React.ChangeEvent<HTMLSelectElement>);
                    setDistricts([]);
                    setSubDistricts([]);
                    setSelectedDistrictId(null);
                    handleInputChange({
                      target: { name: 'districtId', value: '' },
                    } as React.ChangeEvent<HTMLSelectElement>);
                    handleInputChange({
                      target: { name: 'subDistrictId', value: '' },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  getItems={provinceAPI.getProvinces}
                  itemToString={(item) => item.name}
                  containerClassName="w-full"
                  inputClassName="w-full rounded-l-lg"
                  placeholderText="Select Province"
                  initialValue={form.provinceId ? provinces.find(p => p.id === form.provinceId)?.name : ''}
                />
              </div>
              <div>
              <label className="flex mb-1">
                  District<div className="text-red-600">*</div>
                </label>
                <Dropdown<District>
                  key={selectedProvinceId || 'district'}
                  onItemSelect={(districtId) => {
                    setSelectedDistrictId(districtId);
                    handleInputChange({
                      target: { name: 'districtId', value: districtId },
                    } as React.ChangeEvent<HTMLSelectElement>);
                    setSubDistricts([]);
                  }}
                  getItems={(limit, offset) =>
                    selectedProvinceId
                      ? districtAPI.getDistrictsByProvince(
                          selectedProvinceId,
                          limit,
                          offset,
                        )
                      : Promise.resolve([])
                  }
                  itemToString={(item) => item.name}
                  containerClassName="w-full"
                  inputClassName="w-full rounded-l-lg"
                  placeholderText="Select District"
                  disabled={!selectedProvinceId}
                  initialValue={form.districtId ? districts.find(d => d.id === form.districtId)?.name : ''}
                />
              </div>
              <div>
              <label className="flex mb-1">
                  Sub District<div className="text-red-600">*</div>
                </label>
                <Dropdown<SubDistrict>
                  key={selectedDistrictId || 'subdistrict'}
                  onItemSelect={(subDistrictId) => {
                    handleInputChange({
                      target: { name: 'subDistrictId', value: subDistrictId },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  getItems={(limit, offset) =>
                    selectedDistrictId
                      ? subDistrictAPI.getSubDistrictsByDistrict(
                          selectedDistrictId,
                          limit,
                          offset,
                        )
                      : Promise.resolve([])
                  }
                  itemToString={(item) => item.name}
                  containerClassName="w-full"
                  inputClassName="w-full rounded-l-lg"
                  placeholderText="Select Sub District"
                  disabled={!selectedDistrictId}
                  initialValue={form.subDistrictId ? subDistricts.find(sd => sd.id === form.subDistrictId)?.name : ''}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Zip Code<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={form.zipCode}
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
                  value={form.addressKtp}
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
                  value={form.addressDomicile}
                  placeholder="Input Address (Domicile)"
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
            </div>
          </div>
          {/* Section D: Education */}
          <div className=" p-4 md:p-6 rounded-lg shadow-sm bg-white">
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

            {form.educations.map((educations, index) => (
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
                      id={`educations[${index}].name`}
                      name={`educations[${index}].name`}
                      value={educations.name}
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
                      id={`educations[${index}].titleId`}
                      name={`educations[${index}].titleId`}
                      value={educations.titleId || ''}
                      onChange={(e) => handleEducationChange(e, index)}
                      className={styles.inputField}
                    >
                      <option value="">Select Title</option>
                      {academicTitles.map((title: any, index: number) => {
                        return (
                          <option key={index} value={title.id}>
                            {title.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="flex mb-1">
                      Major<div className="text-red-600">*</div>
                    </label>
                    <input
                      type="text"
                      id={`educations[${index}].major`}
                      name={`educations[${index}].major`}
                      value={educations.major}
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
                      id={`educations[${index}].gpa`}
                      name={`educations[${index}].gpa`}
                      value={educations.gpa}
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
                      value={
                        educations.yearGraduate
                          ? parseInt(educations.yearGraduate, 10)
                          : null
                      }
                      onChange={(year) => {
                        const event = {
                          target: {
                            name: `educations[${index}].yearGraduate`,
                            value: year.toString(),
                          },
                        } as React.ChangeEvent<{
                          name?: string;
                          value: unknown;
                        }>;
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
                      id={`educations[${index}].certificateNumber`}
                      name={`educations[${index}].certificateNumber`}
                      value={educations.certificateNumber}
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
                      id={`educations[${index}].certificate`}
                      label="Upload Certificate"
                      onChange={(file) =>
                        handleEducationFileChange(index, 'certificate')(file)
                      }
                      initialValue={educations.certificate}
                      initialFilename={educations.certificateOrigin}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href={'/backoffice/manage-user'}>
              <button
                type="button"
                className="cancel-button bg-white border-red-500 border-2 text-red-500 py-2 px-4 rounded font-poppins"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="submit-button bg-yellow-400 text-black py-2 px-4 rounded font-poppins"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText={`Are you sure you want to ${form.id ? 'edit' : 'add'} this mentor?`}
      />
      <ResponseModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        onConfirm={() => setShowResultModal(false)}
        title={isSuccess ? 'Success' : 'Error'}
        message={
          isSuccess ? 'Berhasil Menambahkan Mentor' : 'Gagal Menambahkan Mentor'
        }
        confirmText="OK!"
      />
    </>
  );
};

export default MentorView;
