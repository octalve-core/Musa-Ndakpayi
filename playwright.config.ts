import {defineConfig} from '@playwright/test';

export default defineConfig({
 testDir:'./e2e',
 fullyParallel:false,
 retries:process.env.CI?1:0,
 workers:process.env.CI?2:undefined,
 reporter:'list',
 outputDir:'test-results',
 use:{
  baseURL:'http://127.0.0.1:3000',
  headless:true,
  trace:'retain-on-failure',
  screenshot:'only-on-failure'
 },
 webServer:{
  command:'pnpm start --hostname 127.0.0.1',
  url:'http://127.0.0.1:3000',
  reuseExistingServer:!process.env.CI,
  timeout:120000
 }
});
