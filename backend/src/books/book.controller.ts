import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllBooks() {
    return await this.prisma.book.findMany();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return await this.prisma.book.findUnique({ where: { id: Number(id) } });
  }

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    const { title, bookPublisher, author, totalPages, isFinishedReading } =
      body;
    const book = await this.prisma.book.create({
      data: {
        title,
        bookPublisher,
        author,
        totalPages,
        isFinishedReading,
      },
    });
    return { data: { ...book } };
  }
}
