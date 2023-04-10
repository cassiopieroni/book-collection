import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async create({
    id,
    title,
    bookPublisher,
    author,
    totalPages,
    isFinishedReading,
  }: Book): Promise<Book> {
    return this.bookModel.create({
      id,
      title,
      bookPublisher,
      author,
      totalPages,
      isFinishedReading,
    });
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.bookModel.update(book, {
      where: { id },
    });
    return await this.bookModel.findByPk(id);
  }

  async delete(id: number): Promise<number> {
    return this.bookModel.destroy({ where: { id } });
  }
}
