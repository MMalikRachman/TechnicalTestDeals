import { test, expect } from '@playwright/test';

const testEmail = 'testerQA123@gmail.com';
const testPassword = 'tester123';
const wrongPassword = 'wrongpassword123';
const wrongEmail = 'testingaja@gmail.com';

test.describe('Login Tests', () => {
  test('successful login', async ({ page }) => {
    await page.goto('https://dealls.com/sign-in');
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(testEmail);
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(testPassword);
    await page.getByRole('img', { name: 'eye-invisible' }).locator('path').first().click();
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForTimeout(1000);
    //validate alert message is visible
    await expect(page.locator('.ant-message-notice-content')).toBeVisible();
    await expect(page.locator('.ant-message-notice-content')).toContainText('Sign in success');
    //validate that user photo button is visible after login 
    await expect(page.getByRole('button', { name: 'user photo' })).toBeVisible();
  });

  test('failed login with wrong password', async ({ page }) => {
    await page.goto('https://dealls.com/sign-in');
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(testEmail);
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(wrongPassword);
    await page.getByRole('img', { name: 'eye-invisible' }).locator('path').first().click();
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    
    //validate error message is visible
    await expect(page.locator('.ant-message-notice-content')).toBeVisible();
    await expect(page.locator('.ant-message-notice-content')).toContainText('Password WRONG');
  });
  test('failed login with wrong email', async ({ page }) => {
    await page.goto('https://dealls.com/sign-in');
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(wrongEmail);
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(wrongPassword);
    await page.getByRole('img', { name: 'eye-invisible' }).locator('path').first().click();
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    
    //validate error message is visible
    await expect(page.locator('.ant-message-notice-content')).toBeVisible();
    await expect(page.locator('.ant-message-notice-content')).toContainText('Email Not found');
  });
}); 