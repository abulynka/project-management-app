import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ProjectManagementState } from '../state.models';
import { Board } from '../../project-management/models/boards.model';

export const getBoards: MemoizedSelector<object, Board[]> = createSelector(
  createFeatureSelector<ProjectManagementState>('projectManagement'),
  (state: ProjectManagementState) => {
    return state.boards;
  },
);

export const getBoardById = (
  id: string,
): MemoizedSelector<object, Board | undefined> => {
  return createSelector(
    createFeatureSelector<ProjectManagementState>('projectManagement'),
    (state: ProjectManagementState): Board | undefined => {
      return state.boards.find((board: Board): boolean => {
        return board.id === id;
      });
    },
  );
};
