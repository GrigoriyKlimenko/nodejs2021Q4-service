import { IsArray, IsString } from 'class-validator';
import { IColumn } from './column.interface';

export class IBoard {
    id?: string;

    @IsString()
    title!: string;

    @IsArray()
    columns!: IColumn[];
}

