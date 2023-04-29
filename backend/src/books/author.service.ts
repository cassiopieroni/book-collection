import { Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async author(
    bookWhereUniqueInput: Prisma.AuthorWhereUniqueInput,
  ): Promise<Author | null> {
    return this.prisma.author.findUnique({
      where: bookWhereUniqueInput,
    });
  }

  async createAuthor(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prisma.author.create({ data });
  }

  async updateAuthor(params: {
    where: Prisma.AuthorWhereUniqueInput;
    data: Prisma.AuthorUpdateInput;
  }): Promise<Author> {
    const { where, data } = params;
    return this.prisma.author.update({
      data,
      where,
    });
  }

  async deleteAuthor(where: Prisma.AuthorWhereUniqueInput): Promise<Author> {
    return this.prisma.author.delete({
      where,
    });
  }
}
