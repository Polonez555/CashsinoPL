const { test, expect } = require('@playwright/test');

test.describe('Roulette page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/roulette');
  });

  test('shows Roulette heading', async ({ page }) => {
    await expect(page.locator('.roulette-title')).toHaveText('Roulette');
  });

  test('shows placeholder section', async ({ page }) => {
    await expect(page.locator('.roulette-placeholder')).toBeVisible();
  });

  test('shows API endpoint note', async ({ page }) => {
    await expect(page.locator('.api-note')).toBeVisible();
    await expect(page.locator('.api-note code')).toContainText('/api/roulette/spin');
  });

  test('shows green API status dot', async ({ page }) => {
    await expect(page.locator('.api-dot')).toBeVisible();
  });
});

test.describe('Backend API health', () => {
  test('GET /api/health returns ok', async ({ request }) => {
    const res = await request.get('http://localhost:5000/api/health');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('CashsinoPL API');
  });

  test('POST /api/roulette/spin returns valid result', async ({ request }) => {
    const res = await request.post('http://localhost:5000/api/roulette/spin');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.result.number).toBeGreaterThanOrEqual(0);
    expect(body.result.number).toBeLessThanOrEqual(36);
    expect(['red', 'black', 'green']).toContain(body.result.color);
  });
});
