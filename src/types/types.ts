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
  isAuth: boolean;
  token: string | null;
  id: string;
  name: string;
  login: string;
  status: string;
};

export type CreateBoardType = {
  title: string;
  owner: string;
  users: string[];
};

export type GetBoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
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
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: FilesType[];
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

export type FilesType = {
  filename: string;
  fileSize: number;
};

export type DecodedTokenType = {
  iat: number;
  login: string;
  userId: string;
};

export type NotificationType = {
  isShow: boolean;
  text: string;
  severity: 'error' | 'success' | undefined;
};
