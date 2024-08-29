import React, { useEffect } from 'react';
import ListMentoringView from './ListMentoring.view';
import { IListMentoring } from './listMentoring.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMentoring,
  fetchOneMentoring,
} from '../form-mentoring/api/formMentoring.api';
import { useFormMentoringStore } from '../form-mentoring/formMentoring.store';

const ListMentoring: React.FC<IListMentoring> = (props) => {
  const queryClient = useQueryClient();
  const { idDefaultMentoring, setDefaultMentoring } = useFormMentoringStore();
  const { mutateAsync: deleteMentoringAsync } = useMutation({
    mutationKey: ['delete', 'mentoring'],
    mutationFn: deleteMentoring,
  });
  const { data: mentoringFindOne } = useQuery({
    queryKey: ['mentoring', idDefaultMentoring],
    queryFn: () => fetchOneMentoring(idDefaultMentoring),
    enabled: idDefaultMentoring !== null,
  });

  useEffect(() => {
    if (mentoringFindOne?.data?.data) {
      setDefaultMentoring(mentoringFindOne.data.data);
    }
  }, [mentoringFindOne?.data?.data]);

  const handleDeleteMentoring = async (mentoringId: string) => {
    const response = await deleteMentoringAsync(mentoringId);
    await queryClient.invalidateQueries({
      queryKey: ['mentoring', 'list', props.chapterId],
    });
  };
  return (
    <ListMentoringView
      {...props}
      handleDeleteMentoring={handleDeleteMentoring}
    />
  );
};

export default ListMentoring;
