import { test, expect } from '@playwright/test';

test.describe('The Internet Login Tests', () => {

  test('Login Success', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    // ✅ FIX: ใช้ selector ตรง
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');

    await page.click('button[type="submit"]');

    // ✅ รอ redirect
    await expect(page).toHaveURL(/secure/);

    await expect(page.locator('#flash'))
      .toContainText('You logged into a secure area!');

    await page.click('a[href="/logout"]');

    await expect(page.locator('#flash'))
      .toContainText('You logged out of the secure area!');
  });


  test('Login Failed - Password Incorrect', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'Password!');

    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toBeVisible();

    await expect(page.locator('#flash'))
      .toContainText('Your password is invalid!');
  });


  test('Login Failed - Username Not Found', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomholland');
    await page.fill('#password', 'Password!');

    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toBeVisible();

    await expect(page.locator('#flash'))
      .toContainText('Your username is invalid!');
  });

});