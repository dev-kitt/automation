/// <reference types="cypress" />

// Verify Rubicon Carbon Products WCAG Accessibility Compliance
describe('Rubicon Carbon Products ADA Compliance', () => {
    beforeEach(() => {
        cy.visit('https://made.llc').as('url')
        //cy.contains('Only necessary cookies').should('be.visible').click()
        //cy.setCookie('cookieConsent', 'analyticsCookies=false%3B')
        cy.injectAxe()
        cy.wait(3000)
    })

    it('should test the webpage accessability is WCAG conformant', () => {
        const axe = require('axe-core')

        // use the Axe library to check the URL for WCAG conformance.
        axe.run(url, {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa']
            }
        }, (err, results) => {
            if (err) {
                console.error(err)
            } else {
                console.log(results)
            }
        })
    })

    it('should test the webpage accessability using Google Lighthouse audit', () => {
        cy.lighthouse()
    })
})