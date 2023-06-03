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
import DeleteIcon from '@mui/icons-material/Delete';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DetailedBookTable from '../DetailedBookTable';

type RowProps = {
  row: BookRow;
  onDeleteBook: (id: number) => void;
};

const Row: React.FC<RowProps> = ({ row, onDeleteBook }) => {
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

        <TableCell align="right">
          <IconButton size='small' aria-label="deletar" onClick={() => onDeleteBook(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
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
  onDeleteBook: (id: number) => void;
};

const BooksTable: React.FC<BooksTableProps> = ({ books, onDeleteBook }) => {
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
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((row) => (
            <Row key={row.id} row={row} onDeleteBook={onDeleteBook} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BooksTable;
