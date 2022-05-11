import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from '../../services/boards.service';
import { BoardResponse, BoardShort } from '../../models/boards.model';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { EditBoardComponent } from '../../components/edit-board/edit-board.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public selectedOptions: string[] = [];

  public boards: BoardShort[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {
    this.refreshBoardsList();
  }

  private static capitalizeFirstLetter(message: string): string {
    return message.charAt(0).toUpperCase() + message.slice(1);
  }

  public ngOnInit(): void {
    this.boardsService.boardProcessed$.subscribe(() => {
      this.refreshBoardsList();
    });
  }

  public openBoard(): void {
    this.router
      .navigate([this.selectedOptions[0]], { relativeTo: this.route })
      .then();
  }

  public deleteBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();

    this.translateService
      .get(['board.delete-title', 'board.delete-message'])
      .subscribe((translates: Record<string, string>) => {
        const boardTitle: string = this.getBoardTitle(id) || '';
        this.dialog
          .open(ConfirmationModalComponent, {
            minWidth: '320px',
            data: {
              title: `${BoardsComponent.capitalizeFirstLetter(
                translates['board.delete-title'],
              )} ${boardTitle}`,
              message: `${BoardsComponent.capitalizeFirstLetter(
                translates['board.delete-message'],
              )} ${boardTitle}?`,
            },
          })
          .afterClosed()
          .subscribe((result: boolean) => {
            if (result) {
              this.boardsService.deleteBoard(id).subscribe(() => {
                this.refreshBoardsList();
              });
            }
          });
      });
  }

  public editBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();

    this.dialog
      .open(EditBoardComponent, {
        data: {
          board: this.getBoard(id),
        },
      })
      .componentInstance.boardProcessed$.subscribe(() => {
        this.dialog.closeAll();
      });
  }

  private refreshBoardsList(): void {
    console.log('refresh');

    this.boardsService.getBoards().subscribe((response: BoardResponse[]) => {
      this.boards = response.sort(
        (item1: BoardResponse, item2: BoardResponse) => {
          if (item1.title < item2.title) {
            return -1;
          } else if (item1.title === item2.title) {
            return 0;
          } else {
            return 1;
          }
        },
      );
    });
  }

  private getBoardTitle(id: string): string | undefined {
    return this.boards.find((board: BoardShort) => {
      return board.id === id;
    })?.title;
  }

  private getBoard(id: string): BoardShort | undefined {
    return this.boards.find((board: BoardShort) => {
      return board.id === id;
    });
  }
}
