/// <reference types="cypress" />

// Verify Rubicon Carbon Products UX/UI
describe('Rubicon Carbon Products Page', () => {
  beforeEach(() => {
    cy.visit('https://rubiconcarbon.com/products');
    cy.contains('Only necessary cookies').should('be.visible').click();
    cy.setCookie('cookieConsent', 'analyticsCookies=false%3B')
    cy.injectAxe();
    cy.wait(3000)
  });

  // it('should have the correct browser tab title', () => {
  //   cy.title().should('eq', 'Rubicon Carbon - Products');
  // });
  
  // it('should have the correct page titles', () => {
  //   cy.get('h1').first().should('contain', 'Rubicon Carbon Tonnes'); // main title
  //   cy.get('h1').last().should('contain', 'Rubicon Carbon Capital').should('be.visible'); // contact us title
  // });
  
  // it('should have the correct product categories', () => {
  //   // nature based
  //   cy.get('h2').should('contain', 'Nature-Based Emissions Reductions'); 
  //   // carbon reductions
  //   cy.get('h2').should('contain', 'Industrial Emissions Reductions');
  //   // carbon removals 
  //   cy.get('h2').should('contain', 'Carbon Removals'); 
  // });
  
  // it('should have the correct product images', () => {
  //   // nature based
  //   cy.xpath("//img[contains(@class,'MuiCardMedia-img')]").first()
  //       .should('have.attr', 'src')
  //       .should('contain','hazy-forest')
  //   // carbon reductions
  //   cy.xpath("//img[contains(@class,'MuiCardMedia-img')]").eq(1)
  //       .should('have.attr', 'src')
  //       .should('contain', 'metal-building')
  //   // carbon removals
  //   cy.xpath("//img[contains(@class,'MuiCardMedia-img')]").last()
  //       .should('have.attr', 'src')
  //       .should('contain','power-plant') 
  // });
  
  // it('should have the correct product descriptions', () => {
  //   // nature based  
  //   cy.get('p').should('contain', 'Emissions reduction through preservation and restoration of natural carbon sinks such as forests, peatlands, and mangroves'); 
  //   cy.get('p').should('contain', 'Forestry and wilderness conservation'); 
  //   // carbon reductions
  //   cy.get('p').should('contain', 'Industrial emissions reduction through technologies including landfill methane capture, clean chemicals switching, and reduction of fugitive GHGs')
  //   cy.get('p').should('contain', 'Industrial emission reduction solutions (e.g., landfill methane capture, HFC reclamation)'); 
  //   // carbon removals
  //   cy.get('p').should('contain', 'Access to carbon removal solutions leveraging innovative technologies'); 
  //   cy.get('p').should('contain', 'Permanent carbon capture through tech-based cutting-edge projects (e.g., direct air capture, biochar conversion)'); 
  // });
  
  // it('should have the correct sign in options', () => {
  //   // nature based
  //   cy.get('a').should('contain', 'Sign in to view'); 
  //   // carbon reductions
  //   cy.get('a').should('contain', 'Sign in to view');
  //   // carbon removals
  //   cy.get('p').should('contain', 'Coming soon');
  // });

  // it('should have the contact information', () => {
  //   // verify call to action
  //   cy.get('h2').last().should('contain', 'Project Development Financing');
  //   // verify paragraph keywords
  //   cy.xpath("//section[@aria-labelledby='rubicon-carbon-financing']//p").first()
  //         .should('contain', 'Rubicon Carbon');
  //   cy.xpath("//section[@aria-labelledby='rubicon-carbon-financing']//p").last()
  //         .should('contain', 'ecosystem partner'); 
  //   // verify contact button
  //   cy.xpath("//section[@aria-labelledby='rubicon-carbon-financing']//a")
  //         .should('contain', 'Contact us')
  //         .should('have.attr', 'href')
  //         .should('eq','https://share.hsforms.com/12JPmNFc3Td-kP9IM_YbTtgdy5xl');
  // });
});