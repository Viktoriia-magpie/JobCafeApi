// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let adminKey = 'adminadmin'

Cypress.Commands.add('deletePositionById', (id) => {
    cy.request({
        method: 'DELETE',
        url: '/' + id,
        qs: { key: adminKey }
    }).then((response) => {
        console.log(response)
    })
})

Cypress.Commands.add('searchByParameter', (param, value) => {
    cy.request(`/?${param}=${value}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)
        expect(response.status).equal(200)
        for (let i = 0; i < resultsList.length; i++) {
            expect(resultsList[i][param]).contains(value)
        }
    })
})

Cypress.Commands.add('searchByCompany', (value) => {
    cy.request(`/?company=${value}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)
        expect(response.status).equal(200)
        for (let i = 0; i < resultsList.length; i++) {
            expect(resultsList[i].company.toLowerCase()).equal(value.toLowerCase())
        }
    })
})

Cypress.Commands.add('searchByDate', (value) => {
    cy.request(`/?date=${value}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)
        expect(response.status).equal(200)
        expect(resultsList).to.not.be.empty
        for (let i = 0; i < resultsList.length; i++) {
            expect(resultsList[i].date).to.match(new RegExp(`^${value}`))
            expect(resultsList[i].date).to.match(/^\d{4}-\d{2}-\d{2}$/)
        }
    })
})

Cypress.Commands.add('searchByDescription', (value) => {
    cy.request(`/?description=${value}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)
        expect(response.status).equal(200)
        expect(resultsList).to.not.be.empty
        for (let i = 0; i < resultsList.length; i++) {
            expect(resultsList[i].description).to.match(new RegExp(value, 'i'))
        }
    })
})

Cypress.Commands.add('searchByCombinationParametres', (param1, value1, param2, value2) => {
    cy.request(`/?${param1}=${value1}&${param2}=${value2}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)
        expect(response.status).equal(200)
        expect(resultsList).to.not.be.empty
        for (let i = 0; i < resultsList.length; i++) {
            expect(resultsList[i][param1].toLowerCase()).equal(value1.toLowerCase())
            expect(resultsList[i][param2].toLowerCase()).contains(value2.toLowerCase())
        }
    })
})

Cypress.Commands.add('paginationFunctionality', (param, value, pageNumber, pageSize) => {
    cy.request(`/?${param}=${value}&page=${pageNumber}&pageSize=${pageSize}`).then((response) => {
        let resultsList = response.body.content
        console.log(resultsList)    
        expect(response.body.pageable.pageNumber).equal(pageNumber)
        expect(response.body.pageable.pageSize).equal(pageSize)
        expect(resultsList.length).to.be.at.most(pageSize)
      })
})