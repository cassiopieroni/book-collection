import Loading from '@/components/Commons/Loading';
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader';
import { SnackbarAlertContext } from '@/providers/SnackbarAlertProvider';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import BooksTable from './components/BooksTable';
import Register from './components/Register';
import { FormValues } from './components/RegisterForm';
import useBooksService from './services/hooks/useBooksService';
import { Book } from './types/book.type';

const BooksScreen = () => {
  const { errorAlert, successAlert } = useContext(SnackbarAlertContext);

  const { createBook, getAllBooks, deleteBook, loading } = useBooksService();

  const handleCreateBook = async (formValues: FormValues) => {
    try {
      await createBook(formValues);
      successAlert(`Livro adicionado com sucesso`);

      await handleGetAllBooks();
    } catch (err: Error | any) {
      errorAlert(err?.message || 'Algo deu errado =/');
    }
  };

  const [books, setBooks] = useState<Book[]>();

  const handleGetAllBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response);
    } catch (err: Error | any) {
      errorAlert('Não foi possível buscar sua lista de livros');
    }
  };

  useEffect(() => {
    handleGetAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteook = async (bookId: Book["id"]) => {
    try {
      await deleteBook(bookId);
      successAlert(`Livro deletado com sucesso`);

      await handleGetAllBooks();
    } catch (err: Error | any) {
      errorAlert(err?.message || 'Algo deu errado =/');
    }
  };

  return (
    <>
      <LayoutWithHeader>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Register onCreateBook={handleCreateBook} />
        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <BooksTable books={books} onDeleteBook={handleDeleteook} />
        </Box>
      </LayoutWithHeader>

      <Loading isLoading={loading} />
    </>
  );
};

export default BooksScreen;
