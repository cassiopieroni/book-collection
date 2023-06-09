import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

import SnackbarAlertProvider from '@/providers/SnackbarAlertProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SnackbarAlertProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </SnackbarAlertProvider>
    </>
  );
}
