import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../state/new-book.state';
import { NewBookStep } from '../state/new-book.model';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxsFormDirective } from '@ngxs/form-plugin';

@Component({
  selector: 'ws-book-new-info',
  standalone: true,
  templateUrl: './book-new-info.component.html',
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
    AsyncPipe,
    NgxsFormDirective
  ]
})
export class BookNewInfoComponent {
  private readonly formBuilder = inject(FormBuilder);
  private store = inject(Store);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  submit(): void {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }
}
