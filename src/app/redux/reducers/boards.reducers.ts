import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { BoardsState } from '../state.models';
import {
  createdBoard,
  deletedBoard,
  loadedBoards,
  updatedBoard,
} from '../actions/boards.action';
import { BoardShort } from '../../project-management/models/boards.model';

const initialState: BoardsState = {
  boardsShort: [],
};

export const reducer: ActionReducer<any> = createReducer(
  initialState,

  on(createdBoard, (state: any, action: any): BoardsState => {
    return {
      boardsShort: [...state.boardsShort, action.payload],
    };
  }),

  on(updatedBoard, (state: any, action: any): BoardsState => {
    return {
      boardsShort: state.boardsShort.map((board: BoardShort) => {
        if (board.id === action.payload.id) {
          return action.payload;
        }
        return board;
      }),
    };
  }),

  on(deletedBoard, (state: any, action: any): BoardsState => {
    return {
      boardsShort: state.boardsShort.filter((board: BoardShort) => {
        return board.id !== action.payload;
      }),
    };
  }),

  on(loadedBoards, (state: any, action: any): BoardsState => {
    return { ...state, boardsShort: [...state.boardsShort, ...action.payload] };
  }),
);

export function boardsReducer(state: BoardsState, action: Action): any {
  return reducer(state, action);
}
