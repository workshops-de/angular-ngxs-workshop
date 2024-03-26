import { AfterViewChecked, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, tap } from 'rxjs';
import { NewBookState } from '../state/new-book.state';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid);
  }
}

@Component({
  selector: 'ws-book-new-price',
  templateUrl: './book-new-price.component.html',
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
    AsyncPipe,
    NgxsFormDirective
  ]
})
export class BookNewPriceComponent {
  matcher = new MyErrorStateMatcher();
  fb = inject(NonNullableFormBuilder);
  form$ = inject(Store)
    .select(NewBookState.numPages)
    .pipe(
      tap(data => console.log(data)),
      map(numPages => {
        const minPrice = numPages > 100 ? 10 : 0;
        return this.fb.group({
          price: [0, [Validators.required, Validators.min(minPrice)]]
        });
      }),
      tap(form => form.updateValueAndValidity())
    );
}
