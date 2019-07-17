const BASE_URL = 'http://localhost:3000/';

describe('/', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/articles/*', 'fx:article.json').as('getArticle');
    cy.route('GET', '/api/articles/*/comments', 'fx:comments.json').as('getComments');
    cy.route('POST', '/api/articles/*/comments', 'fx:new_comment.json').as('postComment');
    cy.visit(BASE_URL + 'mitch/1');
  });
  it('should display a loading message until the article has been retrieved', () => {
    cy.get('[data-cy=loading]');
  });
  it('should display an error message on a bad response', () => {
    cy.get('[data-cy=loading]');
    cy.route('GET', '/api/articles/101', {}).as('getBadArticle');
    cy.visit(BASE_URL + 'mitch/101');
    cy.get('[data-cy=error]');
  });
  it('should display a title, author and body when the article has been retrieved', () => {
    cy.get('[data-cy=title]');
    cy.get('[data-cy=author]');
    cy.get('[data-cy=body]');
  });
  it('should display a loading message until the comments have been retrieved', () => {
    cy.get('[data-cy=loading-comments]');
  });
  it('should display the comments for the article when they have been retrieved', () => {
    cy.get('[data-cy=comment-body]').should('have.length', 3);
    cy.get('[data-cy=comment-author]').should('have.length', 3);
  });
  it('should have a form for posting comments', () => {
    cy.get('[data-cy=comment-form-body]').type('This article is terrible! I would rather read lorem ipsum!');
    cy.get('[data-cy=comment-form-submit]').click();
    cy.wait('@postComment');
    cy.get('[data-cy=comment-body]').should('have.length', 4);
  });
});
