describe('Logging in page', ()=>{

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })
  describe('Bad login', () => {
    it('return error if password is missing', () => {
      
      cy.get('#emaill').type('calyndemo16@gmail.com')
      cy.get('.btn').click()
      cy.get('.alert').contains('Please enter your password')
      cy.wait(1000)
    })

    it('return error if email is missing', () => {
      cy.get('#passwordl').type('12345678')
      cy.get('.btn').click()
      cy.get('.alert').contains('Please enter the email')
      cy.wait(1000)
    })

    it('return error if wrong email is input', () => {
      
      cy.get('#emaill').type('calyndemo')
      cy.get('#passwordl').type('12345678')
      cy.get('.btn').click()
      cy.get('.alert').contains('Kindly input a valid email')
      cy.wait(1000)
    })

    it('return error if email not found', () => { 
      cy.get('#emaill').type('calyndemo@gmail.com')
      cy.get('#passwordl').type('12345678')
      cy.get('.btn').click()
      cy.get('.alert').contains('Invalid Credentials')
      cy.wait(1000)
    })

    it('return error if password is wrong', () => { 
      cy.get('#emaill').type('calyndemo@gmail.com')
      cy.get('#passwordl').type('1234578')
      cy.get('.btn').click()
      cy.get('.alert').contains('Invalid Credentials')
      cy.wait(1000)
    })
  })

  describe('Log in success',()=>{
    it('should log in successfully', ()=>{
      cy.get('#emaill').type('calyndemo16@gmail.com')
      cy.get('#passwordl').type('12345678')
      cy.get('.btn').click()
      cy.get('.alert').contains('Logged in')
      cy.wait(3000)
      cy.url().should('eq', 'http://localhost:4200/posts')
    })
  })

  describe('other Login page properties', ()=>{
    it ('should click the forgot password and proceed', ()=>{
      cy.get('.fpassword').click()
      cy.url().should('eq', 'http://localhost:4200/change')
      cy.wait(3000) 
    })

    it ('should click the sign up insted and proceed and proceed to sign up page', ()=>{
      cy.get('.signup').click()
      cy.url().should('eq', 'http://localhost:4200/register')
      cy.wait(2000)
    })
  })



})
