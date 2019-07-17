const BASE_URL = 'http://localhost:3000/';

describe('/', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/topics', 'fx:topics.json').as('getTopics');
    cy.route('GET', '/api/articles', 'fx:articles.json').as('getArticles');
    //cy.route('GET', '/api/articles?sort_by=created_at', 'fx:articles.json').as('getArticles');
    cy.route('GET', '/api/articles?sort_by=comment_count', 'fx:articles_sort_by_comments.json').as('getArticlesSortByComments');
    cy.route('GET', '/api/articles?topic=mitch', 'fx:mitch.json').as('getMitch');
    cy.route('GET', '/api/articles/*', 'fx:article.json').as('getArticle');
    cy.visit(BASE_URL);
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
    cy.get('[data-cy=error]');
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
    cy.get('[data-cy=article-card]').then(arr => arr[0]).click({ force: true });
    cy.get('[data-cy=title]');
    cy.get('[data-cy=body]');
  });
  it('should have an input for changing the article sorting', () => {
    cy.get('[data-cy=sort-by]').select('Comments');
    cy.get('[data-cy=article-card]').then(articleCards => articleCards[0]).contains('pug');
  });
});
