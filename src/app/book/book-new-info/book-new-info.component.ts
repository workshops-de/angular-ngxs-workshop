import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../state/new-book.actions';
import { NewBookStep } from '../state/new-book.model';

@Component({
  selector: 'ws-book-new-info',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgxsFormDirective
  ],
  templateUrl: './book-new-info.component.html',
  styleUrl: './book-new-info.component.scss'
})
export class BookNewInfoComponent {
  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }
}
