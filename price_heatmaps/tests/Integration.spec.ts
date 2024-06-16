import { test, expect } from '@playwright/test';

test('SearchPage + Service + Map integration performance test for Porto', async ({ page }) => {
    const start = performance.now();

    // Navigate to the search page with a query
    await page.goto('http://localhost:3000/search?q=porto');

    // Verify the properties are displayed on the map
    const map = page.locator('[data-testid="data-map"]');
    await expect(map).toBeVisible();

    const end = performance.now();

    console.log(`Porto Test took ${end - start}ms`);
});

test('SearchPage + Service + Map integration performance test for Lisbon', async ({ page }) => {
    const start = performance.now();
    // Navigate to the search page with a query
    await page.goto('http://localhost:3000/search?q=lisboa');

    // Verify the properties are displayed on the map
    const map = page.locator('[data-testid="data-map"]');
    await expect(map).toBeVisible();

    const end = performance.now();

    console.log(`Lisbon Test took ${end - start}ms`);
});
