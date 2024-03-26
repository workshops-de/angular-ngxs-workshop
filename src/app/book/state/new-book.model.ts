import { FormControlStatus } from '@angular/forms';

export enum NewBookStep {
  info = 'info',
  price = 'price'
}

export interface NewBookModel {
  step: NewBookStep;
  info: NewBookInfoStep;
}

export interface NewBookInfoStep {
  model: {
    title: string;
    subtitle: string;
    isbn: string;
    cover: string;
    abstract: string;
    numPages: number;
    author: string;
  };
  dirty: boolean;
  status: FormControlStatus;
  errors: {
    [key: string]: any;
  };
}