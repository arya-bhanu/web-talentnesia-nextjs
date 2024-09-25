import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useStudentForm } from './StudentForm';
import { academicLevelAPI } from '../../master-data/academic-level/api/academicLevelApi';
import { religionAPI } from '../../master-data/religion/api/religionApi';
import { Component as Datepicker } from '../components/datepicker/Datepicker';
import { Component as FileInput } from '../components/file-input/FileInput';
import { ProfilePictureInput } from '../components/profile-picture-input/ProfilePictureInput';
import { Component as SelectYear } from '../components/select-year/selectYear';
import { Region } from '../student/studentForm.type';
import Link from 'next/link';
import { ResponseModal } from '../components/response-modal/responseModal';
import {
  APIResponseAcademicLevel,
  IComboAcademicLevel,
} from '../../master-data/academic-level/academicLevel.type';
import { fetchAxios } from '@/lib/fetchAxios';
import {
  APIResponseReligion,
  IComboReligion,
} from '../../master-data/religion/religion.type';
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

type StudentViewProps = ReturnType<typeof useStudentForm>;

export const StudentView: React.FC<StudentViewProps> = ({
  form,
  handleInputChange,
  resetForm,
  handleFileChange,
  handleProfilePictureChange,
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
  const [academicLevels, setAcademicLevels] = useState<
    APIResponseAcademicLevel[]
  >([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null,
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );

  const styles = {
    inputField:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fetchedReligions,
          fetchedProvinces,
          fetchedAcademicLevels,
        ] = await Promise.all([
          religionAPI.all(),
          provinceAPI.getProvinces(100, 0),
          academicLevelAPI.all(),
        ]);

        setReligions((fetchedReligions as IComboReligion).data);
        setProvinces(fetchedProvinces);
        setAcademicLevels((fetchedAcademicLevels as IComboAcademicLevel).data);
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
          <div className="border p-6 rounded-lg shadow-sm bg-white">
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
                  value={form.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input name"
                  required
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Password<div className="text-red-600">*</div>
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password || ''}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Input Password"
                />
              </div>
              <div>
                <label className="flex mb-1">
                  NIK/Identity Number<div className="text-red-600">*</div>
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
                  {religions.map((religion: any, index: number) => {
                    return (
                      <option key={index} value={religion.id}>
                        {religion.name}
                      </option>
                    );
                  })}
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
                  value={form.phone}
                  placeholder="Phone Number"
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

          {/* Section D. Last Education */}
          <div className="border p-4 md:p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              D. Last Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex mb-1">
                  Institution Name<div className="text-red-600">*</div>
                </label>
                <input
                  type="text"
                  name="educationName"
                  value={form.educationName}
                  placeholder="University Name"
                  required
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Academic Level<div className="text-red-600">*</div>
                </label>
                <select
                  name="educationLevelId"
                  value={form.educationLevelId || ''}
                  onChange={handleInputChange}
                  className={styles.inputField}
                >
                  <option className="hidden" value="" disabled>
                    Select Academic Level
                  </option>
                  {academicLevels.map((education: any, index: number) => {
                    return (
                      <option key={index} value={education.id}>
                        {education.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="flex mb-1">
                  Start From<div className="text-red-600">*</div>
                </label>
                <SelectYear
                  id="educationStart"
                  value={
                    form.educationStart
                      ? parseInt(form.educationStart, 10)
                      : null
                  }
                  onChange={(year) => {
                    handleInputChange({
                      target: {
                        name: 'educationStart',
                        value: year.toString(),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <label className="flex mb-1">
                  Until<div className="text-red-600">*</div>
                </label>
                <SelectYear
                  id="educationEnd"
                  value={
                    form.educationEnd ? parseInt(form.educationEnd, 10) : null
                  }
                  onChange={(year) => {
                    handleInputChange({
                      target: { name: 'educationEnd', value: year.toString() },
                    });
                  }}
                />
              </div>
            </div>
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
        messageText={`Are you sure you want to ${form.id ? 'edit' : 'add'} this School Operator?`}
      />
      <ResponseModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        onConfirm={() => setShowResultModal(false)}
        title={isSuccess ? 'Success' : 'Error'}
        message={
          isSuccess
            ? 'Berhasil Menambahkan Student'
            : 'Gagal Menambahkan Student'
        }
        confirmText="OK!"
      />
    </>
  );
};

export default StudentView;
