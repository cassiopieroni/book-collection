import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bookPublisher: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  totalPages: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isFinishedReading: boolean;
}
