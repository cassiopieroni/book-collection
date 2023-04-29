import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';

import { AuthorService } from './author.service';
import { BookService } from './book.service';
import { BookPublisherService } from './bookPublisher.service';

@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly bookPublisherService: BookPublisherService,
  ) {}

  @Get()
  async getAllBooks() {
    const books = await this.bookService.books();
    const booksResponse = books.map(async ({ id, title, authorId }) => ({
      id,
      title,
      author: (await this.getAuthor(authorId)).name,
    }));
    return Promise.all(booksResponse);
  }

  @Get(':bookId')
  async getBookById(@Param('bookId') bookId: string) {
    const {
      id,
      title,
      authorId,
      bookPublisherId,
      totalPages,
      isFinishedReading,
    } = await this.bookService.book({ id: Number(bookId) });

    const { name: authorName } = await this.authorService.author({
      id: Number(authorId),
    });

    const { name: publisherName } =
      await this.bookPublisherService.bookPublisher({
        id: Number(bookPublisherId),
      });

    return {
      id,
      title,
      isFinishedReading,
      totalPages,
      author: authorName,
      bookPublisher: publisherName,
    };
  }

  async getAuthor(id: number) {
    return this.authorService.author({ id });
  }

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    const { title, bookPublisher, author, totalPages, isFinishedReading } =
      body;

    return await this.bookService.createBook({
      title,
      totalPages,
      isFinishedReading,
      author: {
        connectOrCreate: { where: { name: author }, create: { name: author } },
      },
      bookPublisher: {
        connectOrCreate: {
          where: { name: bookPublisher },
          create: { name: bookPublisher },
        },
      },
    });
  }
}
