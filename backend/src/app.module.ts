import { Module } from '@nestjs/common';
import { BookController } from './books/book.controller';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [PrismaService],
})
export class AppModule {}
