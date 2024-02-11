import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BookLoadAll } from './book-collection.actions';
import { BookCollectionStateModel } from './book-collection.model';
import { BookApiService } from '../book-api.service';
import { tap } from 'rxjs/operators';

@State<BookCollectionStateModel>({
  name: 'bookCollection',
  defaults: {
    entities: []
  }
})
@Injectable()
export class BookCollectionState {
  @Selector()
  static entities(state: BookCollectionStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookCollectionState], (state: BookCollectionStateModel) => {
      return state.entities.find(entity => entity.isbn === isbn);
    });
  }

  @Action(BookLoadAll)
  loadAll(ctx: StateContext<BookCollectionStateModel>) {
    return this.bookService.getAll().pipe(
      tap(books =>
        ctx.setState(state => ({
          ...state,
          entities: books
        }))
      )
    );
  }

  constructor(private readonly bookService: BookApiService) {}
}
