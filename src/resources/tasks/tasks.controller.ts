import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './interfaces/task.interface';
import {JwtAuthGuard} from '../auth/jwtAuth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(@Param('boardId') boardId: string) {
        const foundTasks = await this.tasksService.getAll(boardId)
        if (foundTasks.length === 0) {
            throw new NotFoundException();
        } else {
            return foundTasks;
        }

    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOne(@Param('boardId') boardId: string, @Param('id') id: string) {
        const foundTask = await this.tasksService.getOne(boardId, id);
        if (foundTask === null) {
            throw new NotFoundException();
        } else {
            return foundTask;
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    add(
        @Param('boardId') boardId: string,
        @Body() taskDto: ITask,
    ) {
        return this.tasksService.add(boardId, taskDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async delete(@Param('boardId') boardId: string, @Param('id') id: string) {
        const deletedTask = await this.tasksService.delete(boardId, id);
        if (deletedTask === null) {
            throw new NotFoundException();
        } else {
            return deletedTask;
        }
    }
}