import uuid = require('uuid');
import { deleteTaskByBoard } from '../tasks/tasks.service';
import { boards } from './boards.memory.repository';

let boardsRepo = boards;

const getAllBoards = (_req, res) => {
    res.send(boardsRepo);
};

const getOneBoard = (req, res) => {
    const { boardId } = req.params;
    const board = boardsRepo.find((boardItem) => boardItem.id === boardId);
    if (!board) {
        res.code(404).send('no such board');
    } else {
        res.send(board);
    }
};

const addBoard = (req, res) => {
    const { title, columns } = req.body;
    const board = {
        id: uuid.v4(),
        title,
        columns,
    }

    boardsRepo.push(board);
    res.code(201).send(board);
};

const deleteBoard = (req, res) => {
    const { boardId } = req.params;
    boardsRepo = boardsRepo.filter((board) => board.id !== boardId);
    deleteTaskByBoard(boardId);
    res.code(204).send();
};

const updateBoard = (req, res) => {
    const { boardId } = req.params;
    const { title, columns } = req.body;
    const updatedBoard = {
        id: boardId,
        title,
        columns,
    }
    
    boardsRepo = boardsRepo.map( board => board.id === boardId ? updatedBoard : board);
    res.code(200).send(updatedBoard);
};

export {
    getAllBoards,
    getOneBoard,
    addBoard,
    deleteBoard,
    updateBoard,
};
