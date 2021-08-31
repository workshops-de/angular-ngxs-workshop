import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { NewBookState } from './new-book.state';

export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[Books] Load All';
  }
}

export interface BooksStateModel {
  entities: Book[];
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    entities: [],
  },
  children: [NewBookState],
})
@Injectable()
export class BooksState {
  @Selector()
  static entities(state: BooksStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BooksState], (state: BooksStateModel) => {
      return state.entities.find((entity) => entity.isbn === isbn);
    });
  }

  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BooksStateModel>, action: BooksActions.LoadAll) {
    return this.bookApi.all().pipe(
      tap((books) =>
        ctx.setState((state) => ({
          ...state,
          entities: books,
        }))
      )
    );
  }

  constructor(private bookApi: BookApiService) {}
}
