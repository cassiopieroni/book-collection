import Loading from '@/components/Commons/Loading';
import SnackbarAlert, {
  SnackbarAlertProps,
} from '@/components/Commons/SnackbarAlert';
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import BooksTable from './components/BooksTable';
import Register from './components/Register';
import { FormValues } from './components/RegisterForm';
import useBooksService from './services/hooks/useBooksService';
import { Book } from './types/book.type';

const defaultAlertValue: SnackbarAlertProps = {
  message: '',
  open: false,
  severity: 'success',
};

const BooksScreen = () => {
  const [alert, setAlert] = useState<SnackbarAlertProps>(defaultAlertValue);

  const setSuccessAlert = (message: string) =>
    setAlert({ message, severity: 'success', open: true });

  const setErrorAlert = (message: string) =>
    setAlert({ message, severity: 'error', open: true });

  const { createBook, getAllBooks, loading } = useBooksService();

  const handleCreateBook = async (formValues: FormValues) => {
    try {
      const response = await createBook(formValues);
      setSuccessAlert(`Livro ${response?.title} criado com sucesso`);

      await handleGetAllBooks();
    } catch (err: Error | any) {
      setErrorAlert(err?.message || '');
    }
  };

  const [books, setBooks] = useState<Book[]>();

  const handleGetAllBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response);
    } catch (err: Error | any) {
      setErrorAlert('Não foi possível buscar sua lista de livros');
    }
  };

  useEffect(() => {
    handleGetAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LayoutWithHeader>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Register setAlert={setAlert} onCreateBook={handleCreateBook} />
        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <BooksTable books={books} />
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

export default BooksScreen;
