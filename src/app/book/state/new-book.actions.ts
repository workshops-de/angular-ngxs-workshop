import { NewBookStep } from './new-book.model';
import { Book } from '../models';

export class NewBookSelectStep {
  static type = '[New Book] Select Step';
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
