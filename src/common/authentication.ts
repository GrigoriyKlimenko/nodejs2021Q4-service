import { FastifyRequest, FastifyReply } from 'fastify';

const withoutAuth = ['/', '/login', '/doc'];

export const authentication = async (req: FastifyRequest, res: FastifyReply) => {

    if (withoutAuth.indexOf(req.url) !== -1) {
        return { req, res };
    }

    const authHeader = req.headers.authorization;

    const partsOfAuthHeader = authHeader ? authHeader.split(' ') : [];

    if ( partsOfAuthHeader.length === 0 || partsOfAuthHeader[0] !== 'Bearer' ||  !partsOfAuthHeader[1] ) {
        res.code(401).send('upssss!');
    }
    return { req, res };
}