import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { provideStore } from '@ngxs/store';
import { BookCollectionState } from './state/book-collection.state';

export const bookRoutes: Routes = [
  {
    path: '',
    providers: [provideStore([BookCollectionState])],
    component: BookComponent,
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
