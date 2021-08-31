import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';

export enum NewBookStep {
  info = 'info',
  price = 'price',
}

export interface NewBookInfoStep {
  model: {
    isbn: string;
    numPages: number;
    title: string;
    author: string;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}

export interface NewBookPriceStep {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStep;
  price: NewBookPriceStep;
}

export namespace NewBookActions {
  export class SelectStep {
    static type = '[New Book] Select Step';
    constructor(readonly step: NewBookStep) {}
  }

  export class SubmitStep {
    static type = '[New Book] Submit Step';
    constructor(readonly step: NewBookStep) {}
  }

  export class Created {
    static type = '[New Book] Created';
    constructor(readonly book: Book) {}
  }
}

const defaults: NewBookStateModel = {
  step: NewBookStep.info,
  info: {
    model: {
      isbn: '',
      numPages: 0,
      author: '',
      title: '',
    },
    dirty: false,
    status: '',
    errors: {},
  },
  price: {
    model: {
      price: 0,
    },
    dirty: false,
    status: '',
    errors: {},
  },
};

@State<NewBookStateModel>({
  name: 'new',
  defaults,
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static info(state: NewBookStateModel) {
    return state.info;
  }

  @Action(NewBookActions.SelectStep)
  selectStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookActions.SelectStep
  ) {
    ctx.setState((state) => ({
      ...state,
      step: action.step,
    }));
  }

  @Action(NewBookActions.SubmitStep)
  submitStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookActions.SubmitStep
  ): void | Observable<any> {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep,
      });
    } else {
      const invalidStep = steps.find((step) => {
        const status = state[step].status;
        return status !== 'VALID';
      });
      if (invalidStep) {
        ctx.setState({
          ...state,
          step: invalidStep,
        });
      } else {
        return this.bookApi
          .create({
            ...state.info.model,
            price: state.price.model.price.toString(),
          })
          .pipe(
            concatMap((created) => {
              ctx.setState(defaults);
              return ctx.dispatch([
                new NewBookActions.Created(created),
                new Navigate(['/books']),
              ]);
            })
          );
      }
    }
  }

  constructor(private bookApi: BookApiService) {}
}
