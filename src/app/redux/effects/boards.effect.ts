import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, switchMap, map } from 'rxjs';
import { BoardsService } from '../../project-management/services/boards.service';
import { BoardsActionType } from '../actions/boards.action';
import {
  BoardResponse,
  BoardShort,
} from '../../project-management/models/boards.model';

@Injectable()
export class BoardsEffect {
  public createBoards$: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActionType.CreateBoard),
      switchMap((keyword: { payload: any }) => {
        return this.boardsService
          .createBoard(keyword.payload.title, keyword.payload.description)
          .pipe(
            map((boardResponse: BoardResponse) => {
              return {
                type: BoardsActionType.CreatedBoard,
                payload: boardResponse,
              };
            }),
            catchError(() => EMPTY),
          );
      }),
    );
  });

  public updateBoard$: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActionType.UpdateBoard),
      switchMap((keyword: { payload: BoardShort }) => {
        return this.boardsService
          .updateBoard(
            keyword.payload.id,
            keyword.payload.title,
            keyword.payload.description,
          )
          .pipe(
            map((boardResponse: BoardResponse) => ({
              type: BoardsActionType.UpdatedBoard,
              payload: boardResponse,
            })),
            catchError(() => EMPTY),
          );
      }),
    );
  });

  public deleteBoard$: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActionType.DeleteBoard),
      switchMap((keyword: { payload: string }) => {
        return this.boardsService.deleteBoard(keyword.payload).pipe(
          map(() => ({
            type: BoardsActionType.DeletedBoard,
            payload: keyword.payload,
          })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  public loadBoards$: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActionType.LoadBoards),
      switchMap(() => {
        return this.boardsService.getBoards().pipe(
          map((boards: BoardResponse[]) => ({
            type: BoardsActionType.LoadedBoards,
            payload: boards,
          })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  public constructor(
    private actions$: Actions,
    private boardsService: BoardsService,
  ) {}
}
