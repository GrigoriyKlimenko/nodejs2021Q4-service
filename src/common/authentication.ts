import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "./config";

const withoutAuth = ['/', '/login', '/doc'];

export const authentication = async (req: FastifyRequest, res: FastifyReply) => {

    if (withoutAuth.indexOf(req.url) !== -1) {
        return { req, res };
    }

    const authHeader = req.headers.authorization;

    const partsOfAuthHeader = authHeader ? authHeader.split(' ') : [];

    if (partsOfAuthHeader.length === 0 || partsOfAuthHeader[0] !== 'Bearer' || !partsOfAuthHeader[1]) {
        res.code(401).send('upssss!');
    }
    try {
        jwt.verify(partsOfAuthHeader[1], JWT_SECRET_KEY);
    } catch (err) {
        res.code(401).send(err);
    }

    return { req, res };
}