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
import { TasksService } from './tasks.service';
import { ITask } from './interfaces/task.interface';

@Controller('/boards/:boardId/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAll(@Param('boardId') boardId: string) {
        const foundTasks = await this.tasksService.getAll(boardId)
        if (foundTasks.length === 0) {
            throw new NotFoundException();
        } else {
            return foundTasks;
        }

    }

    @Get(':id')
    async getOne(@Param('boardId') boardId: string, @Param('id') id: string) {
        const foundTask = await this.tasksService.getOne(boardId, id);
        if (foundTask === null) {
            throw new NotFoundException();
        } else {
            return foundTask;
        }
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
        const updatedTask = await this.tasksService.update(boardId, id, taskDto);
        if (updatedTask === null) {
            throw new NotFoundException();
        } else {
            return updatedTask;
        }

    }

    @Delete(':id')
    async delete(@Param('boardId') boardId: string, @Param('id') id: string) {
        const deletedTask = await this.tasksService.delete(boardId, id);
        if (deletedTask === null) {
            throw new NotFoundException();
        } else {
            return deletedTask;
        }
    }
}