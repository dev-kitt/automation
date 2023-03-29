export const basePage = {
    urlShouldContain(str){cy.url().should('conatin', str);},
    reload () {cy.reload();},
    wait () {cy.wait(2500);},
}

export const go = {
    toHomePage () {verify.visit('https://www.demoblaze.com/');},
}

export const alert = {
    textEqualsTo(str){
        basePage.wait();
        cy.on('window:alert', (message) => {
            expect(message).to.contain(str);
            // cypress clicks on OK by default on window alerts
        })
    },
}