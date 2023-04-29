import React, { useState, useEffect, useContext } from 'react';

import useBooksService from '../../services/hooks/useBooksService';

import { DetailedBook } from '../../types/detailedBook.type';

import {
  Skeleton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import { SnackbarAlertContext } from '@/providers/SnackbarAlertProvider';

type RowProps = {
  bookId: number;
};

const DetailedBookTable: React.FC<RowProps> = ({ bookId }) => {
  const { errorAlert } = useContext(SnackbarAlertContext);

  useEffect(() => {
    getBookService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { getBook, loading } = useBooksService();

  const [book, setBook] = useState<DetailedBook | null>(null);

  const getBookService = async () => {
    try {
      const detailedBook = await getBook(bookId);
      setBook(detailedBook);
    } catch (err: Error | any) {
      errorAlert('Não foi possível buscar sua lista de livros');
    }
  };

  const renderLoadingCells = (quantity: number = 3) => {
    return Array(quantity)
      .fill(null)
      .map((_, i) => (
        <TableCell key={i} component="th" scope="row">
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
        </TableCell>
      ));
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Detalhes do livro
      </Typography>

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
