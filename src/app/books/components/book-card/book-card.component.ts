import { Component, DoCheck, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements DoCheck {
  @Input() content: Book | undefined;

  ngDoCheck() {}
}
