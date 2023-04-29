import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async book(
    bookWhereUniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: bookWhereUniqueInput,
    });
  }

  async books(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { data, where } = params;
    return this.prisma.book.update({
      data,
      where,
    });
  }

  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.prisma.book.delete({
      where,
    });
  }
}
