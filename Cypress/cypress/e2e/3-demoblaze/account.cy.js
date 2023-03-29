/// <reference types="cypress" />

context('Account Creation', () => { // set this flag
  beforeEach(() => {
    // preserve the login across all tests
    cy.visit('/')
  })

  it('has a LogIn on the navigation menu', () => {
    cy.get('#navbarExample').contains('Log in').should('be.visible')
  })

  it('tests the app LogIn and LogOut', () => {
    // verify default log in
    cy.get('#navbarExample').contains('Log in').click()
    cy.get('#logInModal').should('be.visible')
    cy.get('#loginusername', { timeout: 10000 }).eq(0)
      .type('1234', { force: true })
    cy.get('#loginpassword').eq(0)
      .type('1234', { force: true })
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary', {timeout: 70000}).eq(0)
      .click({ force: true })

    // verify updated nav menu and logout
    cy.get('#navbarExample').contains('Log out').should('be.visible')
    cy.get('#navbarExample').contains('Welcome ' + '1234').should('be.visible')
    cy.get('#navbarExample').contains('Log out').click( {force: true} )
  })

  it('has a SignUp on the navigation menu', () => {
    cy.get('#navbarExample').contains('Sign up').should('be.visible')
  })

  it('tests the app SignUp and LogOut', () => {
    // generate random account string
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testacct = `testname${id}`

    // verify sign up
    cy.get('#navbarExample').contains('Sign up').click()
    cy.get('#signInModal').should('be.visible')
    cy.get('#sign-username', { timeout: 10000 }).eq(0)
      .type(testacct, { force: true })
    cy.get('#sign-password').eq(0)
      .type(testacct, { force: true })
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary', {timeout: 70000}).eq(0)
      .click({ force: true })

    // login with test account
    cy.get('#navbarExample').contains('Log in').click()
    cy.get('#logInModal').should('be.visible')
    cy.get('#loginusername', { timeout: 10000 }).eq(0)
      .type(testacct, { force: true })
    cy.get('#loginpassword').eq(0)
      .type(testacct, { force: true })
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary', {timeout: 70000}).eq(0)
      .click({ force: true })

    // verify updated nav menu and logout
    cy.get('#navbarExample').contains('Log out').should('be.visible')
    cy.get('#navbarExample').contains('Welcome ' + testacct).should('be.visible')
    cy.get('#navbarExample').contains('Log out').click( {force: true} )
  })

    it('the SignUp form can be closed from button', () => {
      cy.get('#navbarExample').contains('Sign up').click()
      cy.get('#signInModal').should('be.visible')
      cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary', {timeout: 70000}).eq(0)
        .click({ force: true })
      cy.xpath("//div[@id='signInModal']//button[contains(., '×')]").click()
      //cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click({ force: true })
    })

    // it('the SignUp form can be closed from X', () => {
    //   cy.get('#signin2', { timeout: 40000 }).click()
    //   cy.get('#signInModal > .modal-dialog > .modal-content').should('be.visible')
    //   cy.get('#signInModal > .modal-dialog > .modal-content > .modal-header > .close > span', { timeout: 4000 }).should('be.visible').click({ force: true })
    //   cy.get('#signInModal > .modal-dialog > .modal-content').should('not.be.visible')
    // })

})