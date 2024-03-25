export enum NewBookStep {
  info = 'info',
  price = 'price'
}

export interface NewBookModel {
  step: NewBookStep;
}
