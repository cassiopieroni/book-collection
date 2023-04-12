import { useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import Header from '@/components/Layout/Header';
import Register from '@/components/Register';
import SnackbarAlert, {
  SnackbarAlertProps,
} from '@/components/Commons/SnackbarAlert';
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader';
import Loading from '@/components/Commons/Loading';

const defaultAlertValue: SnackbarAlertProps = {
  message: '',
  open: false,
  severity: 'success',
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlertProps>(defaultAlertValue);

  return (
    <>
      <LayoutWithHeader>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Register setLoading={setLoading} setAlert={setAlert} />
        </Box>
      </LayoutWithHeader>

      <Loading isLoading={loading} />

      <SnackbarAlert
        onClose={() => setAlert(defaultAlertValue)}
        snackbarAlertProps={alert}
      />
    </>
  );
};

export default HomeScreen;
