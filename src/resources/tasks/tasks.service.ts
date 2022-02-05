import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(boardId: string): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { boardId } });
  }

  async getOne(boardId: string, id: string): Promise<Task | null> {
    const task = await this.tasksRepository.findOne({
      where: { boardId, id },
    });
    return task ?? null;
  }

  async add(boardId: string, taskDto: ITask): Promise<Task> {
    const newTask = this.tasksRepository.create({...taskDto, boardId});
    return await this.tasksRepository.save(newTask);
  }

  async update(boardId: string, id: string, taskDto: ITask) {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (task) {
        return await this.tasksRepository.save({ ...taskDto, id, boardId });
    } else {
        return null;
    }
  }

  async delete(boardId: string, id: string) {
    const taskToDelete = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (taskToDelete) {
        await this.tasksRepository.delete({ boardId, id });
        return taskToDelete
    } else {
        return null;
    }
  }
}