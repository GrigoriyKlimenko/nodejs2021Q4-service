import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
import { boardsRepositoryActions } from "./boards.memory.repository";
// import { deleteTaskByBoard } from '../tasks/tasks.service';

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

/**
   * This function initiate response with all Boards in DB and 200 status
   * @param req - optional request param
   * @param res - param for response
*/
const getAllBoards = async (_req: BoardRequest, res: FastifyReply) => {
    const boards = await boardsRepositoryActions.getAll();
    res.send(boards);
};

/**
   * This function initiate response with Board by ID and 200 status
   * If board not founded - initiate response with 404 status and message
   * @param req - request param with boardId
   * @param res - param for response
*/
const getOneBoard = async (req: BoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    const board = await boardsRepositoryActions.getById(boardId);
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
const addBoard = async (req: BoardRequest, res: FastifyReply) => {
    const { title, columns } = req.body;
    const board = {
        id: v4(),
        title,
        columns,
    }

    const newBoard = await boardsRepositoryActions.addBoard(board);
    res.code(201).send(newBoard);
};

/**
   * This function delete Board by ID 
   * and initiate deleteTaskByBoard function
   * and initiate response with 204 status
   * @param req - request param with boardId
   * @param res - param for response
*/
const deleteBoard = async (req: BoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    await boardsRepositoryActions.deleteById(boardId);
    // deleteTaskByBoard(boardId);
    res.code(204).send();
};

/**
   * This function update Board record with new params 
   * and initiate response with new record and 200 status
   * @param req - request param with boardId and body with other data
   * @param res - param for response
*/
const updateBoard =async (req: BoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    const { title, columns } = req.body;
    const board = {
        id: boardId,
        title,
        columns,
    }
    
    const updatedBoard = await boardsRepositoryActions.updateBoard(board);
    res.code(200).send(updatedBoard);
};

export {
    getAllBoards,
    getOneBoard,
    addBoard,
    deleteBoard,
    updateBoard,
};
