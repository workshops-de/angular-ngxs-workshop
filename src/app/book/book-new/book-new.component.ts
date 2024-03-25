import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { NewBookSelectStep, NewBookState } from '../state/new-book.state';
import { NewBookStep } from '../state/new-book.model';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    MatButtonToggleModule,
    AsyncPipe
  ]
})
export class BookNewComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });
  private store = inject(Store);
  NewBookStep = NewBookStep;

  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  step$ = this.store.select(NewBookState.step);
  selectStep(nextStep: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(nextStep));
  }
  create() {
    const book = { ...bookNa(), ...this.form.getRawValue() };
    this.bookService
      .create(book)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
