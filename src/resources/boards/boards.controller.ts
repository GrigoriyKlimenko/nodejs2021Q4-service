import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete
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
        return await this.boardsService.getOne(id);
    }

    @Post()
    add(@Body() board: IBoard) {
        return this.boardsService.add(board);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() board: IBoard,) {
        return await this.boardsService.update(id, board);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.boardsService.delete(id);
    }
}
