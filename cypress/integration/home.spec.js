const BASE_URL = 'http://localhost:3000/';

describe('/', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/topics', 'fx:topics.json').as('getTopics');
    cy.route('GET', '/api/articles', 'fx:articles.json').as('getArticles');
    cy.route('GET', '/api/articles?sort_by=comment_count', 'fx:articles_sort_by_comments.json').as('getArticlesSortByComments');
    cy.route('GET', '/api/articles?sort_by=comment_count&order=asc', 'fx:articles_sort_by_comments_asc.json').as('getArticlesSortByCommentsAscending');
    cy.route('GET', '/api/articles?topic=mitch', 'fx:mitch.json').as('getMitch');
    cy.route('GET', '/api/articles/*', 'fx:article.json').as('getArticle');
    cy.route({
      method: 'PATCH', 
      url: '/api/articles/1', 
      response: 'fx:article.json',
      delay: 500
    }).as('voteOnArticle');
    cy.route({
      method: 'GET',
      url: '/api/articles/1001',
      status: 404,
      response: {}
    }).as('getNonExistentArticle');
    cy.route('GET', '/api/users/randomuser', 'fx:user.json').as('getRandomUser');
    cy.visit(BASE_URL, {onBeforeLoad: () => sessionStorage.clear() });
  });
  it('should have a heading', () => {
    cy.get('h1');
  });
  it('should have a footer', () => {
    cy.get('footer');
  });
  it('should have nav buttons that go to topic pages', () => {
    cy.get('[data-cy=topic-button]').then(arr => arr[0]).click();
    cy.url().should('equal', BASE_URL+'mitch');
    cy.get('[data-cy=article-card]').should('have.length', 9);
    cy.get('a').then(arr => arr[0]).click();
    cy.url().should('equal', BASE_URL);
  });
  it('should display a loading message until the articles are retrieved', () => {
    cy.get('[data-cy=loading]');
  });
  it('should display an error message on a bad response', () => {
    cy.get('[data-cy=loading]');
    cy.route('GET', '/api/articles?topic=trump', {}).as('getBadTopic');
    cy.visit(BASE_URL + 'trump');
    cy.get('[data-cy=error-message]');
  });
  it('should have article cards', () => {
    cy.get('[data-cy=article-card]').should('have.length', 10);
    cy.get('[data-cy=article-card] [data-cy=title]');
    cy.get('[data-cy=article-card] [data-cy=author]');
    cy.get('[data-cy=article-card] [data-cy=votes]');
    cy.get('[data-cy=article-card] [data-cy=comments]');
    cy.get('[data-cy=article-card] [data-cy=timestamp]');
  });
  it('should have article cards that link through to the article', () => {
    cy.wait(['@getTopics', '@getArticles']);
    cy.get('[data-cy=article-card] a').first().click({ force: true });
    cy.get('[data-cy=title]');
    cy.get('[data-cy=body]');
  });
  it('should have an input that changes the article sorting', () => {
    cy.get('[data-cy=sort-by]').select('Comments');
    cy.wait(['@getArticlesSortByComments']);
    cy.get('[data-cy=article-card]').first().contains('pug');
  });
  it('should have an input that changes the article sort order', () => {
    cy.get('[data-cy=sort-by]').select('Comments');
    cy.get('[data-cy=order]').select('Low to High');
    cy.wait('@getArticlesSortByCommentsAscending');
    cy.get('[data-cy=article-card]').first().contains('Sony');
  });
  it('should go to an error page on any non-existent path', () => {
    cy.visit(BASE_URL + 'mitch/1001');
    cy.url().should('equal', BASE_URL+'error');
    cy.get('[data-cy=error-message]');
  });
  it('should allow the user to vote once on each article', () => {
    cy.get('[data-cy=vote]');
    cy.get('[data-cy=votes]').first().contains(100);
    cy.get('[data-cy=upvote]').first().click();
    cy.get('[data-cy=votes]').first().contains(101);
    cy.get('[data-cy=upvote]').first().click({ force: true });
    cy.get('[data-cy=votes]').first().contains(101);
  });
  it('should undo the vote if the request fails', () => {
    cy.route({
      method: 'PATCH', 
      url: '/api/articles/1', 
      response: {},
      status: 400,
      delay: 500
    }).as('badVoteOnArticle');
    cy.get('[data-cy=vote]');
    cy.get('[data-cy=votes]').first().contains(100);
    cy.get('[data-cy=upvote]').first().click();
    cy.get('[data-cy=votes]').first().contains(101);
    cy.wait('@badVoteOnArticle');
    cy.get('[data-cy=votes]').first().contains(100);
  });
  it('should welcome the user', () => {
    cy.get('[data-cy=user-welcome]').contains('daffodil11');
  });
  it('should welcome the user as guest if the random user request fails', () => {
    cy.route({
      method: 'GET', 
      url: '/api/users/randomuser',
      response: {},
      status: 500,
      delay: 500
    }).as('getRandomUserFail');
    cy.visit(BASE_URL, {onBeforeLoad: () => sessionStorage.clear() });
    cy.reload(true);
    cy.wait('@getRandomUserFail');
    cy.get('[data-cy=user-welcome]').contains('guest');
  });
});
