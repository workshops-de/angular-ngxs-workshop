import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { NewBookSelectStep } from '../state/new-book.actions';
import { NewBookState } from '../state/new-book.state';
import { Observable } from 'rxjs';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NewBookStep } from '../state/new-book.model';
import { BookNewInfoComponent } from '../book-new-info/book-new-info.component';
import { BookNewPriceComponent } from '../book-new-price/book-new-price.component';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgSwitch,
    NgSwitchCase,
    BookNewInfoComponent,
    BookNewPriceComponent
  ]
})
export class BookNewComponent {
  NewBookStep = NewBookStep;

  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;

  constructor(private readonly store: Store) {}

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(step));
  }
}
