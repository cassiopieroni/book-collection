import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { FormValues } from './RegisterForm.types';
import { SnackbarAlertProps } from '@/components/Commons/SnackbarAlert';

type Props = {
  onSubmit: (form: FormValues) => void;
  requiredValues?: boolean;
  buttonText?: string;
  initialFormValues?: FormValues;
  setAlert: (props: SnackbarAlertProps) => void;
};

const defaultFormValues: FormValues = {
  title: '',
  bookPublisher: '',
  author: '',
  isFinishedReading: false,
  totalPages: 0,
};

export default function RegisterForm({
  onSubmit,
  requiredValues = false,
  buttonText = 'cadastrar',
  initialFormValues = defaultFormValues,
  setAlert,
}: Props) {
  const [form, setForm] = React.useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidValues()) {
      return;
    }

    onSubmit({ ...form, totalPages: Number(form.totalPages) });
  };

  const isValidValues = (): boolean => {
    const { title, bookPublisher, author, totalPages } = form;

    if (
      (requiredValues && !title) ||
      !bookPublisher ||
      !author ||
      !totalPages
    ) {
      handleErrorAlert('Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    if (totalPages <= 0) {
      handleErrorAlert('O total de páginas deve ser maior que zero');
      return false;
    }

    return true;
  };

  const handleErrorAlert = (message: string) =>
    setAlert({
      message,
      severity: 'error',
      open: true,
    });

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        '& .MuiTextField-root': { my: 1 },
      }}
      noValidate
      autoComplete="off"
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required={requiredValues}
          label="Nome do livro"
          placeholder="1984"
          variant="standard"
          size="small"
          fullWidth
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          required={requiredValues}
          label="Autor"
          placeholder="George Orwell"
          variant="standard"
          size="small"
          fullWidth
          name="author"
          value={form.author}
          onChange={handleChange}
        />
        <TextField
          required={requiredValues}
          label="Editora"
          placeholder="Companhia das letras"
          variant="standard"
          size="small"
          fullWidth
          name="bookPublisher"
          value={form.bookPublisher}
          onChange={handleChange}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <TextField
            required={requiredValues}
            label="Total de páginas"
            placeholder="416"
            variant="standard"
            type="number"
            size="small"
            name="totalPages"
            value={form.totalPages}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isFinishedReading"
                value={form.isFinishedReading}
                onChange={handleChange}
              />
            }
            label="Leitura finalizada"
          />
        </Box>
      </div>
      <Box my={2} width={'100%'}>
        <Button variant="contained" fullWidth type="submit">
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}
