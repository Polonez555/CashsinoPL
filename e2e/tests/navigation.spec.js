const { test, expect } = require('@playwright/test');

test.describe('Navbar', () => {
  test('shows CashsinoPL brand', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.navbar-brand')).toHaveText('CashsinoPL');
  });

  test('navigates to Roulette page via navbar link', async ({ page }) => {
    await page.goto('/');
    await page.click('.navbar-links a[href="/roulette"]');
    await expect(page).toHaveURL('/roulette');
    await expect(page.locator('.roulette-title')).toBeVisible();
  });

  test('navigates back to Home via brand link', async ({ page }) => {
    await page.goto('/roulette');
    await page.click('.navbar-brand');
    await expect(page).toHaveURL('/');
    await expect(page.locator('.home-hero')).toBeVisible();
  });

  test('active link is highlighted on Home', async ({ page }) => {
    await page.goto('/');
    const homeLink = page.locator('.navbar-links a.active');
    await expect(homeLink).toHaveText('Home');
  });

  test('active link is highlighted on Roulette', async ({ page }) => {
    await page.goto('/roulette');
    const rouletteLink = page.locator('.navbar-links a.active');
    await expect(rouletteLink).toHaveText('Roulette');
  });
});
