describe('test login', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')

    cy.contains('Connexion').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/login')

        // Get an input, type into it
        cy.get('#username').type('test2@test.fr')

        cy.get('#password').type('testtest')

        cy.get('[data-cy="login-submit"]').click()

        cy.contains('Mon panier')
  })
})