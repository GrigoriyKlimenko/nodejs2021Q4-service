import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './interfaces/task.interface';

@Controller('/boards/:boardId/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAll(@Param('boardId') boardId: string) {
        return await this.tasksService.getAll(boardId);
    }

    @Get(':id')
    async getOne(@Param('boardId') boardId: string, @Param('id') id: string) {
        return await this.tasksService.getOne(boardId, id);
    }

    @Post()
    add(
        @Param('boardId') boardId: string,
        @Body() taskDto: ITask,
    ) {
        return this.tasksService.add(boardId, taskDto);
    }

    @Put(':id')
    async update(
        @Param('boardId') boardId: string,
        @Param('id') id: string,
        @Body() taskDto: ITask,
    ) {
        return await this.tasksService.update(boardId, id, taskDto);
    }

    @Delete(':id')
    async delete(@Param('boardId') boardId: string, @Param('id') id: string) {
        return await this.tasksService.delete(boardId, id);
    }    
}