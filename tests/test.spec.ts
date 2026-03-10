import { test, expect } from '@playwright/test';

test.describe('Login Test', () => {

  test('Login success', async ({ page }) => {

    await page.goto('http://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    await page.click('a[href="/logout"]');

    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');

  });


  test('Login failed - Password incorrect', async ({ page }) => {

    await page.goto('http://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'Password!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');

  });


  test('Login failed - Username not found', async ({ page }) => {

    await page.goto('http://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomholland');
    await page.fill('#password', 'Password!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');

  });

});