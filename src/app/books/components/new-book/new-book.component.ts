import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  NewBookActions,
  NewBookState,
  NewBookStep
} from '../../state/new-book.state';

@Component({
  selector: 'ws-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
  NewBookStep = NewBookStep;

  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;

  constructor(private store: Store) {}

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookActions.SelectStep(step));
  }

  ngOnInit(): void {}
}
