export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface BoardShort extends BoardResponse {}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: File[];
}

export interface File {
  filename: string;
  fileSize: number;
}

export interface BoardResponse {
  id: string;
  title: string;
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

export interface TaskResponse {
  id: string;
  title: string;
  order: number;
}

export interface NewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface UpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
  boardId: string;
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
