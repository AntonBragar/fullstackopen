describe('Blogs app', function () {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tony Branco',
      username: 'booger',
      password: 'dragonage'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    const anotherUser = {
      name: 'Max Sobolev',
      username: 'sobolev',
      password: 'nicqwerty'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, anotherUser)

    cy.visit('')
  })

  it('front page can be opened', () => {
    cy.contains('log in to application')
    cy.contains('Login')
    cy.contains('username')
  })

  it('login form can be opened', () => {
    cy.contains('Login').click()
    cy.get('#username').type('booger')
    cy.get('#password').type('dragonage')
    cy.get('#login-button').click()
    cy.contains('Tony Branco logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in')
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Tony Branco logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'booger', password: 'dragonage' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.createBlog({ title: 'A new blog created by cypress', author: 'Test author', url: 'Test url' })
      cy.contains('A new blog created by cypress')
    })

    it('blog can be liked', function() {
      cy.createBlog({ title: 'A new blog created by cypress', author: 'Test author', url: 'Test url' })
      cy.contains('A new blog created by cypress')
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('likes 1')
    })

    it('blog can be deleted', function() {
      cy.createBlog({ title: 'A new blog created by cypress', author: 'Test author', url: 'Test url' })
      cy.contains('A new blog created by cypress')
      cy.get('#view').click()
      cy.get('#delete').click()
      cy.get('html').should('not.contain', 'A new blog created by cypress')
    })

    it('blog could not be deleted by another user', function() {
      cy.createBlog({ title: 'A new blog created by cypress', author: 'Test author', url: 'Test url' })
      cy.get('#logout').click()
      cy.login({ username: 'sobolev', password: 'nicqwerty' })
      cy.get('#view').click()
      cy.get('html').should('not.contain', 'delete')
    })
  })
  describe('Blogs sorted by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'booger', password: 'dragonage' })
      cy.createBlog({
        title: 'Post with 1 like',
        author: 'Booger',
        url: 'gustav.com'
      })
      cy.createBlog({
        title: 'Post with 3 likes',
        author: 'Odd',
        url: 'odd.com'
      })
      cy.createBlog({
        title: 'Post with 2 likes',
        author: 'Hassel',
        url: 'hassel.com'
      })

      cy.contains('Post with 1 like')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 1 like')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('1like')

      cy.contains('Post with 2 likes')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 2 likes')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('2likes')

      cy.contains('Post with 3 likes')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 3 likes')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('3likes')
    })

    it('check if blogs are sorted', function() {
      cy.get('@1like').contains('like').as('like1')
      cy.get('@2likes').contains('like').as('like2')
      cy.get('@3likes').contains('like').as('like3')

      cy.get('@like1').click()
      cy.wait(100)
      cy.get('@like2').click()
      cy.wait(100)
      cy.get('@like2').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)

      cy.get('div').then(blogs => {
        expect(blogs[0]).to.contain.text('Post with 3 likes')
        expect(blogs[1]).to.contain.text('Post with 2 likes')
        expect(blogs[2]).to.contain.text('Post with 1 like')
      })
    })
  })
})