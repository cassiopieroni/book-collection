import { useState } from 'react';

import { BookRow } from './BooksTable.types';
import { Book } from '../../types/book.type';

import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DetailedBookTable from '../DetailedBookTable';

type RowProps = {
  row: BookRow;
};

const Row: React.FC<RowProps> = ({ row }) => {
  const [openDetailedBook, setOpenDetailedBook] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenDetailedBook(isOpen => !isOpen)}
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
            {openDetailedBook && <DetailedBookTable bookId={row.id} />}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

type BooksTableProps = {
  books?: Book[];
};

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
  if (!books || !books.length) {
    return (
      <Typography>Você ainda nâo possui nenhum livro cadastrado =/</Typography>
    );
  }

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
          {books.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BooksTable;
