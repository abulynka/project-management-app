import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() public placeholder: string = 'Type smth ...';

  @Input() public label: string = 'Task name';

  @Output() public searchValueEvent: EventEmitter<string> =
    new EventEmitter<string>();

  public searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  public ngOnInit(): void {
    this.initSearchValueObserver();
  }

  public onSubmit(): void {
    this.submitSearchValue(this.searchForm.get('searchValue')?.value);
  }

  public onIconClick(): void {
    this.submitSearchValue(this.searchForm.get('searchValue')?.value);
  }

  private submitSearchValue(value: string): void {
    this.searchValueEvent.emit(value);
  }

  private initSearchValueObserver(): void {
    const DELAY_TIME: number = 1000;
    this.searchForm
      // TODO: maybe change onKeyUp
      .get('searchValue')
      ?.valueChanges.pipe(debounceTime(DELAY_TIME))
      .subscribe((value: string) => {
        this.submitSearchValue(value);
      });
  }
}
