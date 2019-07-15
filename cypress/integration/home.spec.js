const BASE_URL = 'http://localhost:3000';

describe('/', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/topics', 'fx:topics.json');
    cy.visit(BASE_URL);
  });
  it('should have a heading', () => {
    cy.get('h1');
  });
});
