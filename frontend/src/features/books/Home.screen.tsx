import Loading from '@/components/Commons/Loading';
import SnackbarAlert, {
  SnackbarAlertProps,
} from '@/components/Commons/SnackbarAlert';
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader';
import { Box } from '@mui/material';
import { useState } from 'react';
import Register from './components/Register';
import { FormValues } from './components/RegisterForm';
import useBooksService from './services/hooks/useBooksService';

const defaultAlertValue: SnackbarAlertProps = {
  message: '',
  open: false,
  severity: 'success',
};

const HomeScreen = () => {
  const [alert, setAlert] = useState<SnackbarAlertProps>(defaultAlertValue);

  const { createBook, loading } = useBooksService();

  const handleCreateBook = async (formValues: FormValues) => {
    try {
      const response = await createBook(formValues);

      handleAlert({
        message: `Livro ${response?.title} criado com sucesso`,
        severity: 'success',
      });
    } catch (err: Error | any) {
      handleAlert({ message: err?.message || '', severity: 'error' });
    }
  };

  const handleAlert = ({
    message,
    severity,
  }: Omit<SnackbarAlertProps, 'open'>) => {
    setAlert({ message, severity, open: true });
  };

  return (
    <>
      <LayoutWithHeader>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Register setAlert={setAlert} onCreateBook={handleCreateBook} />
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
