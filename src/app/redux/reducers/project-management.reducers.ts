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
  createdBoard: null,
};

export const reducer: ActionReducer<any> = createReducer(
  initialState,

  on(createdBoard, (state: any, action: any): ProjectManagementState => {
    return {
      boards: [...state.boards, action.payload],
      boardsShort: [...state.boardsShort, action.payload],
      createdBoard: action.payload,
    };
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
      createdBoard: null,
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
      createdBoard: null,
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
