describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:8080/#/login')

    // Get an input, type into it
    cy.get('#username').type('test2@test.fr')

    cy.get('#password').type('testtest')

    cy.get('[data-cy="login-submit"]').click()

    cy.contains('Mon panier')
  })






      it('Clicks all "Consulter" buttons and checks for "Ajouter au panier" button', () => {
        cy.visit('http://localhost:8080/#/products');
    
        // Get the number of product buttons
        cy.get('button[data-cy="product-link"]').its('length').then(length => {
          for (let i = 0; i < length; i++) {
            // Get the current product button
            cy.get('button[data-cy="product-link"]').eq(i).click();
    
            // Wait for the page to stabilize and check for "Ajouter au panier" button
            cy.contains('button', 'Ajouter au panier', { timeout: 10000 }).should('exist');
    
            // Navigate back to the product list
            cy.go('back');
    
            // Wait for the page to load after going back
            cy.get('button[data-cy="product-link"]').should('have.length', length);
          }
        });
      });
    
  

      it('vérifiez la présence du champ de disponibilité du produit', () => {
        cy.visit('http://localhost:8080/#/products');
    
        // Get the number of product buttons
        cy.get('button[data-cy="product-link"]').its('length').then(length => {
          for (let i = 0; i < length; i++) {
            // Get the current product button
            cy.get('button[data-cy="product-link"]').eq(i).click();
    
            // Check for the presence of the stock information
            cy.get('p[data-cy="detail-product-stock"]')
            .should('exist')
            .and('be.visible')
            .and('contain', 'en stock');
    
            // Navigate back to the product list
            cy.go('back');
    
            // Wait for the page to load after going back
            cy.get('button[data-cy="product-link"]').should('have.length', length);
          }
        });
      });
    
})