import SnackbarAlert, { SnackbarAlertProps } from '@/components/Commons/SnackbarAlert';
import { PropsWithChildren, createContext, useState } from 'react';

type SnackbarAlertContextProps = {
  successAlert: (message: string) => void;
  errorAlert: (message: string) => void;
}

const defaultAlertValue: SnackbarAlertProps = {
  message: '',
  open: false,
  severity: 'success',
};

const SnackbarAlertContext = createContext<SnackbarAlertContextProps>({
  successAlert: () => { },
  errorAlert: () => { }
});

function SnackbarAlertProvider({ children }: PropsWithChildren) {
  const [alert, setAlert] = useState<SnackbarAlertProps>(defaultAlertValue);

  const successAlert = (message: string) =>
    setAlert({ message, severity: 'success', open: true });

  const errorAlert = (message: string) =>
    setAlert({ message, severity: 'error', open: true });

  return (
    <SnackbarAlertContext.Provider value={{ successAlert, errorAlert }}>
      {children}
      <SnackbarAlert
        onClose={() => setAlert(defaultAlertValue)}
        snackbarAlertProps={alert}
      />
    </SnackbarAlertContext.Provider>
  );
}

export default SnackbarAlertProvider;
export { SnackbarAlertContext };
export type { SnackbarAlertContextProps };
