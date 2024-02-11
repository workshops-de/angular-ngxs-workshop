import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { NewBookSubmitStep } from '../state/new-book.actions';
import { NewBookStep } from '../state/new-book.model';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ws-book-new-price',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormField,
    NgIf,
    NgxsFormDirective,
    MatInput,
    MatButton,
    MatError,
    MatLabel
  ],
  templateUrl: './book-new-price.component.html',
  styleUrl: './book-new-price.component.scss'
})
export class BookNewPriceComponent {
  protected form$: Observable<FormGroup>;

  constructor(
    private readonly store: Store,
    readonly formBuilder: FormBuilder
  ) {
    this.form$ = this.store.select(NewBookState.info).pipe(
      map(info => {
        const minPrice = info.model.numPages >= 100 ? 10 : 0;
        return formBuilder.nonNullable.group({
          price: [0, [Validators.required, Validators.min(minPrice)]]
        });
      })
    );
  }

  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }

  cancel() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }
}
