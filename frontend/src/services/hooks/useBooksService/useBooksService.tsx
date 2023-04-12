import { Book } from '@/types/book.type';
import { useState } from 'react';

const URL_BASE = 'http://localhost:3000/books/';

const useBooksService = () => {
  const [loading, setLoading] = useState(false);

  const createBook = async (book: Book): Promise<Book> => {
    try {
      setLoading(true);

      const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const { data }: { data: Book } = await response.json();
      return data;
    } catch (error: Error | any) {
      throw new Error(error?.message || 'Algo deu errado!');
    } finally {
      setLoading(false);
    }
  };

  return {
    createBook,
    loading,
  };
};

export default useBooksService;
