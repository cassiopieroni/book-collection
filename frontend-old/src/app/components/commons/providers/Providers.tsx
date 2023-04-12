import React, { PropsWithChildren } from 'react';
import { CssBaseline } from '@mui/material';

const Providers = ({ children }: PropsWithChildren) => (
  <>
    <CssBaseline />
    {children}
  </>
);

export default Providers;
