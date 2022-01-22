import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import logger from '../../common/logger';
import { usersRepositoryActions } from '../users/user.memory.repository';
import { SALT_ROUNDS } from '../../common/config';

type UserRequest = FastifyRequest <{
    Params: {
        userId: string;
    }
    Body: {
        name: string;
        login: string;
        password: string;
    }
}>

const loginUser = async (req: UserRequest, res: FastifyReply) => {
    const { login, password } = req.body;
    const user = await usersRepositoryActions.getByLogin(login);

  if (!user) {
    res.code(403).send(`No such user: ${login}`);
  }
}

export {
    loginUser
};
