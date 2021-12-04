const uuid = require('uuid');
let boardsRepo = require('./boards.memory.repository');

const getAllBoards = (req, res) => {
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
    console.log('>>>>>>>', boardsRepo);
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

module.exports = {
    getAllBoards,
    getOneBoard,
    addBoard,
    deleteBoard,
    updateBoard,
};
