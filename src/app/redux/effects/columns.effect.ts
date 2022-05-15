// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, EMPTY, switchMap, map } from 'rxjs';
// import { ColumnsActionType } from '../actions/columns.action';
// import { ColumnsService } from '../../project-management/services/columns.service';
// import {
//   Column,
//   ColumnResponse,
// } from '../../project-management/models/boards.model';
//
// @Injectable()
// export class ColumnsEffect {
//   public createColumns$: any = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(ColumnsActionType.CreateColumn),
//       switchMap((keyword: { payload: any }) => {
//         return this.columnsService
//           .createColumn(keyword.payload.title, keyword.payload.description)
//           .pipe(
//             map((columnResponse: ColumnResponse) => {
//               return {
//                 type: ColumnsActionType.CreatedColumn,
//                 payload: columnResponse,
//               };
//             }),
//             catchError(() => EMPTY),
//           );
//       }),
//     );
//   });
//
//   public updateColumn$: any = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(ColumnsActionType.UpdateColumn),
//       switchMap((keyword: { payload: Column }) => {
//         return this.columnsService
//           .updateColumn(
//             keyword.payload.id,
//             keyword.payload.title,
//             keyword.payload.description,
//           )
//           .pipe(
//             map((columnResponse: ColumnResponse) => ({
//               type: ColumnsActionType.UpdatedColumn,
//               payload: columnResponse,
//             })),
//             catchError(() => EMPTY),
//           );
//       }),
//     );
//   });
//
//   public deleteColumn$: any = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(ColumnsActionType.DeleteColumn),
//       switchMap((keyword: { payload: string }) => {
//         return this.columnsService.deleteColumn(keyword.payload).pipe(
//           map(() => ({
//             type: ColumnsActionType.DeletedColumn,
//             payload: keyword.payload,
//           })),
//           catchError(() => EMPTY),
//         );
//       }),
//     );
//   });
//
//   public loadColumns$: any = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(ColumnsActionType.LoadColumns),
//       switchMap(() => {
//         return this.columnsService.getColumns().pipe(
//           map((columns: ColumnResponse[]) => ({
//             type: ColumnsActionType.LoadedColumns,
//             payload: columns,
//           })),
//           catchError(() => EMPTY),
//         );
//       }),
//     );
//   });
//
//   public constructor(
//     private actions$: Actions,
//     private columnsService: ColumnsService,
//   ) {}
// }
