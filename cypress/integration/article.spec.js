const BASE_URL = 'http://localhost:3000/';

describe('/', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/topics', 'fx:topics.json').as('getTopics');
    cy.route('GET', '/api/articles/*', 'fx:article.json').as('getArticle');
    cy.route('GET', '/api/articles/*/comments', 'fx:comments.json').as('getComments');
    cy.route({
      method: 'POST', 
      url: '/api/articles/*/comments',
      response: 'fx:new_comment.json',
      delay: 750
    }).as('postComment');
    cy.route({
      method: 'DELETE',
      url: '/api/comments/*',
      status: 204,
      delay: 500,
      response: {}
    }).as('deleteComment');
    cy.route('GET', '/api/users/randomuser', 'fx:user.json').as('getRandomUser');
    cy.route('PATCH', '/api/comments/*', 'fx:vote.json').as('successfulUpvote');
    cy.visit(BASE_URL + 'mitch/1', {onBeforeLoad: () => sessionStorage.clear() });
  });
  it('should display a loading message until the article has been retrieved', () => {
    cy.get('[data-cy=loading]');
  });
  it('should display an error message on a bad response', () => {
    cy.get('[data-cy=loading]');
    cy.route('GET', '/api/articles/101', {}).as('getBadArticle');
    cy.visit(BASE_URL + 'mitch/101');
    cy.get('[data-cy=error-message]');
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
  it('should rescue the comment if the post fails', () => {
    cy.route({
      method: 'POST',
      url: '/api/articles/*/comments',
      status: 400,
      response: {},
      delay: 750
    }).as('postCommentFail');
    cy.get('[data-cy=comment-form-body]').type('The website is pretty good, though.');
    cy.get('[data-cy=comment-form-submit]').click();
    cy.get('[data-cy=comment-form-body]').should('not.contain', 'website');
    cy.wait('@postCommentFail');
    cy.get('[data-cy=comment-form-body]').should('contain', 'website');
    cy.get('[data-cy=comment-body]').should('not.contain', 'website');
  });
  it('should prevent posting another comment until the first one has resolved', () => {
    cy.get('[data-cy=comment-form-body]').type('This article is terrible! I would rather read lorem ipsum!');
    cy.get('[data-cy=comment-form-submit]').click();
    cy.get('[data-cy=comment-form-submit]').should('be.disabled');
    cy.wait('@postComment');
    cy.get('[data-cy=comment-form-body]').type('Some text...');
    cy.get('[data-cy=comment-form-submit]').should('not.be.disabled');
  });
  it('should allow deletion of comments authored by the logged-in user', () => {
    cy.get('[data-cy=comment]').first().get('[data-cy=del-button]').click();
    cy.get('[data-cy=comment-body]').should('have.length', 2);
  });
  it('should restore the comment on the page if the deletion fails', () => {
    cy.route({
      method: 'DELETE',
      url: '/api/comments/*',
      status: 500,
      delay: 500,
      response: {}
    }).as('deleteCommentFail');
    cy.get('[data-cy=comment]').first().get('[data-cy=del-button]').click();
    cy.get('[data-cy=comment-body]').should('have.length', 2);
    cy.wait('@deleteCommentFail');
    cy.get('[data-cy=comment-body]').should('have.length', 3);
  });
  it('should preserve user votes on page refresh', () => {
    cy.get('[data-cy=upvote]').first().click();
    cy.get('[data-cy=upvote]').first().should('be.disabled');
    cy.reload().get('[data-cy=upvote]').first().should('be.disabled');
  });
});
