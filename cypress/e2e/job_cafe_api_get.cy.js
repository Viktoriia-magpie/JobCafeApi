/// <reference types = "Cypress"/>
import {params} from '../fixtures/params.json'
import {pagination} from '../fixtures/params.json'

describe('Get jobs test', () => {

  it('Get all jobs', () => {
    cy.request('/').then((response) => {
      console.log(response),
        expect(response.status).equal(200),
        expect(response.statusText).equal("OK")
    })
  })

  it('Verify jobs result lists', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
        expect(response.body.content).not.empty
    })
  })

  it('Job listing has all the details', () => {
    cy.request('/').then((response) => {
      var result = response.body.content[1]
      console.log(result),
        expect(result).have.property('id'),
        expect(result.id).equal("65428d7c3f7d791f7b3e7b62"),

        expect(result).have.property('location'),
        expect(result.location).equal("New Guiseppe"),

        expect(result).have.property('position'),
        expect(result.position).equal("Global Web Designer"),

        expect(result).have.property('link'),
        expect(result.link).contain("http")
    })
  })


  it('Search by location', () => {   
    cy.searchByParameter('location', params.location)
  })

  it('Search by id', () => {
    cy.searchByParameter('id', params.id)
  })

  it('Search by the date', () => {
    cy.searchByDate('date', params.date)
  })

  it('Search by the company', () => {
    cy.searchByParameter('company', params.company)
  })

  it('Search by the description', () => {
    cy.searchByDescription('description', params.description)
  })

  it('Search by combination of params', () => {
    cy.searchByCombinationParametres('company', params.company, 'location', params.location)
  })

  it('Pagination functionality works correctly', () => {
    cy.paginationFunctionality('location', params.location, pagination.pageNumber, pagination.pageSize)
  })

})
