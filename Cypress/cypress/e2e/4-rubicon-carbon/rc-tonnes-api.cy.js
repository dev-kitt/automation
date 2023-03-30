/// <reference types="cypress" />

// Verify Rubicon Carbon Products Page APIs
context('Network Requests', () => {   
    it('GET /api/settings', () => {
        cy.request('https://rubiconcarbon.com/api/settings/').as('settings')
        cy.get('@settings').should((response) => {
            expect(response).property('status').to.equal(200)
            expect(response).to.include.keys('headers', 'duration')
            expect(response.body).to.be.a('array')
        })
    });
  
    it('GET /api/baskets', () => {
        cy.request('https://rubiconcarbon.com/api/baskets/').as('baskets')
        // product basket
        cy.get('@baskets').should((response) => {
            expect(response).property('status').to.equal(200)
            expect(response).to.include.keys('headers', 'duration')
            expect(response.body).to.not.be.null
            expect(response.body).to.be.a('array')
            expect(response).property('body').to.have.property('length').eq(3)
            console.log(response.body)
        })
        // carbon removals  
        cy.get('@baskets').its("body").its('0')
         .should('contain', {
            name: 'Carbon Removals',
            description: 'Access to carbon removal solutions leveraging innovative technologies',
            creditTypeDescription: 'Permanent carbon capture through tech-based cutting-edge projects (e.g., direct air capture, biochar conversion)',
            region: 'Global',
            isActive: false,
          })
        // nature based  
        cy.get('@baskets').its("body").its('1')
          .should('contain', {
             name: 'Nature-Based Emissions Reductions',
             description: 'Emissions reduction through preservation and restoration of natural carbon sinks such as forests, peatlands, and mangroves',
             creditTypeDescription: 'Forestry and wilderness conservation',
             region: 'Global',
             isActive: true,
           }) 
        // carbon reductions    
        cy.get('@baskets').its("body").its('2')
           .should('contain', {
              name: 'Industrial Emissions Reductions',
              description: 'Industrial emissions reduction through technologies including landfill methane capture, clean chemicals switching, and reduction of fugitive GHGs',
              creditTypeDescription: 'Industrial emission reduction solutions (e.g., landfill methane capture, HFC reclamation)',
              region: 'Global',
              isActive: true,
            })       
    })

    it('POST /api/users/log-cookie-consent-event', () => {
        cy.request({
            method: 'POST', 
            url: 'https://rubiconcarbon.com/api/users/log-cookie-consent-event',
            failOnStatusCode: false,
            auth:
            {
                username: '1234', 
                password: '1234'
            },
            headers:
            {
                'Authorization': 'Basic dXNlckB1c2VyOnVzZXI=',
                'Content-Type': 'text/plain'
            }
        }).as('users')
        cy.get('@users').should((response) => {
            expect(response).property('status').to.equal(400)
            expect(response).to.include.keys('headers', 'duration')
            //expect(response.body).property('message').to.equal('Cannot GET /api/users/log-cookie-consent-event')
        })
    });
})

  