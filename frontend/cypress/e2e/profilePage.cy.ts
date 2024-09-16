// https://on.cypress.io/api

describe('프로필 페이지 테스트', function () {
  beforeEach(function () {
    cy.reload();
    window.localStorage.setItem('accessToken', Cypress.env('accessToken'));

    cy.viewport(1920, 1080);
    cy.wait(1000);
    cy.visit('http://localhost:5173');
    cy.get('.profile').click();
    cy.get('.content > div:nth-child(2)').click();
    cy.url().should('include', '/profile', { timeout: 1000 });
  });

  it('프로필 페이지 접속', () => {
    cy.get('.profile').should('be.visible');
    cy.wait(1000);
  });

  it('구매목록 페이지 이동', () => {
    cy.wait(1000);
    cy.get('.list-item:last-child > ul >li:first-child ').click();
    cy.wait(1000);
    cy.url().should('include', '/purchase', { timeout: 1000 });
    cy.wait(1000);
    cy.contains('.empty', '해당 조건에 맞는 구매 상품이 없어요').should('be.visible');
  });

  it('판매목록 페이지 이동', () => {
    cy.wait(1000);
    cy.get('.list-item:last-child > ul >li:last-child ').click();
    cy.wait(1000);
    cy.url().should('include', '/sell', { timeout: 1000 });
    cy.wait(1000);
    cy.get('.item').should('have.length', 1);
  });

  it('판매목록 클릭시 상세 페이지로 이동', () => {
    cy.wait(1000);
    cy.get('.list-item:last-child > ul >li:last-child ').click();
    cy.wait(1000);
    cy.url().should('include', '/sell', { timeout: 1000 });
    cy.wait(1000);
    cy.get('.item:first-child').click();
    cy.url().should('include', '/product/', { timeout: 1000 });
  });
});
