import { Book } from '@/features/books/types/book.type';
import { DetailedBook } from '@/features/books/types/detailedBook.type';
import { useState } from 'react';
import { ApiProps, api as bookApi } from '../../api';

const useBooksService = () => {
  const [loading, setLoading] = useState(false);

  const createBook = async (book: Book): Promise<Book> => {
    const { data }: { data: Book } = await handleBookServiceRequest({ method: 'POST', body: book });
    return data;
  };

  const getAllBooks = async (): Promise<Book[]> => {
    return await handleBookServiceRequest()
  };

  const getBook = async (id: Book['id']): Promise<DetailedBook> => {
    return handleBookServiceRequest({ route: id })
  };

  const deleteBook = async (id: Book['id']): Promise<Book> => {
    return await handleBookServiceRequest({ route: id, method: "DELETE" })
  };

  const editBook = async (book: Book): Promise<DetailedBook> => {
    return await handleBookServiceRequest({ route: book.id, body: book, method: "PUT" });
  };

  async function handleBookServiceRequest<T>(apiProps?: ApiProps<T>) {
    try {
      setLoading(true);
      const response = await bookApi(apiProps);

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      return await response.json()
    } catch (error: Error | any) {
      throw new Error(error?.message || 'Algo deu errado =/');
    } finally {
      setLoading(false);
    }
  }

  return {
    createBook,
    editBook,
    getAllBooks,
    getBook,
    deleteBook,
    loading,
  };
};

export default useBooksService;
