import {
  SignInResponse,
  SignUpData,
  SignUpResponse,
} from '../auth/models/authorization.model';

import { Board, BoardShort } from '../project-management/models/boards.model';

export interface ProjectManagementState {
  readonly boards: Board[];
  readonly boardsShort: BoardShort[];
}

export interface AuthState {
  readonly signInResponse: SignInResponse;
  readonly signUPData: SignUpData;
  readonly signUpResponse: SignUpResponse;
}
