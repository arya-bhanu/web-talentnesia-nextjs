import React from 'react';
import ListMentoringView from './ListMentoring.view';
import { IListMentoring } from './listMentoring.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMentoring } from '../form-mentoring/api/formMentoring.api';

const ListMentoring: React.FC<IListMentoring> = (props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMentoringAsync } = useMutation({
    mutationKey: ['delete', 'mentoring'],
    mutationFn: deleteMentoring,
  });
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
