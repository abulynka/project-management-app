import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ProjectManagementState } from '../state.models';
import {
  createdBoard,
  deletedBoard,
  loadedBoards,
  updatedBoard,
} from '../actions/project-management.action';
import {
  Board,
  BoardShort,
} from '../../project-management/models/boards.model';

const initialState: ProjectManagementState = {
  boards: [],
  boardsShort: [],
};

export const reducer: ActionReducer<any> = createReducer(
  initialState,

  on(createdBoard, (state: any, action: any): ProjectManagementState => {
    return { ...state, boards: [...state.boards, action.payload] };
  }),

  on(updatedBoard, (state: any, action: any): ProjectManagementState => {
    return {
      boards: state.boards.map((board: Board) => {
        if (board.id === action.payload.id) {
          return action.payload;
        }
        return board;
      }),
      boardsShort: state.boardsShort.map((board: BoardShort) => {
        if (board.id === action.payload.id) {
          return action.payload;
        }
        return board;
      }),
    };
  }),

  on(deletedBoard, (state: any, action: any): ProjectManagementState => {
    return {
      boards: state.boards.filter((board: Board) => {
        return board.id !== action.payload;
      }),
      boardsShort: state.boards.filter((board: BoardShort) => {
        return board.id !== action.payload;
      }),
    };
  }),

  on(loadedBoards, (state: any, action: any): ProjectManagementState => {
    return { ...state, boards: [...state.boards, ...action.payload] };
  }),
);

export function projectManagementReducer(
  state: ProjectManagementState,
  action: Action,
): any {
  return reducer(state, action);
}
