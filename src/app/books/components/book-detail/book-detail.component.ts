import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book> = EMPTY;

  constructor() {}

  ngOnInit(): void {}
}
