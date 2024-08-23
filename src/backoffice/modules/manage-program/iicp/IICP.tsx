import React, { useState } from 'react';
import IICPView from './IICP.view';

const IICP = () => {
  const [popoverIndex, setPopoverIndex] = useState(0);
  return (
    <IICPView popoverIndex={popoverIndex} setPopoverIndex={setPopoverIndex} />
  );
};

export default IICP;
