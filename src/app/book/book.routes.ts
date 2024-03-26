import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookCollectionState } from './state/book-collection.state';
import { provideStore } from '@ngxs/store';
import { NewBookState } from './state/new-book.state';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent,
    providers: [provideStore([BookCollectionState, NewBookState])],
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: BookNewComponent
      },
      {
        path: ':isbn',
        component: BookDetailComponent
      },
      {
        path: ':isbn/edit',
        component: BookEditComponent
      }
    ]
  }
];
