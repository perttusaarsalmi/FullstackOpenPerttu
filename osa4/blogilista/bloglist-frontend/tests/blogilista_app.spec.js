const { test, beforeEach, describe, expect } = require('@playwright/test')

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
})
