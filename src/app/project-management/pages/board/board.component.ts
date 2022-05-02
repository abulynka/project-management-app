import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// todo: change it to the board service data source
interface Board {
  id: string;
  title: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // todo: change it to the board service data source
  public boards: Board[] = [
    { id: '1', title: 'Board 1' },
    { id: '2', title: 'Board 2' },
  ];

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const board: Board | undefined = this.boards.find((element: Board) => {
        return element.id === params['id'];
      });
      if (board) {
        this.showBoard();
      } else {
        this.router
          .navigate(['../not-found'], { relativeTo: this.route })
          .then();
      }
    });
  }

  private showBoard(): void {}
}
