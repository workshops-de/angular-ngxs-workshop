import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[New Book] Select Step';
  constructor(readonly step: NewBookStep) {}
}
