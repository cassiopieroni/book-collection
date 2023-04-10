import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  bookPublisher: string;

  @IsNotEmpty()
  @MinLength(4)
  author: string;

  @IsNotEmpty()
  totalPages: number;

  @IsNotEmpty()
  isFinishedReading: boolean;
}
