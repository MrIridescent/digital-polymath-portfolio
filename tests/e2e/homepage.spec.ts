import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main content', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Digital Polymath/);
    
    // Check main heading
    await expect(page.locator('h1')).toBeVisible();
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check featured projects section
    await expect(page.locator('[data-testid="featured-projects"]')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');
    
    // Click projects link
    await page.click('text=Projects');
    await expect(page).toHaveURL('/projects');
    
    // Verify projects page loaded
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile navigation
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Check content is properly displayed
    await expect(page.locator('h1')).toBeVisible();
  });
});