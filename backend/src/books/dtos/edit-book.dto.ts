import { IsNotEmpty } from 'class-validator';

export class EditBookDto {
  @IsNotEmpty()
  id: string;

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
