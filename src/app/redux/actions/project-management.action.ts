import { ActionCreator, createAction, props } from '@ngrx/store';
import { BoardResponse } from '../../project-management/models/boards.model';

export enum ProjectManagementActionType {
  CreateBoard = 'create-board',
  CreatedBoard = 'created-board',
  UpdateBoard = 'update-board',
  UpdatedBoard = 'updated-board',
  DeleteBoard = 'delete-board',
  DeletedBoard = 'deleted-board',
  LoadBoards = 'load-boards',
  LoadedBoards = 'loaded-boards',
}

export const createdBoard: ActionCreator<any> = createAction(
  ProjectManagementActionType.CreatedBoard,
  props<{ payload: BoardResponse }>(),
);

export const updatedBoard: ActionCreator<any> = createAction(
  ProjectManagementActionType.UpdatedBoard,
  props<{
    action: ProjectManagementActionType.UpdatedBoard;
    payload: BoardResponse;
  }>(),
);

export const deletedBoard: ActionCreator<any> = createAction(
  ProjectManagementActionType.DeletedBoard,
  props<{
    action: ProjectManagementActionType.DeletedBoard;
    payload: BoardResponse;
  }>(),
);

export const loadedBoards: ActionCreator<any> = createAction(
  ProjectManagementActionType.LoadedBoards,
  props<{ payload: BoardResponse[] }>(),
);
