import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookModel, NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[New Book] Selected Step';
  constructor(readonly step: NewBookStep) {}
}

@State<NewBookModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info
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
}
