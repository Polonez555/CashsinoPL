const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows welcome heading', async ({ page }) => {
    await expect(page.locator('.home-hero h1')).toContainText('Welcome to');
    await expect(page.locator('.home-hero .brand')).toHaveText('CashsinoPL');
  });

  test('shows Games section', async ({ page }) => {
    await expect(page.locator('.section-title')).toHaveText('Games');
  });

  test('shows Roulette game card as available', async ({ page }) => {
    const card = page.locator('.game-card').first();
    await expect(card.locator('.game-card__title')).toHaveText('Roulette');
    await expect(card.locator('.game-card__btn')).toHaveText('Play Now');
  });

  test('Roulette Play Now button links to /roulette', async ({ page }) => {
    await page.click('.game-card__btn');
    await expect(page).toHaveURL('/roulette');
  });

  test('shows Coming Soon cards for unavailable games', async ({ page }) => {
    const badges = page.locator('.game-card__badge');
    await expect(badges).toHaveCount(2);
    await expect(badges.first()).toHaveText('Coming Soon');
  });
});
