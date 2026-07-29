import { expect, test } from '@playwright/test';

test.describe('public marketing experience', () => {
  test('renders the Chinese homepage and navigates to product', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/ScapeLeap/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('把设计灵感');

    await page.getByRole('link', { name: '查看产品' }).click();

    await expect(page).toHaveURL(/\/product$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders the English locale without external localization services', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Move from ideas');
    await expect(page.getByRole('link', { name: '中文' })).toHaveAttribute('href', '/');
  });

  test('keeps the sign-up entry usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/sign-up');

    await expect(page.getByRole('heading', { name: '开始构建更好的设计流程' })).toBeVisible();
    await expect(page.getByLabel('工作邮箱')).toBeVisible();
  });
});
