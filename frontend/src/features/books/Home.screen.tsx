import Loading from '@/components/Commons/Loading';
import SnackbarAlert, {
  SnackbarAlertProps,
} from '@/components/Commons/SnackbarAlert';
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader';
import { Box } from '@mui/material';
import { useState } from 'react';
import Register from './components/Register';

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
