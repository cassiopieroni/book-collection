import React, { useState, useEffect, useContext } from 'react';

import useBooksService from '../../services/hooks/useBooksService';

import { DetailedBook } from '../../types/detailedBook.type';

import {
  Skeleton,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Modal
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { SnackbarAlertContext } from '@/providers/SnackbarAlertProvider';
import RegisterForm, { FormValues } from '../RegisterForm';

type RowProps = {
  bookId: number;
};

const DetailedBookTable: React.FC<RowProps> = ({ bookId }) => {
  const { errorAlert, successAlert } = useContext(SnackbarAlertContext);

  const { getBook, editBook, loading } = useBooksService();

  const [book, setBook] = useState<DetailedBook | null>(null);

  const getBookService = async () => {
    try {
      const detailedBook = await getBook(bookId);
      setBook(detailedBook);
    } catch (err: Error | any) {
      errorAlert('Não foi possível buscar sua lista de livros');
    }
  };

  useEffect(() => {
    getBookService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleEditBook = async (editedBook: FormValues) => {
    try {
      await editBook(editedBook);
      setIsOpenEditModal(false);
      await getBookService();
      successAlert('Livro editado com sucesso')
    } catch (err: Error | any) {
      errorAlert(err.message || 'Algo deu errado =/');
    }
  }

  const renderLoadingCells = (quantity: number = 3) => {
    return Array(quantity)
      .fill(null)
      .map((_, i) => (
        <TableCell key={i} component="th" scope="row">
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
        </TableCell>
      ));
  };

  const canEditBook = !loading && book;

  return (
    <Box my={1}>
      <Box display="flex" alignItems="center" justifyContent="center" style={{ position: "relative" }}>
        <Typography variant="h6" gutterBottom component="div">
          Detalhes do livro
        </Typography>
        <IconButton
          disabled={!canEditBook}
          size='small'
          aria-label="editar"
          onClick={() => setIsOpenEditModal(true)}
          style={{ position: "absolute", right: 0 }}
        >
          <EditIcon />
        </IconButton>
        {canEditBook && (
          <RegisterForm
            onSubmit={handleEditBook}
            requiredValues
            initialFormValues={book}
            buttonText="Editar"
            isOpen={isOpenEditModal}
            onClose={() => setIsOpenEditModal(false)}
          />
        )}
      </Box>

      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Editora</TableCell>
            <TableCell>Total de páginas</TableCell>
            <TableCell align="right">Finalizado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            {loading ?
              renderLoadingCells()
              : (
                <>
                  <TableCell component="th" scope="row">
                    {book?.bookPublisher}
                  </TableCell>

                  <TableCell>{book?.totalPages}</TableCell>

                  <TableCell align="right">
                    {book?.isFinishedReading ? 'sim' : 'não'}
                  </TableCell>
                </>
              )}
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default DetailedBookTable;
