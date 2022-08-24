describe('tusks-ui-shared: TusksUiShared component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tusksuishared--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TusksUiShared!');
    });
});
