import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { IBoard } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardsRepository: Repository<Board>,
    ) { }

    async getAll(): Promise<Board[]> {
        return await this.boardsRepository.find();
    }

    async getOne(id: string): Promise<Board | null> {
        const board = await this.boardsRepository.findOne(id);
        return board ?? null;
    }

    async add(boardDto: IBoard): Promise<Board> {
        const createdBoard = this.boardsRepository.create(boardDto);
        return await this.boardsRepository.save(createdBoard);
    }

    async update(id: string, boardDto: IBoard): Promise<Board | null> {
        const board = await this.boardsRepository.findOne(id);
        if (board) {
            return await this.boardsRepository.save({ ...boardDto, id });
        } else {
            return null;
        }
    }

    async delete(id: string): Promise<Board | null> {
        const boardToDelete = await this.boardsRepository.findOne(id);
        if (boardToDelete) {
            await this.boardsRepository.delete(id);
            return boardToDelete;
        } else {
            return null;
        }
    }
}
