import { test, expect } from '@playwright/test';
import { setupAuthenticatedUser, setupCleanDatabase } from './utils/test-helpers';

test('should not be public', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'Access Denied' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Development Environment' })).toBeVisible();
});

test('should load the admin dashboard', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);
    
    // Navigate to the page
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});

test('can upload ideas', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);

    // Navigate to the page
    await page.goto('/admin/ideas');
    await expect(page.getByRole('heading', { name: 'Manage Ideas' })).toBeVisible();
    await page.setInputFiles('input[type="file"]', 'tests/fixtures/productivity_ideas.json');
    await page.getByRole('button', { name: 'Import' }).click();
    await expect(page.getByText('Successfully imported 20 ideas')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'FocusFlow' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'A distraction blocker that' })).toBeVisible();
});

test('can view analytics', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);
    
    // Navigate to the page
    await page.goto('/admin/analytics');
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Total Visits (30 Days)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Visits' })).toBeVisible();
});

test('can view mailing list', async ({ page }) => {
  // Reset database before this test
    await setupCleanDatabase();
    
    // Login as test user
    await setupAuthenticatedUser(page);

    // Navigate to the page
    await page.goto('/admin/mailing-list');
    await expect(page.getByRole('heading', { name: 'Mailing List' })).toBeVisible();    
});
  