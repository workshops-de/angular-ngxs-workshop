import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[New Book] Select Step';
  constructor(readonly step: NewBookStep) {}
}

export class NewBookSubmitStep {
  static type = '[New Book] Submit Step';
  constructor(readonly step: NewBookStep) {}
}
