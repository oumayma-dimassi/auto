/// <reference types="cypress" />

context('Network Requests', () => {

  // Manage HTTP requests in your app

  it('get orders without token', () => {
    cy.request({
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    })
      .should((response) => {
        expect(response.status).to.eq(403)
      })
  })


  let token;
  describe('Login API to get token for the next test', () => {
    it('Login API to get token for the next test', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: 'test2@test.fr',
          password: 'testtest'
        },
        failOnStatusCode: false
      }).then((response) => {
        token = response.body.token;
      })
    })
  })


  describe('Orders API Test with token', () => {
    it('should return 200 for authorized access', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          'Authorization': `Bearer ${token}`        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })



  describe('Product API Test', () => {
    it('should return product with name and price', () => {
      cy.request('http://localhost:8081/products/10')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('price')
        })
    })
  })




  describe('Login API Test', () => {
    it('should return 401 for invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: 'oumayma@gmail.com',
          password: '12345566'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })


  describe('Login API Test', () => {
    it('should return 200 for valid credentials', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: 'test2@test.fr',
          password: 'testtest'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        token = response.body.token;
      })
    })
  })




  describe('Add Order API Test', () => {
    
    it('should add a product and return 200 status', () => {

      cy.window().then((win) => {
        
        cy.request({
          method: 'POST',
          url: 'http://localhost:8081/orders/add',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: {
            product: 7,
            quantity: 1
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })

    })
  })


  
  describe('Add Order API Test', () => {
    it('should add a product not have stock and return 200', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          product: 3,
          quantity: 2
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })



  
  describe('Review API Test', () => {
    it('should add a review and return 200 status with correct data', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          title: "Great product",
          rating: 5,
          comment: "I loved it!"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('title', "Great product")
        expect(response.body).to.have.property('comment', "I loved it!")
        expect(response.body).to.have.property('rating', 5)
      })
    })
  })



})

