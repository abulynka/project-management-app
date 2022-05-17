import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/project-management/models/boards.model';
import { SearchTaskService } from '../../../project-management/services/search-task/search-task.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public tasks$: Subject<Task[] | []> | null = null;

  public constructor(private searchTaskService: SearchTaskService) { }

  public ngOnInit(): void {
    this.tasks$ = this.searchTaskService.getResult();
  }

  public openTask(task: Task): void {
    console.log(task);
    
  }

}
