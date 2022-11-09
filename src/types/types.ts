export type CreateUserType = {
  name: string;
  login: string;
  password: string;
};

export type GetUserType = {
  id: string;
  name: string;
  login: string;
};

export type LoginUserType = {
  login: string;
  password: string;
};

export type UserStateType = {
  token: string | null;
  id: string;
  name: string;
  login: string;
  status: string;
};

export type CreateBoardType = {
  title: string;
  description: string;
};

export type GetBoardType = {
  id: string;
  title: string;
  description: string;
};

export type BoardType = {
  id: string;
  title: string;
  description: string;
  columns: ColumnType[];
};

export type GetColumnType = {
  id: string;
  title: string;
  order: number;
};

export type UpdateColumnType = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
};

export type ColumnType = {
  id: string;
  title: string;
  order: number;
  tasks: TaskType[];
};

export type CreateTaskType = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    description: string;
    userId: string;
  };
};

export type GetTaskType = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: [];
};

export type UpdateTaskType = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
};
