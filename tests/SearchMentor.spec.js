import { test, expect } from '@playwright/test';

// LoginData
const testEmail = 'testerQA123@gmail.com';
const testPassword = 'tester123';

// SearchData
const validMentorName = 'michael edrian';
const invalidMentorName = 'xyzabc123';

test.describe('Mentor Search', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://dealls.com/sign-in');
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(testEmail);
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(testPassword);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.getByRole('link', { name: 'Mentoring' }).click();
  });

  test('find mentor with valid name', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Cari berdasarkan nama,' });
    
    await searchBox.click();
    await searchBox.fill(validMentorName);
    await searchBox.press('Enter');
    
    // Verify search name is displayed correctly
    await expect(page.locator('.line-clamp-1.font-bold.text-neutral-100.text-sm.capitalize')).toContainText(validMentorName, { ignoreCase: true });
  });

  test('find mentor with invalid name', async ({ page }) => {
    const searchBox = page.getByRole('textbox', { name: 'Cari berdasarkan nama,' });
    
    await searchBox.click();
    await searchBox.fill(invalidMentorName);
    await page.waitForTimeout(2000);
    await searchBox.press('Enter');
    await page.waitForTimeout(2000);
    //verify error message is visible
    await expect(page.getByText('Tidak ada hasil pencarian ditemukanCoba cari kata kunci lain, sementara itu')).toBeVisible();
  });
});