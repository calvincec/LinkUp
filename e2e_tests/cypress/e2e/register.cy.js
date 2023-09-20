describe('Register page', ()=>{
    beforeEach(() => {
        cy.visit('http://localhost:4200/register')
    })
    it ('should navigate to log in instead', ()=>{
        cy.get('.signinstead').click() 
        cy.url().should('eq', 'http://localhost:4200/')
    })
    it ('should retun an error if name is missing', ()=>{
        cy.get('#emaill').type('micahel@gmail.com')
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('Please your full names') 
        cy.wait(3000)
    }) 
    it ('should return an error if emailll is missing', ()=>{
        cy.get('#name').type('Michael Wainaina')
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('Please enter the email') 
        cy.wait(3000)
    })
    it ('should return error if password  is missing', ()=>{
        cy.get('#name').type('Michael Wainaina')
        cy.get('#emaill').type('micahel@gmail.com')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('Please enter your password') 
        cy.wait(3000)
    })
    it ('should return error if wrong emaill is input', ()=>{
        cy.get('#name').type('Michael Wainaina')
        cy.get('#emaill').type('micahel')
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('Kindly input a valid email') 
        cy.wait(3000) 
    })
    it ('should return error if name of less characters is input', ()=>{
        cy.get('#name').type('Mi')
        cy.get('#emaill').type('micahel@gmail.com')
        cy.get('#passwordl').type('12345678') 
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('"username" length must be at least 5 characters long') 
        cy.wait(3000)
    })
    it ('should successfully create an account', ()=>{
        cy.get('#name').type('Michael Wainaina')
        cy.get('#emaill').type('micahelu@gmail.com')  //ensure you replace this email at any running instance
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('User registered successfully') 
        cy.wait(4000)
        cy.url().should('eq', 'http://localhost:4200/')
        cy.wait(3000)
    })
    it ('should return an error if the emaill is already existing', ()=>{
        cy.get('#name').type('Michael Wainaina')
        cy.get('#emaill').type('micahel@gmail.com')
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
        cy.get('.alertMsg').contains('The email you have entered exists, log in instead?') 
        cy.wait(3000)
    })

})