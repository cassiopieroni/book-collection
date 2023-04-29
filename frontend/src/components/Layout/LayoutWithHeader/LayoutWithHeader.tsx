import Header from '@/components/Layout/Header';
import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

const LayoutWithHeader = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ height: '100vh' }}>
      <Box display="flex" flexDirection="column" height="100%">
        <Header />

        <Box mx={4} mt={4} paddingBottom={4} flexGrow={1}>
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default LayoutWithHeader;
