import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { BoardsState } from '../state.models';
import { BoardShort } from '../../project-management/models/boards.model';

export const getBoards: MemoizedSelector<object, BoardShort[]> = createSelector(
  createFeatureSelector<BoardsState>('boards'),
  (state: BoardsState) => {
    return state.boardsShort;
  },
);

export const getBoardById = (
  id: string,
): MemoizedSelector<object, BoardShort | undefined> => {
  return createSelector(
    createFeatureSelector<BoardsState>('boards'),
    (state: BoardsState): BoardShort | undefined => {
      return state.boardsShort.find((board: BoardShort): boolean => {
        return board.id === id;
      });
    },
  );
};
