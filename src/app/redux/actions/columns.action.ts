import { ActionCreator, createAction, props } from '@ngrx/store';
import { ColumnResponse } from '../../project-management/models/boards.model';

export enum ColumnsActionType {
  CreateColumn = 'column-create',
  CreatedColumn = 'column-created',

  UpdateColumn = 'column-update',
  UpdatedColumn = 'column-updated',

  DeleteColumn = 'column-delete',
  DeletedColumn = 'column-deleted',

  LoadColumns = 'colums-load',
  LoadedColumns = 'columns-loaded',
}

export const createdColumn: ActionCreator<any> = createAction(
  ColumnsActionType.CreatedColumn,
  props<{
    action: ColumnsActionType.CreatedColumn;
    payload: ColumnResponse;
  }>(),
);

export const updatedColumn: ActionCreator<any> = createAction(
  ColumnsActionType.UpdatedColumn,
  props<{
    action: ColumnsActionType.UpdatedColumn;
    payload: ColumnResponse;
  }>(),
);

export const deletedColumn: ActionCreator<any> = createAction(
  ColumnsActionType.DeletedColumn,
  props<{
    action: ColumnsActionType.DeletedColumn;
    payload: ColumnResponse;
  }>(),
);

export const loadedColumns: ActionCreator<any> = createAction(
  ColumnsActionType.LoadedColumns,
  props<{ payload: ColumnResponse[] }>(),
);
