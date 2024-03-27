// As a user I want to see the heading of my app.
describe('As a user I want to', () => {
  //   beforeEach(() => {});
  describe('see the heading of my app', () => {
    it('it should say Book Monkey', () => {
      cy.visit('/');
      cy.get('ws-main-navigation mat-toolbar').contains('BOOK MONKEY');
    });
  });

  describe('check if a book can be created', () => {
    it('create a book', () => {
      let countBefore = 0;
      cy.visit('/');
      cy.get('mat-card').as('books');
      cy.get('@books')
        .then(books => (countBefore = books.length))
        // navigate to create form
        .then(() => {
          //   click the create button
          cy.get('[routerlink="books/new"]').click();
          //   fill in the books formula
          const randomISBN = Math.floor(1000000000000 + Math.random() * 900000);
          cy.get('[formControlName="isbn"]').type(randomISBN + '');
          cy.get('[formControlName="title"]').type(randomISBN + '');
          cy.get('[formControlName="subtitle"]').type(randomISBN + '');
          cy.get('[formControlName="author"]').type(randomISBN + '');
          cy.get('[formControlName="abstract"]').type(randomISBN + '');
          cy.get('[formControlName="cover"]').type(randomISBN + '');
          cy.get('[formControlName="numPages"]').type('222');
          cy.get('[formControlName="isbn"]').clear();
          cy.get('mat-error').contains('ISBN is required');
          cy.get('button').should('be.disabled');
          cy.get('[formControlName="isbn"]').type(randomISBN + '');
          cy.get('button').should('be.enabled');
          cy.get('button').contains('Save').click();
          cy.get('[formControlName="price"]').type('22');
          cy.get('mat-error').should('not.exist');
          cy.get('[formControlName="price"]').trigger('blur');
          //   cy.get('button').contains('Submit').should('be.enabled');
          //   save the new book
          cy.get('button').contains('Submit').click();

          //   navigate back to the start page
          //   assert that one more book is in the list as before
          cy.get('@books').should('have.length', countBefore + 1);
        });
    });
  });
});
