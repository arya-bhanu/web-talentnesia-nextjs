import React from 'react';
import { programsData } from '../program.data';

interface ProgramDetailProps {
  params: {
    id: string;
  };
}

export default function ProgramDetail({ params }: ProgramDetailProps) {
  const { id } = params;
  const programDetails = programsData.find(program => program.id === id);

  if (!programDetails) {
    return <div>Program not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detail Program: {programDetails.title}</h1>
      <h2 className="text-xl font-semibold">{programDetails.title}</h2>
      <p className="text-lg">{programDetails.periode}</p>
      <p className="mt-2 text-gray-600">{programDetails.description}</p>
      <p className="mt-4">Status: <strong>{programDetails.status}</strong></p>
      <p>Total Participants: <strong>{programDetails.totalParticipants}</strong></p>
    </div>
  );
}
