import { Page, expect } from '@playwright/test';
import { clerk, clerkSetup } from '@clerk/testing/playwright';

/**
 * Login credentials for test user
 */
export const TEST_USER = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
  fullName: process.env.TEST_USER_FULL_NAME!,
  username: process.env.TEST_USER_USERNAME!,
  userId: process.env.TEST_USER_ID!
};

/**
 * Login a test user using Clerk authentication
 * @param page - Playwright page object
 */
export async function loginTestUser(page: Page): Promise<void> {
  
  // Mask password in logs
  const { email, password, fullName, username, userId } = TEST_USER;
  console.log('[loginTestUser] TEST_USER:', { email, password: password ? '***' : undefined, fullName, username, userId });

  // Navigate to an unprotected page that loads Clerk
  await page.goto('/');

  // Setup Clerk for testing
  console.log('[loginTestUser] Running clerkSetup...');
  await clerkSetup();
  console.log('[loginTestUser] clerkSetup complete');

  // Use Clerk's testing utilities to sign in
  console.log('[loginTestUser] Calling clerk.signIn...');
  try {
    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: TEST_USER.email,
        password: TEST_USER.password
      }
    });
    console.log('[loginTestUser] clerk.signIn succeeded');
  } catch (err) {
    console.error('[loginTestUser] clerk.signIn failed:', err);
    throw err;
  }

  // Navigate to the home page and verify we're logged in
  console.log('[loginTestUser] Navigating to home page...');
  await page.goto('/');
  try {
    await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible({timeout: 30000});
    console.log('[loginTestUser] User button is visible, login successful');
  } catch (err) {
    console.error('[loginTestUser] User button not visible after login:', err);
    throw err;
  }
}

/**
 * Helper function to fill in login credentials and wait for successful login
 */
export async function fillLoginCredentials(page: Page): Promise<void> {
  await page.getByRole('textbox', { name: 'Email address' }).fill(TEST_USER.email);
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_USER.password);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible({timeout: 30000});
}

/**
 * Logout the current user
 * @param page - Playwright page object
 */
export async function logoutUser(page: Page): Promise<void> {
  // Navigate to an unprotected page that loads Clerk
  await page.goto('/');
  
  await clerk.signOut({ page });
  await page.waitForTimeout(500);
} 