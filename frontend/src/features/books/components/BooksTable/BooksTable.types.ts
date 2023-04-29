import { Book } from "../../types/book.type";

export type BookRow = {
  id: Book["id"];
  title: Book['title'];
  author: Book['author'];
};
