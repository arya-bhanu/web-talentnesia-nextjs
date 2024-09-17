import React, { useState } from 'react';
import FormCertificateView from './FormCertificate.view';
import axios from 'axios';

const FormGenerate = () => {
  const [certificateData, setCertificateData] = useState(null);

  const generateCertificate = async (certificateNumber: string) => {
    try {
      const response = await axios.post('https://api-talentnesia.skwn.dev/api/v1/generateCertificate', {
        certificateNumber
      });
      setCertificateData(response.data);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return <FormCertificateView generateCertificate={generateCertificate} certificateData={certificateData} />;
};

export default FormGenerate;