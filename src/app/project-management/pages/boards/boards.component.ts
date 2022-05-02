import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// todo: change it to the board service data source
interface Board {
  id: string;
  title: string;
}

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public selectedOptions: string[] = [];

  // todo: change it to the board service data source
  public boards: Board[] = [
    { id: '1', title: 'Board 1' },
    { id: '2', title: 'Board 2' },
  ];

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public openBoard(): void {
    this.router
      .navigate([this.selectedOptions[0]], { relativeTo: this.route })
      .then();
  }
}
