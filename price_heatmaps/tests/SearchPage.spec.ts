import { test, expect } from '@playwright/test';

test.describe('Search page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/search?q=porto');
    });

    test('should display the search bar', async ({ page }) => {
        const searchBar = await page.locator('input[type="search"]');
        await expect(searchBar).toBeVisible();

        
    });

    // test('should display the map', async ({ page }) => {
    //     const map = await page.locator('div[class="map"]');
    //     await expect(map).toBeVisible();
    // });

    // test('should display the properties on the map', async ({ page }) => {
    //     const properties = await page.locator('div[class="map"] img');
    //     await expect(properties).toBeVisible();
    // });
});