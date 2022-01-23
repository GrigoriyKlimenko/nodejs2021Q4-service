import { loginUser } from './login.service';

const loginSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                login: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['login', 'password'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                },
            },
        },
    },
    handler: loginUser,
}

export {
    loginSchema,
};
