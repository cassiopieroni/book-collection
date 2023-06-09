import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';

import { AuthorService } from './author.service';
import { BookService } from './book.service';
import { BookPublisherService } from './bookPublisher.service';
import { EditBookDto } from './dtos/edit-book.dto';

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

  async getBookPublisher(id: number) {
    return this.bookPublisherService.bookPublisher({ id });
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

  @Put(':bookId')
  async editBook(@Param('bookId') bookId: string, @Body() body: EditBookDto) {
    const { title, bookPublisher, author, totalPages, isFinishedReading } =
      body;

    return await this.bookService.updateBook({
      where: { id: Number(bookId) },
      data: {
        title,
        totalPages,
        isFinishedReading,
        author: {
          connectOrCreate: {
            where: { name: author },
            create: { name: author },
          },
        },
        bookPublisher: {
          connectOrCreate: {
            where: { name: bookPublisher },
            create: { name: bookPublisher },
          },
        },
      },
    });
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return await this.bookService.deleteBook({ id: Number(bookId) });
  }
}
