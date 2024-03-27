import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookModel, NewBookStep } from './new-book.model';
import { Book, bookNa } from '../models';
import { BookApiService } from '../book-api.service';
import { Observable, concatMap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';

export class NewBookSelectStep {
  static type = '[New Book] Selected Step';
  constructor(readonly step: NewBookStep) {}
}
export class NewBookSubmitStep {
  static type = '[New Book] Submit Step';
  constructor(readonly step: NewBookStep) {}
}
export class NewBookCreated {
  static type = '[New Book] Created';
  constructor(readonly book: Book) {}
}

const defaults: NewBookModel = {
  step: NewBookStep.info,
  info: {
    model: {
      title: '',
      subtitle: '',
      isbn: '',
      cover: '',
      abstract: '',
      numPages: 0,
      author: ''
    },
    dirty: false,
    status: 'VALID',
    errors: {}
  },
  price: {
    model: {
      price: 0
    },
    dirty: false,
    status: 'VALID',
    errors: {}
  }
};

@State<NewBookModel>({
  name: 'new',
  defaults
})
@Injectable()
export class NewBookState {
  service = inject(BookApiService);
  @Selector()
  static step(state: NewBookModel) {
    return state.step;
  }
  @Selector()
  static numPages(state: NewBookModel) {
    return state.info.model.numPages;
  }

  @Action(NewBookSelectStep)
  selectStep(ctx: StateContext<NewBookModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({ ...state, step: action.step }));
  }

  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookModel>, action: NewBookSubmitStep): void | Observable<void> {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);

    const nextStep = steps[steps.indexOf(action.step) + 1];
    console.log('===>', nextStep);
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep
      });
    } else {
      const invalidStep = steps.find(step => {
        const status = state[step].status;
        return status !== 'VALID';
      });
      console.log('===>', invalidStep);
      if (invalidStep) {
        ctx.setState({
          ...state,
          step: invalidStep
        });
      } else {
        return this.service
          .create({
            ...bookNa(),
            ...state.info.model,
            price: state.price.model.price
          })
          .pipe(
            concatMap(created => {
              ctx.setState(defaults);
              return ctx.dispatch([new NewBookCreated(created), new Navigate(['/books'])]);
            })
          );
      }
    }
  }
}
