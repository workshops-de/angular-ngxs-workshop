import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Book } from '../models/book';

export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[Books] Load All';
  }
}

export interface BooksStateModel {
  entities: Book[];
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class BooksState {
  @Selector()
  static entities(state: BooksStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BooksState], (state: BooksStateModel) => {
      return state.entities.find((entity) => entity.isbn === isbn);
    });
  }

  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BooksStateModel>, action: BooksActions.LoadAll) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      entities: [
        {
          id: '1001606140805',
          title: 'Java Web Scraping Handbook',
          subtitle: 'Learn advanced Web Scraping techniques',
          isbn: '1001606140805',
          abstract:
            'Web scraping or crawling is the art of fetching data from a third party website by downloading and parsing the HTML code to extract the data you want. It can be hard. From bad HTML code to heavy Javascript use and anti-bot techniques, it is often tricky. Lots of companies use it to obtain knowledge ...',
          author: 'Kevin Sahin',
          publisher: 'Leanpub',
          price: '$0.00',
          numPages: 115,
          cover: 'http://localhost:4730/covers/1001606140805.png',
        },
        {
          id: '9780071494618',
          title: 'Hacking Exposed Web 2.0',
          subtitle: 'Web 2.0 Security Secrets and Solutions',
          isbn: '9780071494618',
          abstract:
            'Protect your Web 2.0 architecture against the latest wave of cybercrime using expert tactics from Internet security professionals. Hacking Exposed Web 2.0 shows how hackers perform reconnaissance, choose their entry point, and attack Web 2.0 - based services, and reveals detailed countermeasures and...',
          author: 'Rich Cannings, Himanshu Dwivedi, Zane Lackey',
          publisher: 'McGraw-Hill',
          price: '$12.03',
          numPages: 258,
          cover: 'http://localhost:4730/covers/9780071494618.png',
        },
        {
          id: '9780071740647',
          title: 'Hacking Exposed Web Applications, 3rd Edition',
          subtitle: 'Web Applications Security Secrets and Solutions',
          isbn: '9780071740647',
          abstract:
            "Protect your Web applications from malicious attacks by mastering the weapons and thought processes of today's hacker. Written by recognized security practitioners and thought leaders, Hacking Exposed Web Applications, Third Edition is fully updated to cover new infiltration methods and countermeasu...",
          author: 'Joel Scambray, Vincent Liu, Caleb Sima',
          publisher: 'McGraw-Hill',
          price: '$9.50',
          numPages: 482,
          cover: 'http://localhost:4730/covers/9780071740647.png',
        },
      ],
    });
  }
}
