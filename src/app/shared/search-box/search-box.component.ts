import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Output() public searchValueEvent: EventEmitter<string> =
    new EventEmitter<string>();

  @Output() public searchFocusEvent: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('searchInput', { read: ElementRef })
  private searchInputRef!: ElementRef;

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

  public onFocus(): void {
    this.searchFocusEvent.emit();
  }

  private submitSearchValue(value: string): void {
    this.searchValueEvent.emit(value);
  }

  private initSearchValueObserver(): void {
    const DELAY_TIME: number = 2000;
    const MAX_LENGTH: number = 3;
    this.searchForm
      .get('searchValue')
      ?.valueChanges.pipe(
        debounceTime(DELAY_TIME),
        distinctUntilChanged(),
        filter((model: string) => model.length >= MAX_LENGTH),
      )
      .subscribe((value: string) => {
        if (value) {
          this.submitSearchValue(value);
        }
      });
  }
}
