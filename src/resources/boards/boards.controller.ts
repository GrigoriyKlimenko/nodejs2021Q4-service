import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { IBoard } from './interfaces/board.interface';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) { }

    @Get()
    getAll() {
        return this.boardsService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const foundBoard = await this.boardsService.getOne(id);
        if (foundBoard === null) {
            throw new NotFoundException();
        } else {
            return foundBoard;
        }
    }

    @Post()
    add(@Body() board: IBoard) {
        return this.boardsService.add(board);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() board: IBoard,) {
        const updatedBoard = await this.boardsService.update(id, board);
        if (updatedBoard === null) {
            throw new NotFoundException();
        } else {
            return updatedBoard;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const boardToDelete = await this.boardsService.delete(id);
        if (boardToDelete === null) {
            throw new NotFoundException();
        } else {
            return boardToDelete;
        }

    }
}
