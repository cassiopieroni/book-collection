import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import RegisterForm, { FormValues } from '../RegisterForm';
import { boxFormStyle } from './Register.styles';

type Props = {
  onCreateBook: (formValues: FormValues) => Promise<void>;
};

const Register = ({ onCreateBook }: Props) => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const handleOpenFormModal = () => setOpenFormModal(true);
  const handleCloseFormModal = () => setOpenFormModal(false);

  const handleCreateBook = async (formValues: FormValues) => {
    await onCreateBook(formValues);
    handleCloseFormModal();
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
            requiredValues
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;
