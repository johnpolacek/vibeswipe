import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';

test('should display preview for guests', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start Swiping' }).click();
  await expect(page.getByRole('heading', { name: 'Sign up to explore all ideas' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign up / Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in to vibecode.party' })).toBeVisible();
  await page.getByRole('button', { name: 'Close modal' }).click();
  await page.getByRole('button', { name: 'Preview Ideas' }).click();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').first().click();
  await page.waitForTimeout(500);
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').first().click();
  await page.waitForTimeout(500);
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').first().click();
  await expect(page.getByRole('heading', { name: 'We hope you enjoyed the' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign up to Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in to vibecode.party' })).toBeVisible();
});

test('should swipe through ideas for authenticated user', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);
    
    // Navigate to the page
    await page.goto('/');
    await page.getByRole('button', { name: 'Start Swiping' }).click();
    await expect(page.locator('#idea-carousel')).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'You\'ve seen all ideas!' })).toBeVisible();
    await page.getByRole('link', { name: 'View Matches' }).click();
    await expect(page.getByRole('heading', { name: 'Your Matches' }).locator('span')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your Matches' }).locator('span')).toBeVisible();
    await expect(page.getByText('MoodTunes')).toBeVisible();
    await expect(page.getByText('Focus Forest')).toBeVisible();
    await expect(page.getByText('PetMatch')).toBeVisible();
    await page.getByRole('button', { name: 'Copy PRD Prompt' }).first().click();
    await expect(page.getByText('PRD prompt copied!').nth(1)).toBeVisible();
});