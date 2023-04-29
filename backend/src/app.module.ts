import { Module } from '@nestjs/common';
import { BookController } from './books/book.controller';
import { PrismaService } from './database/prisma.service';
import { BookService } from './books/book.service';
import { AuthorService } from './books/author.service';
import { BookPublisherService } from './books/bookPublisher.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [PrismaService, BookService, AuthorService, BookPublisherService],
})
export class AppModule {}
