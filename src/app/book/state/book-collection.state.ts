import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { BookLoadAll } from './book-collection.actions';
import { BookCollectionStateModel } from './book-collection.model';
import { Book } from '../models';
import { Observable, catchError, of, retry, tap } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewBookCreated, NewBookState } from './new-book.state';
import { NewBookModel } from './new-book.model';
import { append, patch } from '@ngxs/store/operators';

const booksMock: Book[] = [
  {
    id: '1001606140805',
    title: 'Java Web Scraping Handbook',
    subtitle: 'Learn advanced Web Scraping techniques',
    isbn: '1001606140805',
    abstract:
      'Web scraping or crawling is the art of fetching data from a third party website by downloading and parsing the HTML code to extract the data you want. It can be hard. From bad HTML code to heavy Javascript use and anti-bot techniques, it is often tricky. Lots of companies use it to obtain knowledge ...',
    author: 'Kevin Sahin',
    publisher: 'Leanpub',
    price: 10,
    numPages: 115,
    cover: 'http://localhost:4730/covers/1001606140805.png'
  },
  {
    id: '9780071494618',
    title: 'Hacking Exposed Web 2.0',
    subtitle: 'Web 2.0 Security Secrets and Solutions',
    isbn: '9780071494618',
    abstract:
      'Protect your Web 2.0 architecture against the latest wave of cybercrime using expert tactics from Internet security professionals. Hacking Exposed Web 2.0 shows how hackers perform reconnaissance, choose their entry point, and attack Web 2.0 - based services, and reveals detailed countermeasures and...',
    author: 'Rich Cannings, Himanshu Dwivedi, Zane Lackey',
    publisher: 'McGraw-Hill',
    price: 10,
    numPages: 258,
    cover: 'http://localhost:4730/covers/9780071494618.png'
  },
  {
    id: '9780071740647',
    title: 'Hacking Exposed Web Applications, 3rd Edition',
    subtitle: 'Web Applications Security Secrets and Solutions',
    isbn: '9780071740647',
    abstract:
      "Protect your Web applications from malicious attacks by mastering the weapons and thought processes of today's hacker. Written by recognized security practitioners and thought leaders, Hacking Exposed Web Applications, Third Edition is fully updated to cover new infiltration methods and countermeasu...",
    author: 'Joel Scambray, Vincent Liu, Caleb Sima',
    publisher: 'McGraw-Hill',
    price: 10,
    numPages: 482,
    cover: 'http://localhost:4730/covers/9780071740647.png'
  }
];
@State<BookCollectionStateModel>({
  name: 'bookCollection',
  defaults: {
    entities: []
  },
  children: [NewBookState]
})
@Injectable()
export class BookCollectionState {
  service = inject(BookApiService);
  snackBar = inject(MatSnackBar);
  @Action(BookLoadAll)
  loadAll(ctx: StateContext<BookCollectionStateModel>, action: BookLoadAll) {
    return this.service.getAll().pipe(
      retry({ delay: 2500, count: 2 }),
      catchError(error => {
        this.snackBar.open('Sie sehen alte Daten!');
        return of(booksMock);
      }),
      tap({
        next: books => ctx.setState(state => ({ ...state, entities: books })),
        error: err => {
          console.log(err);
          this.snackBar.open('Ouch! ' + err.message);
        }
      })
    );
  }

  @Action(NewBookCreated)
  bookCreated(ctx: StateContext<BookCollectionStateModel>, action: NewBookCreated) {
    ctx.setState(
      patch({
        entities: append([action.book])
      })
    );
  }

  @Selector()
  static entities(state: BookCollectionStateModel): Book[] {
    return state.entities;
  }

  static entity(isbn: string): (books: Book[]) => Book | undefined {
    return createSelector([BookCollectionState.entities], (books: Book[]) => books.find(book => book.isbn === isbn));
  }
}
