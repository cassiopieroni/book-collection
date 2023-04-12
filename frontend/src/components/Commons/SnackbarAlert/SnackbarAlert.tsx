import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type SnackbarAlertProps = {
  message: string;
  severity: AlertProps['severity'];
  open: boolean;
};

type Props = {
  snackbarAlertProps: SnackbarAlertProps;
  onClose?: () => void;
};

export default function SnackbarAlert({ snackbarAlertProps, onClose }: Props) {
  const { message, severity, open } = snackbarAlertProps;

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose?.();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Stack>
  );
}
