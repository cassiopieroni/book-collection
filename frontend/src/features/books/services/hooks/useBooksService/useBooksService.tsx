import { Book } from '@/features/books/types/book.type';
import { DetailedBook } from '@/features/books/types/detailedBook.type';
import { useState } from 'react';

const URL_BASE = 'http://localhost:3000/books';

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

  const getAllBooks = async (): Promise<Book[]> => {
    try {
      setLoading(true);

      const response = await fetch(URL_BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      return await response.json();
    } catch (error: Error | any) {
      throw new Error(error?.message || 'Algo deu errado!');
    } finally {
      setLoading(false);
    }
  };

  const getBook = async (id: Book['id']): Promise<DetailedBook> => {
    try {
      setLoading(true);

      const url = `${URL_BASE}/${id}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      return await response.json();
    } catch (error: Error | any) {
      throw new Error(error?.message || 'Algo deu errado!');
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: Book['id']): Promise<Book> => {
    try {
      setLoading(true);

      const url = `${URL_BASE}/${id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      return await response.json();
    } catch (error: Error | any) {
      throw new Error(error?.message || 'Algo deu errado!');
    } finally {
      setLoading(false);
    }
  };

  return {
    createBook,
    getAllBooks,
    getBook,
    deleteBook,
    loading,
  };
};

export default useBooksService;
