import { Component, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Select, Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { Observable } from 'rxjs';
import { NewBookStep } from '../state/new-book.model';
import { NewBookSelectStep } from '../state/new-book.actions';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

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
    MatButtonToggleGroup,
    MatButtonToggle,
    NgSwitch,
    NgSwitchCase,
    AsyncPipe
  ]
})
export class BookNewComponent {
  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  protected NewBookStep = NewBookStep;

  @Select(NewBookState.step)
  protected step$!: Observable<NewBookStep>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef,
    private readonly store: Store
  ) {}

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

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(step));
  }
}
