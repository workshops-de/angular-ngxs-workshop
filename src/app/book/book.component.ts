import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookLoadAll } from './state/book-collection.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new BookLoadAll());
  }
}
