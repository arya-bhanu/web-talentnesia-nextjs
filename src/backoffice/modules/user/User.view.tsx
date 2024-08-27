import React, { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IUserView, User, TabFlexProps } from './user.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { TabFlex } from './components/tabs/tabs';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { Mentor } from './mentor/AddMentor';
import { MentorFormData } from './mentor/addMentor.type';
import { userAPI } from './api/userApi';


const UserView: React.FC<IUserView> = ({
  Filter,
  setFilter,
  isPopupOpen,
  setIsPopupOpen,
  handleActionButtonRow,
}) => {
  const [activeTab, setActiveTab] = useState('Mentor');
  const [data, setData] = useState<User[]>([]);
  const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<User | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    let fetchedData: User[] = [];
    switch (activeTab) {
      case 'Mentor':
        fetchedData = await userAPI.fetchMentors();
        break;
      case 'Student':
        fetchedData = await userAPI.fetchStudents();
        break;
      case 'School Operator':
        fetchedData = await userAPI.fetchSchoolOperators();
        break;
    }
    setData(fetchedData);
  };

  const handleAddMentor = async (mentorData: MentorFormData) => {
    const newMentor = await userAPI.add({ ...mentorData, role: 3 });
    if (newMentor) {
      fetchData();
      setIsAddMentorOpen(false);
    }
  };

  const handleEditMentor = async (id: string, mentorData: MentorFormData) => {
    const updatedMentor = await userAPI.update(id, mentorData);
    if (updatedMentor) {
      fetchData();
      setEditingMentor(null);
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
        accessorKey: 'name',
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => info.getValue(),
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
                    onClick={() => handleActionButtonRow(id, 'edit', rowData)}
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
    [handleActionButtonRow]
  );

  const renderTabContent = (tabName: string) => (
    <div>
      <div className="flex justify-between items-center font-poppins mb-4">
        <SearchTable value={Filter} onChange={setFilter} />
        {tabName === 'Mentor' && (
        <AddButton
          onClick={() => setIsAddMentorOpen(true)}
          text="Add Mentor"
        />
      )}
        <AddButton
          onClick={() => setIsPopupOpen(true)}
          text={`Add ${tabName}`}
        />
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'name', desc: false }]}
        filter={{ Filter, setFilter }}
      />
    </div>
  );

  const tabs: TabFlexProps['tabs'] = [
    {
      title: "Mentor",
      content: renderTabContent("Mentor"),
      active: activeTab === 'Mentor'
    },
    {
      title: "Student",
      content: renderTabContent("Student"),
      active: activeTab === 'Student'
    },
    {
      title: "School Operator",
      content: renderTabContent("School Operator"),
      active: activeTab === 'School Operator'
    }
  ];
  const handleTabChange: TabFlexProps['onTabChange'] = (tabTitle) => {
    setActiveTab(tabTitle);
  };


  return (
    <div className="p-4">
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
};

export default UserView;