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
import { userAPI } from './api/userApi';
import { mentorAPI } from './mentor/api/mentorApi';
import { schoolOperatorAPI } from './school-operator/api/schoolOperatorApi';
import { studentAPI } from './student/api/studentApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ResponseModal } from './components/response-modal/responseModal';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

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
      
      // Load profile pictures
      const pictures: Record<string, string> = {};
      for (const user of fetchedData) {
        if (user.photoProfile) {
          try {
            const thumbPath = user.photoProfile.replace('/origins/', '/thumbs/');
            const blob = await userAPI.getFile(thumbPath);
            if (blob) {
              pictures[user.id] = URL.createObjectURL(blob);
            }
          } catch (error) {
            console.error('Error loading profile picture:', error);
          }
        }
      }
      setProfilePictures(pictures);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
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
                      }
                       else {
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
    [handleActionButtonRow, profilePictures]
  );

  const renderTabContent = (tabName: string) => (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
        <Link href={'/backoffice/manage-user/add-student/'} >
        <AddButton
        onClick={() => ('')}
          text="Add Student"
        />
        </Link>
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
        sorting={[{ id: 'name', desc: false }]}
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
    </div>
  );
};

export default UserView;
