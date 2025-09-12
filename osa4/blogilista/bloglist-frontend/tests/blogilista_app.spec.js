const { test, beforeEach, describe, expect } = require('@playwright/test')
const { loginWith } = require('./helper')
const { createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3002/api/testing/reset')
    await request.post('http://localhost:3002/api/users', {
      data: {
        name: 'Perttu Saarsalmi',
        username: 'saarper',
        password: 'Blastbeat666',
      },
    })
    test.setTimeout(10000) // Asetetaan aikarajaksi 10 sekuntia
    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log into application')
    await expect(locator).toBeVisible()
    const usernameElement = page.getByLabel('username')
    const passwordElement = page.getByLabel('password')
    await expect(usernameElement).toBeVisible()
    await expect(passwordElement).toBeVisible()
  })
  describe('Login', () => {
    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, 'saarper', 'wrong')

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'saarper', 'Blastbeat666')

      await expect(page.getByText('Perttu Saarsalmi logged in')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'saarper', 'Blastbeat666')
    })

    test('a new blog can be created', async ({ page }) => {
      const createNewButton = page.getByRole('button', { name: 'create new' })
      await expect(createNewButton).toBeVisible()
      await createNewButton.click()
      await createBlog(page, 'Test title', 'Test Author', 'test.com')
      const submitElement = page.getByRole('button', { name: 'create' })
      await submitElement.click()
      await expect(
        page.getByText('a new blog Test title by Test Author added')
      ).toBeVisible()
      const blogLementOnList = page.getByText('Test title Test Author')
      expect(blogLementOnList).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
      const createNewButton = page.getByRole('button', { name: 'create new' })
      await createNewButton.click()
      await createBlog(page, 'Test title', 'Test Author', 'test.com')
      const submitElement = page.getByRole('button', { name: 'create' })
      await submitElement.click()
      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const likeButton = page.getByRole('button', { name: 'like' })
      await expect(likeButton).toBeVisible()
      const likesBefore = page.getByText('likes 0')
      await expect(likesBefore).toBeVisible()
      await likeButton.click()
      const likesAfter = page.getByText('likes 1')
      await expect(likesAfter).toBeVisible()
    })
    test('a blog can be deleted by the user who added it', async ({ page }) => {
      const createNewButton = page.getByRole('button', { name: 'create new' })
      await createNewButton.click()
      await createBlog(page, 'Test title', 'Test Author', 'test.com')
      const submitElement = page.getByRole('button', { name: 'create' })
      await submitElement.click()
      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()
      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe(
          'Remove blog "Test title" by Test Author?'
        )
        await dialog.accept()
      })
      await removeButton.click()
      await expect(page.getByText('Test title Test Author')).toHaveCount(0)
    })

    test('only the user who added the blog sees the remove button', async ({
      page,
      request,
    }) => {
      // Käyttäjä 1 luo blogin
      const createNewButton = page.getByRole('button', { name: 'create new' })
      await createNewButton.click()
      await createBlog(page, 'Test title', 'Test Author', 'test.com')
      const submitElement = page.getByRole('button', { name: 'create' })
      await submitElement.click()

      // Varmistetaan, että blogi on lisätty
      const blogElement = page.getByText('Test title Test Author')
      await expect(blogElement).toBeVisible()

      // Näytetään blogin tiedot
      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()

      // Varmistetaan, että poistonappi näkyy käyttäjälle 1
      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()

      // Kirjaudutaan ulos
      const logoutButton = page.getByRole('button', { name: 'logout' })
      await logoutButton.click()

      await request.post('http://localhost:3002/api/users', {
        data: {
          name: 'Käyttäjä2',
          username: 'kayttaja2',
          password: '12345',
        },
      })

      // Käyttäjä 2 kirjautuu sisään
      await page.getByLabel('username').fill('kayttaja2')
      await page.getByLabel('password').fill('12345')
      const loginButton = page.getByRole('button', { name: 'login' })
      await loginButton.click()

      // Näytetään blogin tiedot käyttäjälle 2
      const viewButtonUser2 = page.getByRole('button', { name: 'view' })
      await viewButtonUser2.click()

      // Varmistetaan, että poistonappi ei näy käyttäjälle 2
      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })
  })
})
