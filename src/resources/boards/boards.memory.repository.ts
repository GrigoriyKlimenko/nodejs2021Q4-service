import { getRepository } from 'typeorm';
import { IColumn } from './columns.model';
import { BoardsModel } from './boards.model';

interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
}

const boards: IBoard[] = [];

const getAll = async (): Promise<IBoard[]> => {
    const boardRepository = getRepository(BoardsModel);
    return boardRepository.find();
};
const getById = async (id: string): Promise<IBoard | undefined> => {
    const boardRepository = getRepository(BoardsModel);
    return boardRepository.findOne(id);
};
const addBoard = async (board: IBoard): Promise<IBoard> => {
    const boardNew = getRepository(BoardsModel).save(board);
    return boardNew;
};
const updateBoard = async (board: IBoard): Promise<IBoard> => {
    const boardApd = getRepository(BoardsModel).save(board);
    return boardApd;
};
const deleteById = async (id: string): Promise<void> => {
    await getRepository(BoardsModel).delete(id);
};
const boardsRepositoryActions = { getAll, getById, addBoard, updateBoard, deleteById };

export {
    boards,
    IBoard,
    boardsRepositoryActions
};
