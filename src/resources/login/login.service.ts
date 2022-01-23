import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../common/logger';
import { usersRepositoryActions } from '../users/user.memory.repository';
import { JWT_SECRET_KEY } from '../../common/config';

type UserRequest = FastifyRequest<{
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

    } else {

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.code(403).send(`Password incorrect`);
        }

        const tokenPayload = { userId: user.id, login: user.login };
        const token = await jwt.sign(tokenPayload, JWT_SECRET_KEY);
        res.send({ token });
        logger.info(`User ${login} : ${password} logged in with token: ${token}`)
    }


}

export {
    loginUser
};
