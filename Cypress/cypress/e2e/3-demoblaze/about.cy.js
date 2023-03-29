context('About', () => {
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/index.html')
    })

    it('has an h1 on the page', () => {
        cy.get('h1').should('exist');
    })
})