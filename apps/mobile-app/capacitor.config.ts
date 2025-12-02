import { CapacitorConfig } from '@capacitor/cli';

// Try to read local env file for live reload
let serverConfig = undefined;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const envPath = path.join(__dirname, 'capacitor.env.json');

if (fs.existsSync(envPath)) {
  try {
    const envData = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
    if (envData.server) {
      console.log('⚡️ Loading live reload config from capacitor.env.json:', envData.server.url);
      serverConfig = envData.server;
    }
  } catch (e) {
    console.warn('⚠️ Failed to parse capacitor.env.json');
  }
}

const config: CapacitorConfig = {
  appId: 'com.hackathon.fy25h2',
  appName: '@hackathon/mobile-app',
  webDir: 'www',
  server: serverConfig
};

export default config;
