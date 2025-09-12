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
      await expect(page.getByText('a new blog Test title by Test Author added')).toBeVisible()
      const blogLementOnList = page.getByText('Test title Test Author')
      expect(blogLementOnList).toBeVisible()
    })
  })
})
