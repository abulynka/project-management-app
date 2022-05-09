import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from '../../services/boards.service';
import { BoardResponse, BoardShort } from '../../models/boards.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public selectedOptions: string[] = [];

  public boards: BoardShort[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
  ) {
    this.boardsService.getBoards().subscribe((response: BoardResponse[]) => {
      this.boards = response;
    });
  }

  public openBoard(): void {
    this.router
      .navigate([this.selectedOptions[0]], { relativeTo: this.route })
      .then();
  }

  public deleteBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    // todo: add confirmation + delete board by id + remove console.log next line
    console.log(id);
  }
}
