import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Book } from '../../models/book';
import { BooksState } from '../../state/books.state';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.book$ = this.route.params.pipe(
      switchMap((params) => this.store.select(BooksState.entity(params.isbn))),
      filter((bookOrUndefined): bookOrUndefined is Book => !!bookOrUndefined)
    );
  }

  ngOnInit(): void {}
}
