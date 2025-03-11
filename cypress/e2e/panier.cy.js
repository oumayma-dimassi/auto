describe('panier', () => {
  it('passes', () => {


    cy.on('fail', (error, runnable) => {
      console.log('Test failed:', error.message);
      return false;
    });

    cy.visit('http://localhost:8080/')

    cy.contains('Connexion').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/login')

    // Get an input, type into it
    cy.get('#username').type('test2@test.fr')

    cy.get('#password').type('testtest')

    cy.get('[data-cy="login-submit"]').click()

    cy.get('[data-cy="product-home-link"]').first().click();

    // Add a 1-second delay
    cy.wait(1000);

    cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
      const stockNumber = parseInt(text.replace(' en stock', ''));
      cy.wrap(stockNumber).as('stock');

      cy.url().then(initialUrl => {
        cy.get('[data-cy="detail-product-add"]').should('be.visible').click();

        // Add a 1-second delay
        cy.wait(1000);


        cy.url().then(newUrl => {
          if (stockNumber < 0) {
            expect(newUrl).to.eq(initialUrl);
          } else {
            expect(newUrl).to.include('/cart');

          }
        });
      });
    });


    cy.go('back');

    // Add a 1-second delay
    cy.wait(1000);

    // Verify the stock has decremented
    cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
      const newStockNumber = parseInt(text.replace(' en stock', ''));
      cy.get('@stock').then((originalStock) => {
        expect(newStockNumber).to.equal(originalStock - 1);
      });
    });

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()  // Clear the existing content
      .type('-5', { force: true });  // Type the negative number


    cy.url().then(initialUrl => {
      cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
      cy.wait(500);
      cy.url().should('eq', initialUrl);
    });



    cy.get('[data-cy="detail-product-quantity"]')
      .clear()  // Clear the existing content
      .type('22', { force: true });  // Type the negative number





    cy.url().then(initial => {
      cy.get('[data-cy="detail-product-add"]').should('be.visible').click();
      cy.wait(500);
      cy.url().should('eq', initial);
    });





    cy.visit('http://localhost:8080/#/products/5')

    cy.window().then((win) => {
      const token = win.localStorage.getItem('user');
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        // Check if orderLines exists in the response body
        expect(response.body).to.have.property('orderLines')

        // Find a product with id 4
        const productWithId5 = response.body.orderLines.find(orderLine => orderLine.product.id === 5)
        expect(productWithId5).to.exist
        expect(response.status).to.eq(200)
      })
    })



  })
})

