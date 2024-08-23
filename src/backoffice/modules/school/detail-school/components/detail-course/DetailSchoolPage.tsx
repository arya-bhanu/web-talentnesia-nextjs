import React from 'react';
import AddSchoolView from './DetailSchoolPage.view';

const DetailSchoolPage: React.FC = () => {
  const getFakeData = () => {
    return {
      img:'/logo.png',
      schoolName: 'SMK Negeri 6 Malang',
      pic: 'John Doe',
      email: 'john.doe@smkn6malang.sch.id',
      phone: '08123456789',
      address: 'Jl. Merdeka No.1, Malang',
    };
  };

  const fakeData = getFakeData();

  return <AddSchoolView fakeData={fakeData} />;
}

export default DetailSchoolPage;
