import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { NgxsModule } from '@ngxs/store';
import { BooksState } from './state/books.state';

@NgModule({
  declarations: [
    BooksComponent,
    BookCardComponent,
    BookListComponent,
    BookDetailComponent,
    NewBookComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    NgxsModule.forFeature([BooksState]),
  ],
})
export class BooksModule {}
