// As a user I want to see the heading of my app.
describe('As a user I want to see the heading of my app', () => {
  before(() => {
    cy.visit('/');
  });
  it('it should say Book Monkey', () => {
    cy.get('ws-main-navigation mat-toolbar').contains('BOOK MONKEY');
  });
});
