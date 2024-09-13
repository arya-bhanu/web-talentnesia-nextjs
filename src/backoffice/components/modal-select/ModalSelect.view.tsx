'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React, { FormEvent, useRef, useMemo, useState, useEffect } from 'react';
import { IModalSelect } from './modalSelect.type';
import { Checkbox } from 'flowbite-react';
import { useTableStudentStore } from '../../modules/manage-program/form-program/components/table-students/tableStudents.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudentJoin } from '@/backoffice/modules/manage-program/form-program/components/table-students/api/tableStudents.api';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/backoffice/components/data-table';
import { SearchTable } from '@/backoffice/components/search-table';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import SortingTable from '../sorting-table/SortingTable';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '../alert-modal';
import { Modal as FlowbiteModal } from 'flowbite-react';

const columnHelper = createColumnHelper<any>();

const ModalSelectView: React.FC<IModalSelect> = ({ open, setOpen, title }) => {
  const formRef = useRef(null);
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const { dataSchoolStudents } = useTableStudentStore();
  const [filter, setFilter] = useState('');
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement> | null>(
    null,
  );
  const { openModal: openModalToast } = useStatusModalStore();
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);

  const { mutateAsync: createJoinStudentAsync } = useMutation({
    mutationFn: createStudentJoin,
    mutationKey: ['student', 'join'],
  });

  useEffect(() => {
    if (isConfirmed && formEvent) {
      handleFormSubmit(formEvent);
      setIsConfirmed(false);
      setFormEvent(null);
    }
  }, [isConfirmed, formEvent]);

  const handleSubmitClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      console.error('Invalid form event');
      return;
    }

    const checkedValues = Array.from(
      e.target.querySelectorAll('input[type="checkbox"]:checked'),
    );

    if (checkedValues.length === 0) {
      setShowNoSelectionModal(true);
    } else {
      setFormEvent(e);
      setOpenAlertModal(true);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) {
      console.error('Invalid form event');
      return;
    }

    const form = e.target;
    const checkedValues = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((checkbox) => {
      return (checkbox as HTMLInputElement).id;
    });

    const programId = params.get('programId');
    if (programId && checkedValues) {
      try {
        const response = await createJoinStudentAsync({
          users: checkedValues,
          programId,
        });
        await queryClient.invalidateQueries({
          queryKey: ['students', programId],
        });
        setOpen(false);
        console.log(response);
        openModalToast({
          status: 'success',
          action: 'create',
          message: 'Students joined successfully',
        });
      } catch (error) {
        console.error('Error joining students:', error);
        openModalToast({
          status: 'error',
          action: 'create',
          message: 'Failed to join students. Please try again.',
        });
      }
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('no', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: ({ column }) => <SortingTable column={column} title="Email" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        header: ({ column }) => <SortingTable column={column} title="No. Hp" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('userId', {
        header: 'Action',
        cell: (info) => (
          <Checkbox
            value={info.getValue() as string}
            id={info.getValue() as string}
            name="student"
          />
        ),
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    return (
      dataSchoolStudents?.map((el, index) => ({
        no: index + 1,
        name: el.name,
        email: el.email,
        phone: el.phone,
        userId: el.userId,
      })) || []
    );
  }, [dataSchoolStudents]);

  return (
    <>
      <FlowbiteModal
        show={showNoSelectionModal}
        size="xl"
        onClose={() => setShowNoSelectionModal(false)}
      >
        <FlowbiteModal.Header>No Students Selected</FlowbiteModal.Header>
        <FlowbiteModal.Body>
          <p className='items-center justify-center flex'>Please select at least one student before submitting.</p>
        </FlowbiteModal.Body>
        <FlowbiteModal.Footer>
          <Button onClick={() => setShowNoSelectionModal(false)}>Close</Button>
        </FlowbiteModal.Footer>
      </FlowbiteModal>
      <Modal show={open} onClose={() => setOpen(false)} size={'4xl'}>
        <form ref={formRef} onSubmit={handleSubmitClick}>
          <Modal.Header className="border-none pb-0">
            <span className="text-lg font-semibold">{title}</span>
          </Modal.Header>
          <Modal.Body>
            <div className="relative overflow-x-auto border sm:rounded-lg md:rounded-xl p-6">
              <div className="flex justify-end mb-4">
                <SearchTable value={filter} onChange={setFilter} />
              </div>
              <div className="relative">
                <DataTable
                  data={data}
                  columns={columns}
                  sorting={[]}
                  filter={{ Filter: filter, setFilter: setFilter }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="w-full justify-end border-none pt-0">
            <Button
              onClick={() => setOpen(false)}
              type="button"
              outline
              className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color={'warning'}
              className="bg-[#FFC862] text-black"
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to add these students to the program?"
      />
    </>
  );
};

export default ModalSelectView;
