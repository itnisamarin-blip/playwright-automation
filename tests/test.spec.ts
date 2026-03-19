import { test, expect } from '@playwright/test';

const URL = 'http://the-internet.herokuapp.com/login';

test.describe('The Internet Login Tests', () => {
  test.setTimeout(30000);  

  test('Login Success', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');

    await Promise.all([
      page.waitForURL('**/secure'),
      page.getByRole('button', { name: 'Login' }).click()
    ]);

    await expect(page.locator('#flash'))
      .toContainText('You logged into a secure area!');

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('#flash'))
      .toContainText('You logged out of the secure area!');
  });

  test('Login Failed - Password Incorrect', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    // 🔥 รอ element ชัด ๆ ก่อน
    const flash = page.locator('#flash');
    await flash.waitFor();

    await expect(flash)
      .toContainText('Your password is invalid!');
  });

  test('Login Failed - Username Not Found', async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', 'tomholland');
    await page.fill('#password', 'Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    const flash = page.locator('#flash');
    await flash.waitFor();

    await expect(flash)
      .toContainText('Your username is invalid!');
  });
});