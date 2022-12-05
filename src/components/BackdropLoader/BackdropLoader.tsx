import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Loader } from 'components';

export const BackdropLoader: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Backdrop sx={{ zIndex: 3, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} open={open}>
      <Loader />
    </Backdrop>
  );
};
