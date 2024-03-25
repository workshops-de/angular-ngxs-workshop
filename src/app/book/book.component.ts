import { Component, OnInit, inject } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookLoadAll } from './state/book-collection.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent implements OnInit {
  store = inject(Store);
  // snackBar = inject(MatSnackBar);
  ngOnInit(): void {
    this.store.dispatch(new BookLoadAll()).subscribe(() => {
      // this.snackBar.open('Yeah!');
    });
  }
}
