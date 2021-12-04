const { 
  getBoardsSchema, 
  getOneBoardSchema, 
  addBoardSchema, 
  deleteBoardSchema, 
  updateBoardSchema, 
}= require('./boards.model');

function boardsRouter (fastify, options, done) {
  fastify.get('/boards', getBoardsSchema);
  fastify.get('/boards/:boardId', getOneBoardSchema);
  fastify.post('/boards', addBoardSchema);
  fastify.put('/boards/:boardId', updateBoardSchema);
  fastify.delete('/boards/:boardId', deleteBoardSchema);
  done();
}

module.exports = boardsRouter;
