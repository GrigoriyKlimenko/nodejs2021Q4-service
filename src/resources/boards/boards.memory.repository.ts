import { IColumn } from './columns.model';

interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
}

const boards: IBoard[] = [];

export { 
    boards, 
    IBoard
};
