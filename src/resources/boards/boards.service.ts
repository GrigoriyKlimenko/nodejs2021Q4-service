import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
import { deleteTaskByBoard } from '../tasks/tasks.service';
import { boards } from './boards.memory.repository';

type BoardRequest = FastifyRequest <{
    Params: {
        boardId: string;
    }
    Body: {
        id: string;
        title: string; 
        columns: [];
    }
}>

let boardsRepo = boards;

/**
   * This function initiate response with all Boards in DB and 200 status
   * @param req - optional request param
   * @param res - param for response
*/
const getAllBoards = (_req: BoardRequest, res: FastifyReply) => {
    res.send(boardsRepo);
};

/**
   * This function initiate response with Board by ID and 200 status
   * If board not founded - initiate response with 404 status and message
   * @param req - request param with boardId
   * @param res - param for response
*/
const getOneBoard = (req: BoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    const board = boardsRepo.find((boardItem) => boardItem.id === boardId);
    if (!board) {
        res.code(404).send('no such board');
    } else {
        res.send(board);
    }
};

/**
   * This function add new Board record to DB
   * and initiate response with new record and 201 status
   * @param req - request param with body data
   * @param res - param for response
*/
const addBoard = (req: BoardRequest, res: FastifyReply) => {
    const { title, columns } = req.body;
    const board = {
        id: v4(),
        title,
        columns,
    }

    boardsRepo.push(board);
    res.code(201).send(board);
};

/**
   * This function delete Board by ID 
   * and initiate deleteTaskByBoard function
   * and initiate response with 204 status
   * @param req - request param with boardId
   * @param res - param for response
*/
const deleteBoard = (req: BoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    boardsRepo = boardsRepo.filter((board) => board.id !== boardId);
    deleteTaskByBoard(boardId);
    res.code(204).send();
};

/**
   * This function update Board record with new params 
   * and initiate response with new record and 200 status
   * @param req - request param with boardId and body with other data
   * @param res - param for response
*/
const updateBoard = (req: BoardRequest, res: FastifyReply) => {
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
