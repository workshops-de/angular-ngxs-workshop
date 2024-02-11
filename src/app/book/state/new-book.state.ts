import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { NewBookSelectStep } from './new-book.actions';

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info
  }
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Action(NewBookSelectStep)
  selectStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({
      ...state,
      step: action.step
    }));
  }
}
