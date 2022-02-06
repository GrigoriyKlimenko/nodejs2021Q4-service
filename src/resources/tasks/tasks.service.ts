import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(boardId: string): Promise<Task[]> {
    const allTasks = await this.tasksRepository.find({ where: { boardId } });
    return allTasks;
  }

  async getOne(boardId: string, id: string): Promise<Task | null> {
    const task = await this.tasksRepository.findOne({
      where: { boardId, id },
    });
    return task ?? null;
  }

  async add(boardId: string, taskDto: ITask): Promise<Task> {
    const newTask = this.tasksRepository.create({...taskDto, boardId});
    const savedTask = await this.tasksRepository.save(newTask);
    return savedTask;
  }

  async update(boardId: string, id: string, taskDto: ITask) {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (task) {
        const updatedTask = await this.tasksRepository.save({ ...taskDto, id, boardId });
        return updatedTask;
    } 
        return null;
    
  }

  async delete(boardId: string, id: string) {
    const taskToDelete = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (taskToDelete) {
        await this.tasksRepository.delete({ boardId, id });
        return taskToDelete
    } 
        return null;
    
  }
}