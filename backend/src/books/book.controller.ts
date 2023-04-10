import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.model';

@Controller('books')
export class BookController {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  @Get()
  async getAllBooks() {
    return 'tweste';
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return await this.bookModel.findByPk(id);
  }

  @Post()
  async createBook(
    @Body()
    {
      title,
      bookPublisher,
      author,
      totalPages,
      isFinishedReading,
    }: CreateBookDto,
  ) {
    const book = new Book();
    book.title = title;
    book.bookPublisher = bookPublisher;
    book.author = author;
    book.totalPages = totalPages;
    book.isFinishedReading = isFinishedReading;

    await book.save();
    return book;
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body()
    {
      title,
      bookPublisher,
      author,
      totalPages,
      isFinishedReading,
    }: UpdateBookDto,
  ) {
    const book = await this.bookModel.findByPk(id);
    book.title = title;
    book.bookPublisher = bookPublisher;
    book.author = author;
    book.totalPages = totalPages;
    book.isFinishedReading = isFinishedReading;

    await book.save();
    return book;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.bookModel.destroy({
      where: { id },
    });
  }
}
