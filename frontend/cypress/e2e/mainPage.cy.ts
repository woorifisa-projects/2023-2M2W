// https://on.cypress.io/api

describe('메인페이지 및 상품 테스트', function () {
  beforeEach(function () {
    cy.reload();
    window.localStorage.setItem('accessToken', Cypress.env('accessToken'));

    cy.intercept('GET', 'http://localhost:8080/api/products/*').as('getProduct');
    cy.intercept('POST', 'http://localhost:8080/api/products/').as('postProduct');
    cy.intercept('PUT', 'http://localhost:8080/api/products/*').as('editProduct');
    cy.intercept('DELETE', 'http://localhost:8080/api/products/remove/*').as('deleteProduct');

    cy.viewport(1920, 1080);
    cy.visit('http://localhost:5173');
  });

  it('local storage 에 저장된 access token으로 로그인을 시도한다.', () => {
    cy.get('.profile').should('be.visible');
  });

  it('검색 테스트: 상품16을 검색했을 시 card 는 단 하나만 존재하며 제목은 상품 16게임이다', () => {
    cy.wait(1000);
    cy.get('input').type('상품16{enter}');
    cy.wait(1000);
    cy.get('.card').should('have.length', 1);
    cy.get('.card .title').should('have.text', '상품16게임');
  });

  it('카테고리 테스트: 뷰티/미용 카테고리를 클릭할시 상품은 2개만 존재해야한다.', () => {
    cy.wait(1000);
    cy.get('.category >ul>li:nth-child(2)>button').click();
    cy.wait('@getProduct');
    cy.wait(1000);
    cy.get('.card').should('have.length', 2);
  });

  it('상세페이지 이동 테스트: 상품 상세페이지로 이동', () => {
    cy.contains('.card > .detail > .title', '테스트용 상품').click();
    cy.wait('@getProduct');
    cy.wait(1000);
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.get('.product-detail').should('be.visible');
  });

  it('본인이 올린 상품과 타인이 올린 상품에 대한 상세 페이지 차이 테스트: 사용자 본인이 올린 상품일 경우 버튼의 개수는 3개 아닐 경우 2개 존재', () => {
    cy.contains('.card > .detail > .title', '테스트용 상품').click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.get('.wrap-btn >button').should('have.length', 3);

    cy.visit('/ ');
    cy.contains('.card > .detail > .title', 'wow').click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.get('.wrap-btn >button').should('have.length', 2);
  });

  it('상품 등록 및 삭제테스트', () => {
    const title = '테스트용 상품입니다.';

    cy.get('.add-button > button ').click();
    cy.url().should('include', '/product/add', { timeout: 1000 });

    cy.get('.title-price > div:first-child > input').type(title);
    cy.get('.title-price > div:last-child > input ').type('10000');
    cy.get('.explain > textarea').type('테스트용 상품입니다. 상품 등록 및 삭제 테스트 중입니다');
    cy.get('.category > select').select('BEAUTY');

    cy.get('.submit-btn:first').click();
    cy.wait('@postProduct');
    cy.wait('@getProduct');
    cy.wait(1000);
    cy.contains('.card > .detail > .title', title).click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.wait('@getProduct');

    cy.get('.wrap-btn > button:nth-child(2)').click();
    cy.wait(1000);
    cy.get('.yes-btn').click();

    cy.wait('@deleteProduct');

    cy.get('.card > .detail > .title').each((v) => {
      cy.wrap(v).should('not.contain', title);
    });
  });

  it('상품 수정 테스트 및 삭제 테스트', () => {
    const title = '테스트용 상품입니다.';
    const editTitle = '상품 수정 테스트 중인 상품입니다.';
    cy.get('.add-button > button ').click();
    cy.url().should('include', '/product/add', { timeout: 1000 });

    cy.get('.title-price > div:first-child > input').type(title);
    cy.get('.title-price > div:last-child > input ').type('10000');
    cy.get('.explain > textarea').type('테스트용 상품입니다. 상품 등록 및 삭제 테스트 중입니다');
    cy.get('.category > select').select('BEAUTY');

    cy.get('.submit-btn:first').click();
    cy.wait('@postProduct');
    cy.wait('@getProduct');
    cy.wait(1000);
    cy.contains('.card > .detail > .title', title).click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.wait('@getProduct');
    // 수정 버튼 클릭
    cy.get('.wrap-btn > button:nth-child(1)').click();
    cy.wait(1000);
    cy.wait('@getProduct');

    cy.get('.title-price > div:first-child > input').clear().type(editTitle);
    cy.get('.submit-btn:first').click();
    cy.wait(1000);
    // 수정된거 확인하기
    cy.contains('.card > .detail > .title', editTitle).click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.wait('@getProduct');

    cy.get('.wrap-btn > button:nth-child(2)').click();
    cy.wait(1000);
    cy.get('.yes-btn').click();

    cy.wait('@deleteProduct');

    cy.get('.card > .detail > .title').each((v) => {
      cy.wrap(v).should('not.contain', editTitle);
    });
  });

  it('신고 테스트', () => {
    const detail = '신고 테스트 중입니다';
    cy.contains('.card > .detail > .title', 'wow').click();
    cy.url().should('include', '/product/', { timeout: 1000 });
    cy.get('.wrap-btn > button:first-child').click();
    cy.url().should('include', '/report/', { timeout: 1000 });
    cy.get('.report-category > div > label:first-child > input').click();
    cy.get('textarea').type(detail);
    cy.on('window:alert', (message) => {
      expect(message).to.equal('신고가 접수되었습니다.');
    });
    cy.get('.submit-btn').click();
    cy.wait(1000);
  });

  it('프로필 페이지로 이동테스트', () => {
    cy.wait(1000);
    cy.get('.profile').click();
    cy.get('.content > div:nth-child(2)').click();
    cy.url().should('include', '/profile', { timeout: 1000 });
  });
});
