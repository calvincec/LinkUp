describe('Home page/ posts', ()=>{
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
        cy.get('#emaill').type('calyndemo16@gmail.com')
        cy.get('#passwordl').type('12345678')
        cy.get('.btn').click()
    })

    describe('check if home', ()=>{
        it ('be at home page ', ()=>{
            cy.get('.homeicontxt').should('have.css', 'color', 'rgb(255, 133, 27)')
            cy.get('.topnavp').contains('Posts') 
        })
    })

    it('ought to  add a post with words and a picture', ()=>{
        
        cy.get('.addposticontxt').click()
        cy.get('.postwords').type('Post with picture')
        cy.wait(1000)
        cy.get('.newpostimginput').attachFile('./pics/person.jpg') 
        cy.wait(4000)
        cy.get('.newpostform').submit()
        cy.wait(300)
    })

    it('ought to  add a post with only picture', ()=>{
        
        cy.get('.addposticontxt').click()
        cy.get('.newpostimginput').attachFile('./pics/person.jpg') 
        cy.wait(4000)
        cy.get('.newpostform').submit()
        cy.wait(300)
    })

    it('ought to  add a post with only words', ()=>{
        
        cy.get('.addposticontxt').click()
        cy.get('.postwords').type('initial post here')
        cy.get('.newpostform').submit()
        cy.wait(300)
    })



    it('should like the post', ()=>{
        cy.get('.addposticontxt').click()
        cy.get('.postwords').type('my post here')
        cy.get('.newpostform').submit()
        cy.wait(1000)
        cy.get('.likeicon').first().should('be.visible').should('have.css', 'fill',  'none')
        cy.get('.likeicon').first().click()
     
        cy.get('.likeicon').should('have.css', 'fill',  'rgb(255, 133, 27)')


    })

    it('should unlike the post', ()=>{
        cy.wait(2000)
        cy.get('.likeicon').first().should('be.visible').should('have.css', 'fill',  'rgb(255, 133, 27)')
        cy.get('.likeicon').first().click()
        cy.get('.likeicon').should('have.css', 'fill',  'none')
    })

    it('should delete a post', ()=>{
        cy.wait(2000)
        cy.get('.onepost').its('length').as('postcount');
        cy.get('.deletepost').first().click()
        cy.wait(1000)
        cy.contains('.onepost', 'initial post here').should('not.exist')
    })

    describe('contents of one post', ()=>{
        it ('should navigate to one post', ()=>{
            cy.get('.commenticon').first().click()
            cy.wait(1000)
            cy.url().should('eq', 'http://localhost:4200/onepost')            
        })
        beforeEach(() => {
            cy.get('.commenticon').first().click()
        })
        it('should comment the post in a success', ()=>{
            cy.get('.txtm').type('thats good man')
            cy.get('.cbtnm').click()
            cy.wait(2000) 
            cy.contains('.comments1', 'thats good man').should('exist')
        })

        it('should delete the comment commentend', ()=>{
            cy.get('.elypsis1').first().click()
            cy.contains('.comments1', 'thats good man').should('not.exist')
        })

        it('navigate back to posts (homepage)', ()=>{
            cy.get('.backpic').click()
            cy.url().should('eq', 'http://localhost:4200/posts') 
        })
    })

    it ('must enable one to log out', ()=>{
        cy.get('.logouticontxt').click()
        cy.url().should('eq', 'http://localhost:4200/')
    })
    
    describe('user account management', ()=>{
        beforeEach(()=>{
            cy.wait(4000)
            cy.get('.account').click()
        })
        it('should proceed to account settings', ()=>{
            cy.url().should('eq', 'http://localhost:4200/accountprofile')
        })
    })

})