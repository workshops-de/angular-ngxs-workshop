export enum NewBookStep {
  info = 'info',
  price = 'price'
}

export interface NewBookStateModel {
  step: NewBookStep;
}
