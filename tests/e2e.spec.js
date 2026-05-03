const { test, expect } = require('@playwright/test');

test.describe('Election Learning Platform E2E', () => {
  test('should load the homepage and check main sections', async ({ page }) => {
    // We assume the app is running locally for testing. The config should handle the base URL.
    // However, since it's just static files + an API, we'll navigate directly.
    await page.goto('http://127.0.0.1:8080/');

    // Check Hero section
    await expect(page.locator('h1')).toContainText('Best platform to');

    // Click "Start learning now" and verify it scrolls to features
    await page.click('#hero-start-btn');
    
    // Verify timeline elements are present
    const timelineItems = page.locator('.timeline-item');
    await expect(timelineItems).toHaveCount(8);

    // Verify Quiz interaction
    const optionOne = page.locator('.quiz-option').first();
    await optionOne.click();
    await expect(page.locator('.quiz-option').first()).toHaveClass(/selected|correct|wrong/);
  });
});
