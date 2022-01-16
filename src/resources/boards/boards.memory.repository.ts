import { IColumn } from './columns.model';
import { getRepository } from 'typeorm';
import { BoardsModel } from "./boards.model";

interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
}

const boards: IBoard[] = [];

const getAll = async (): Promise<BoardsModel[]> => {
    const boardRepository = getRepository(BoardsModel);
    return boardRepository.find();
};
const getById = async (id: string): Promise<BoardsModel | undefined> => {
    const boardRepository = getRepository(BoardsModel);
    return boardRepository.findOne(id);
};
const addBoard = async (board: BoardsModel): Promise<BoardsModel> => {
    const boardNew = getRepository(BoardsModel).save(board);
    return boardNew;
};
const updateBoard = async (board: BoardsModel): Promise<BoardsModel> => {
    const boardApd = getRepository(BoardsModel).save(board);
    return boardApd;
};
const deleteById = async (id: string): Promise<void> => {
    const removeResult = await getRepository(BoardsModel).delete(id);
};
const boardsRepositoryActions = {getAll, getById, addBoard, updateBoard, deleteById};

export { 
    boards, 
    IBoard,
    boardsRepositoryActions
};
