import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useBooksService from '../../services/hooks/useBooksService';
import { Book } from '../../types/book.type';
import { DetailedBook } from '../../types/detailedBook.type';
import { BookRow } from './BooksTable.types';

type RowProps = {
  row: BookRow;
};

const Row: React.FC<RowProps> = ({ row }) => {
  const { getBook, loading } = useBooksService();

  const [openDetailedBook, setOpenDetailedBook] = React.useState(false);
  const [book, setBook] = React.useState<DetailedBook | null>(null);

  const handleClick = async () => {
    if (openDetailedBook) {
      return setOpenDetailedBook(false);
    }
    try {
      setOpenDetailedBook(true);
      const detailedBook = await getBook(row.id);
      setBook(detailedBook);
    } catch (err: Error | any) {
      alert('Não foi possível buscar sua lista de livros');
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
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {openDetailedBook ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>

        <TableCell align="right">{row.author}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openDetailedBook} timeout="auto" unmountOnExit>
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
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

type Props = {
  books?: Book[];
};

const BooksTable: React.FC<Props> = ({ books }) => {
  if (!books || !books.length) {
    return (
      <Typography>Você ainda nâo possui nenhum livro cadastrado =/</Typography>
    );
  }

  const createRows = (books: Book[]): BookRow[] => {
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
    }));
  };

  const rows = createRows(books);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="tabela de livros">
        <TableHead>
          <TableRow>
            <TableCell />

            <TableCell>Livro</TableCell>

            <TableCell align="right">Autor</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BooksTable;
