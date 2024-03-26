import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookModel, NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[New Book] Selected Step';
  constructor(readonly step: NewBookStep) {}
}
export class NewBookSubmitStep {
  static type = '[New Book] Submit Step';
  constructor(readonly step: NewBookStep) {}
}

@State<NewBookModel>({
  name: 'new',
  defaults: {
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
    }
  }
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookModel) {
    return state.step;
  }

  @Action(NewBookSelectStep)
  selectStep(ctx: StateContext<NewBookModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({ ...state, step: action.step }));
  }

  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookModel>, action: NewBookSubmitStep) {
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState(state => ({
        ...state,
        step: nextStep
      }));
    }
  }
}
