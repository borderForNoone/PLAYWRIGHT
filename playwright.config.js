const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalTimeout: 60 * 60 * 1000,
  timeout: 2 * 60 * 1000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, 
  workers: process.env.CI ? 3 : 3, 
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: 'https://www.redmine.org',
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
    video: process.env.CI ? 'retain-on-failure' : 'on',
    trace: process.env.CI ? 'retain-on-failure' : 'on',
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
    },
  ],
});
