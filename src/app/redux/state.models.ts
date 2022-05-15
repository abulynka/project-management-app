import {
  SignInResponse,
  SignUpData,
  SignUpResponse,
} from '../auth/models/authorization.model';

import { BoardShort, Column } from '../project-management/models/boards.model';

export interface BoardsState {
  readonly boardsShort: BoardShort[];
  readonly createdBoard: BoardShort | null;
}

export interface ColumnsState {
  readonly columns: Record<string, Column[]>;
}

export interface AuthState {
  readonly signInResponse: SignInResponse;
  readonly signUPData: SignUpData;
  readonly signUpResponse: SignUpResponse;
}
