import { SnackbarAlertProps } from '@/components/Commons/SnackbarAlert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import RegisterForm, { FormValues } from '../RegisterForm';
import { boxFormStyle } from './Register.styles';

type Props = {
  setAlert: (props: SnackbarAlertProps) => void;
  onCreateBook: (formValues: FormValues) => Promise<void>;
};

const Register = ({ setAlert, onCreateBook }: Props) => {
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
            setAlert={setAlert}
            requiredValues
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;
