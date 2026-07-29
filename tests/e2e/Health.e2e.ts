import { expect, test } from '@playwright/test';

test('health endpoint reports application readiness', async ({ request }) => {
  const response = await request.get('/api/health');

  expect(response.ok()).toBe(true);
  await expect(response.json()).resolves.toMatchObject({
    status: 'ok',
    database: 'connected',
  });
});
