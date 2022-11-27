export type CreateUserType = {
  name: string;
  login: string;
  password: string;
};

export type GetUserType = {
  _id: string;
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
  _id: string;
  title: string;
  order: number;
  boardId: string;
  items: TaskType[] | [];
};

export type ResponceUpdatedColumns = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ChangedColumns = {
  _id: string;
  title?: string;
  order: number;
  boardId?: string;
  items?: TaskType[] | [];
};

export type UpdatedAllColumns = {
  _id: string;
  order: number;
};

export type UpdateColumnType = {
  boardId: string;
  columnId: string;
  body: {
    title?: string;
    _id?: string;
    order?: number;
  };
};

export type UpdateAllColumns = {
  body: {
    title: string;
    boardId: string;
    _id: string;
    order: number;
    items: TaskType[];
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
    userId: number;
    order: number;
    users: Array<string> | [];
  };
};

export type GetTaskType = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export type ChangedTasks = {
  _id: string;
  title?: string;
  order: number;
  boardId?: string;
  items?: TaskType[] | [];
  description?: string;
  userId?: string;
  columnId: string;
  files?: FilesType[];
  users?: [];
};

export interface TaskProps {
  task: TaskType;
  columnId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provided: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef(element: HTMLElement | null): any;
  index: number;
  columnNum: number;
}

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

export type UpdateSetType = {
  _id: string;
  order: number;
  columnId: string;
};

export type ResponceSetTask = {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
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
  login: string;
  id: string;
  iat: number;
  exp: number;
};

export type NotificationType = {
  isShow: boolean;
  text: string;
  severity: 'error' | 'success' | undefined;
};

export type CategoryType = 'user' | 'board' | 'column' | 'task';
