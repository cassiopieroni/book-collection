import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'beer',
      database: 'book-collection',
      autoLoadModels: true,
      synchronize: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
