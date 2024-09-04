'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IUserView, User, TabFlexProps } from './user.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from './components/data-table/DataTable';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { TabFlex } from './components/tabs/tabs';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import Import from '@/../public/icons/manage-user/import_export.svg';
import { userAPI } from './api/userApi';
import { mentorAPI } from './mentor/api/mentorApi';
import { schoolOperatorAPI } from './school-operator/api/schoolOperatorApi';
import { studentAPI } from './student/api/studentApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ResponseModal } from './components/response-modal/responseModal';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Spinner } from "flowbite-react";
import { ImportModal } from './components/import-modal/ImportModal';

const UserView: React.FC<IUserView> = ({
  Filter,
  setFilter,
  isLoading,
  setIsLoading,
  isPopupOpen,
  setIsPopupOpen,
  handleActionButtonRow,
}) => {
  const [activeTab, setActiveTab] = useState('Mentor');
  const [data, setData] = useState<User[]>([]);
  const [profilePictures, setProfilePictures] = useState<Record<string, string>>({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    const action = searchParams.get('action');
    const userType = searchParams.get('userType');
    if (success === 'true') {
      setIsSuccess(true);
      if (userType === 'student') {
        setModalMessage(action === 'add' ? 'Berhasil Menambahkan Student' : 'Berhasil Mengubah Student');
        setActiveTab('Student');
      } else if (userType ==='School Operator') {
        setModalMessage(action === 'add' ? 'Berhasil Menambahkan School Operator' : 'Berhasil Mengubah School Operator');
        setActiveTab('School Operator');
      } else {
        setModalMessage(action === 'add' ? 'Berhasil Menambahkan Mentor' : 'Berhasil Mengubah Mentor');
        setActiveTab('Mentor');
      }
      setShowResultModal(true);
      router.replace('/backoffice/manage-user');
    }
  }, [searchParams, router]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    let fetchedData: User[] = [];
    try {
      switch (activeTab) {
        case 'Mentor':
          fetchedData = await mentorAPI.fetchMentors();
          break;
        case 'Student':
          fetchedData = await studentAPI.fetchStudents();
          break;
        case 'School Operator':
          fetchedData = await schoolOperatorAPI.fetchSchoolOperators();
          break;
      }
      setData(fetchedData);
      
      const pictures: Record<string, string> = {};
      for (const user of fetchedData) {
        if (user.photoProfile) {
          const thumbPath = user.photoProfile.replace('/origins/', '/thumbs/');
          const imageUrl = `${process.env.API_SERVER_URL}/v1/file/${thumbPath}`;
          pictures[user.id] = imageUrl;
        } else {
          pictures[user.id] = '/img/manage-user/profile-template.svg';
        }
      }
      setProfilePictures(pictures);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ImportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <button
        onClick={() => setIsImportModalOpen(true)}
        className="flex items-center focus:outline-none bg-white border-[3px] border-[#FFC862] text-[#323232] hover:bg-orange-50 focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <Import />
        <span>Import</span>
      </button>
    );
  };
  
  const handleDelete = async (id: string) => {
    const success = await userAPI.delete(id);
    if (success) {
      fetchData();
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'no',
        header: 'No',
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => {
          const userId = info.row.original.id;
          const profileImage = profilePictures[userId] || '/img/manage-user/profile-template.svg';

          return (
            <div className="flex items-center">
              <Image
                src={profileImage}
                width={40}
                height={40}
                alt="Profile"
                className="rounded-full mr-2 object-cover w-[40px] h-[40px]"
                onError={(e) => {
                  e.currentTarget.src = '/img/manage-user/profile-template.svg';
                }}
              />
              <span>{info.getValue() as string}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <SortingTable column={column} title="Email" />,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => <SortingTable column={column} title="No. Hp" />,
        cell: (info) => info.getValue(),
      },
      {
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const id = info.row.original.id;
          const rowData = info.row.original;
      
          return (
            <Popover
              content={
                <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => {
                      if (activeTab === 'Mentor') {
                        router.push(`/backoffice/manage-user/edit-mentor?id=${rowData.id}`);
                      } else if (activeTab === 'Student') {
                        router.push(`/backoffice/manage-user/edit-student?id=${rowData.id}`);
                      } else if (activeTab === 'School Operator') {
                        router.push(`/backoffice/manage-user/edit-school-operator?id=${rowData.id}`);
                      } else {
                        handleActionButtonRow(id, 'edit', rowData);
                      }
                    }}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              }
            >
              <button type="button">
                <MoreHoriz />
              </button>
            </Popover>
          );
        },
      },
    ],
    [handleActionButtonRow, profilePictures, activeTab, router]
  );

  const renderTabContent = (tabName: string) => (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(80vh-200px)]">
        <Spinner aria-label="Loading" size="xl" />
      </div>
      ) : (
        <div>
      <ResponseModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        onConfirm={() => setShowResultModal(false)}
        title={isSuccess ? "Success" : "Error"}
        message={modalMessage}
        confirmText="OK!"
      />
      <div className="flex justify-between items-center font-poppins mb-4">
        <SearchTable value={Filter} onChange={setFilter} />
        {tabName === 'Mentor' && (
        <Link href={'/backoffice/manage-user/add-mentor/'} >
        <AddButton
        onClick={() => ('')}
          text="Add Mentor"
        />
        </Link>
      )}
      {tabName === 'Student' && (
        <div className="flex space-x-2">
          <ImportButton onClick={() => setIsImportModalOpen(true)} />
          <Link href={'/backoffice/manage-user/add-student/'}>
            <AddButton
              onClick={() => ('')}
              text="Add Student"
            />
          </Link>
        </div>
      )}
      {tabName === 'School Operator' && (
        <Link href={'/backoffice/manage-user/add-school-operator/'} >
        <AddButton
        onClick={() => ('')}
          text="Add School Operator"
        />
        </Link>
      )}
      </div>
      <DataTable
        data={data}
        columns={columns}
        filter={{ Filter, setFilter }}
      />
      </div>
    )}
    </div>
  );

  const tabs: TabFlexProps['tabs'] = [
    {
      title: "Mentor",
      content: renderTabContent("Mentor"),
      active: activeTab === 'Mentor',
      disabled: isLoading && activeTab !== 'Mentor'
    },
    {
      title: "Student",
      content: renderTabContent("Student"),
      active: activeTab === 'Student',
      disabled: isLoading && activeTab !== 'Student'
    },
    {
      title: "School Operator",
      content: renderTabContent("School Operator"),
      active: activeTab === 'School Operator',
      disabled: isLoading && activeTab !== 'School Operator'
    }
  ];

  const handleTabChange: TabFlexProps['onTabChange'] = (tabTitle) => {
    if (!isLoading) {
      setActiveTab(tabTitle);
    }
  };

  return (
    <div className="p-4">
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
      <ImportModal
      isOpen={isImportModalOpen}
      onClose={() => setIsImportModalOpen(false)}
      onSubmit={(file) => {
        console.log('File submitted:', file);
        setIsImportModalOpen(false);
      }}
    />
    </div>
  );
};

export default UserView;
