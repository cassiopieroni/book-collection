import { Injectable } from '@nestjs/common';
import { BookPublisher, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BookPublisherService {
  constructor(private prisma: PrismaService) {}

  async bookPublisher(
    bookPublisherWhereUniqueInput: Prisma.BookPublisherWhereUniqueInput,
  ): Promise<BookPublisher | null> {
    return this.prisma.bookPublisher.findUnique({
      where: bookPublisherWhereUniqueInput,
    });
  }

  async createBookPublisher(
    data: Prisma.BookPublisherCreateInput,
  ): Promise<BookPublisher> {
    return this.prisma.bookPublisher.create({
      data,
    });
  }

  async updateBookPublisher(params: {
    where: Prisma.BookPublisherWhereUniqueInput;
    data: Prisma.BookPublisherUpdateInput;
  }): Promise<BookPublisher> {
    const { where, data } = params;
    return this.prisma.bookPublisher.update({
      data,
      where,
    });
  }

  async deleteBookPublisher(
    where: Prisma.BookPublisherWhereUniqueInput,
  ): Promise<BookPublisher> {
    return this.prisma.bookPublisher.delete({
      where,
    });
  }
}
