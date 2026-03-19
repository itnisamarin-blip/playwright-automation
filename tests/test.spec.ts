import { test, expect } from '@playwright/test';

const URL = 'http://the-internet.herokuapp.com/login';

test.describe('The Internet Login Tests', () => {
  // 🔥 สำคัญ: รันทีละ test (แก้ race condition + parallel)
  test.describe.configure({ mode: 'serial' });

  test.setTimeout(60000);   // เพิ่มเป็น 60 วินาที สำหรับ CI

  test('Login Success', async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('#username', { state: 'visible', timeout: 10000 });

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');

    // รอ redirect + click พร้อมกัน
    await Promise.all([
      page.waitForURL('**/secure', { timeout: 20000 }),
      page.getByRole('button', { name: 'Login' }).click()
    ]);

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

  test('Login Failed - Password Incorrect', async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('#username', { state: 'visible', timeout: 10000 });

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    const flash = page.locator('#flash');
    await flash.waitFor({ state: 'visible', timeout: 10000 });
    await expect(flash).toContainText('Your password is invalid!');
  });

  test('Login Failed - Username Not Found', async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('#username', { state: 'visible', timeout: 10000 });

    await page.fill('#username', 'tomholland');
    await page.fill('#password', 'Password!');

    await page.getByRole('button', { name: 'Login' }).click();

    const flash = page.locator('#flash');
    await flash.waitFor({ state: 'visible', timeout: 10000 });
    await expect(flash).toContainText('Your username is invalid!');
  });
});