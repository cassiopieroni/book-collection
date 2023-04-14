import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  bookPublisher: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  totalPages: number;

  @IsNotEmpty()
  isFinishedReading: boolean;
}
