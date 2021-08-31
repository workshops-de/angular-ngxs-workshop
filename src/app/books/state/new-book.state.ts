import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

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

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStep;
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
  ) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep,
      });
    }
  }
}
