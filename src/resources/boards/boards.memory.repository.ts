interface IBoard {
    id: string;
    title: string;
    columns: string[];
}

const boards: IBoard[] = [];

export { boards, IBoard};
