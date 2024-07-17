const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, 
  workers: process.env.CI ? 5 : 5, 
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: 'https://www.redmine.org',

    trace: 'on-first-retry',
    
    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
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
