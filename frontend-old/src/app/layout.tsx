import Head from 'next/head';
import Providers from './components/commons/providers';

export const metadata = {
  title: 'Coleção de livros',
  description: 'Minha coleção de livros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <Providers></Providers>

        {children}
      </body>
    </html>
  );
}
