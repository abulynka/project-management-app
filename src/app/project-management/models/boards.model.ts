export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}

export interface BoardShort extends BoardResponse {}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task extends TaskResponse {}

export interface File {
  filename: string;
  fileSize: number;
}

export interface BoardResponse {
  id: string;
  title: string;
  description: string;
}

export interface NewColumn {
  title: string;
  order: number;
}

export interface ColumnResponse {
  id: string;
  title: string;
  order: number;
}

export interface TaskSearchFields {
  title: string;
  order: number;
  description: string;
  userName?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  done: boolean;
  userId: string;
  userName?: string;
}

export interface EditTask {
  title: string;
  order: number;
  description: string;
}

export interface NewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  done: boolean;
}

export interface UpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
  boardId: string;
  done: boolean;
}

export interface TaskByIdResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
  boardId: string;
}
