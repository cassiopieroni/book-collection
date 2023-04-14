import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { boxFormStyle } from './Register.styles';
import useBooksService from '@/features/books/services/hooks/useBooksService';
import { SnackbarAlertProps } from '@/components/Commons/SnackbarAlert';
import RegisterForm, { FormValues } from '../RegisterForm';

type Props = {
  setLoading: (open: boolean) => void;
  setAlert: (props: SnackbarAlertProps) => void;
};

const Register = ({ setLoading, setAlert }: Props) => {
  const { createBook, loading } = useBooksService();

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const handleCreateBook = async (formValues: FormValues) => {
    try {
      const response = await createBook(formValues);

      handleAlert({
        message: `Livro ${response?.title} criado com sucesso`,
        severity: 'success',
      });

      handleCloseFormModal();
    } catch (err: Error | any) {
      handleAlert({ message: err?.message || '', severity: 'error' });
    }
  };

  const [openFormModal, setOpenFormModal] = useState(false);
  const handleOpenFormModal = () => setOpenFormModal(true);
  const handleCloseFormModal = () => setOpenFormModal(false);

  const handleAlert = ({
    message,
    severity,
  }: Omit<SnackbarAlertProps, 'open'>) => {
    setAlert({ message, severity, open: true });
  };

  return (
    <Box py={4} px={2}>
      <Button onClick={handleOpenFormModal} variant="contained">
        Cadastrar um livro
      </Button>

      <Modal open={openFormModal} onClose={handleCloseFormModal}>
        <Box sx={boxFormStyle}>
          <RegisterForm
            onSubmit={handleCreateBook}
            setAlert={setAlert}
            requiredValues
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;
