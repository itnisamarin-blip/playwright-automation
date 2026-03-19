import { test, expect } from '@playwright/test';

test.describe('The Internet Login Tests', () => {

  test('Login Success', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');

    await page.getByRole('button', { name: 'Login' }).click();

    // ✅ รอให้ redirect ไปหน้า secure
    await expect(page).toHaveURL(/secure/);

    // ✅ ตรวจสอบข้อความ
    await expect(page.locator('#flash'))
      .toContainText('You logged into a secure area!');

    // logout
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('#flash'))
      .toContainText('You logged out of the secure area!');
  });


  test('Login Failed - Password Incorrect', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    // ✅ รอ element ก่อน assert
    await expect(page.locator('#flash')).toBeVisible();

    await expect(page.locator('#flash'))
      .toContainText('Your password is invalid!');
  });


  test('Login Failed - Username Not Found', async ({ page }) => {
    await page.goto('http://the-internet.herokuapp.com/login');

    await page.getByLabel('Username').fill('tomholland');
    await page.getByLabel('Password').fill('Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toBeVisible();

    await expect(page.locator('#flash'))
      .toContainText('Your username is invalid!');
  });

});