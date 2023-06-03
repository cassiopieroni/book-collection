import { Box, Button } from '@mui/material';
import { useState } from 'react';
import RegisterForm, { FormValues } from '../RegisterForm';

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

      <RegisterForm
        onSubmit={handleCreateBook}
        requiredValues
        isOpen={openFormModal}
        onClose={handleCloseFormModal}
      />
    </Box>
  );
};

export default Register;
