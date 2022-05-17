import { ActionCreator, createAction, props } from '@ngrx/store';
import { BoardResponse } from '../../project-management/models/boards.model';

export enum BoardsActionType {
  CreateBoard = 'create-board',
  CreatedBoard = 'created-board',
  UpdateBoard = 'update-board',
  UpdatedBoard = 'updated-board',
  DeleteBoard = 'delete-board',
  DeletedBoard = 'deleted-board',
  LoadBoards = 'load-boards',
  LoadedBoards = 'loaded-boards',
}

export const createdBoard: ActionCreator<BoardsActionType.CreatedBoard> =
  createAction(
    BoardsActionType.CreatedBoard,
    props<{
      action: BoardsActionType.CreatedBoard;
      payload: BoardResponse;
    }>(),
  );

export const updatedBoard: ActionCreator<BoardsActionType.UpdatedBoard> =
  createAction(
    BoardsActionType.UpdatedBoard,
    props<{
      action: BoardsActionType.UpdatedBoard;
      payload: BoardResponse;
    }>(),
  );

export const deletedBoard: ActionCreator<BoardsActionType.DeletedBoard> =
  createAction(
    BoardsActionType.DeletedBoard,
    props<{
      action: BoardsActionType.DeletedBoard;
      payload: BoardResponse;
    }>(),
  );

export const loadedBoards: ActionCreator<BoardsActionType.LoadedBoards> =
  createAction(
    BoardsActionType.LoadedBoards,
    props<{ payload: BoardResponse[] }>(),
  );
