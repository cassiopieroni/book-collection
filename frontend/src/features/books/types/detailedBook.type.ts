import { Book } from "./book.type";

export type DetailedBook = {
  bookPublisher: string;
  totalPages: number;
  isFinishedReading: boolean;
} & Book;