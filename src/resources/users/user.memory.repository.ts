interface IUser {
    id: string;
    name: string;
    login: string;
    password: string;
}
const users: IUser[] = [];

export {users, IUser};