# 🐞 Debugging & Live Reload Guide

This guide explains how to run the **Native App** (iOS/Android) on a physical device or emulator while connecting to your Docker development server.

> **Why this matters:** You CANNOT just open `http://local-ip:8100` in a mobile browser to test native features. You MUST install the native app so it has access to device plugins.

## 📋 Prerequisites

To run the native apps, you need the following tools installed on your **Host Machine** (not inside Docker):

### General
- **Node.js** (LTS version)
- **Git**

### Android 🤖
- **Android Studio**: Full installation.
- **Android SDK**: Install via Android Studio.
- **Android Emulator**: Create a virtual device via Device Manager.
- **ADB**: Ensure `adb` is in your path (usually in `platform-tools`).
- **Physical Device**: Enable "Developer Options" and "USB Debugging".

### iOS 🍎 (macOS Only)
- **Xcode**: Install from App Store.
- **Xcode Command Line Tools**: `xcode-select --install`
- **CocoaPods**: `sudo gem install cocoapods`
- **Simulator**: Comes with Xcode.
- **Physical Device**: You need a free Apple Developer account to sign the app.

---

## 🚀 The "No Fluff" Workflow

### 1. Configure Your Host IP

The native app needs to know where your Docker container is running.

1.  Find your computer's local IP address (e.g., `192.168.1.100`).
2.  Create a local config file (this file is ignored by git):
    ```bash
    cd apps/mobile-app
    cp capacitor.env.sample.json capacitor.env.json
    ```
3.  Edit `capacitor.env.json` and replace `YOUR_LOCAL_IP_HERE` with your IP:
    ```json
    {
      "server": {
        "url": "http://192.168.1.100:8100",
        "cleartext": true
      }
    }
    ```

### 2. Sync Configuration

Apply this configuration to the native projects:

```bash
# From apps/mobile-app directory
# IMPORTANT: Create this directory first if it doesn't exist (common issue)
mkdir -p android/app/src/main/assets

npx cap sync
```

### 3. Run on Device/Emulator

Now run the app. It will install the native APK/IPA but load the web content from your Docker server.

**iOS (Mac only):**
```bash
npx cap open ios
# In Xcode: Select device -> Press Play
```

**Android:**
```bash
npx cap open android
# In Android Studio: Select device -> Press Run
```

### 4. Verify

1.  The app opens on your device.
2.  It should load the content from your Docker server.
3.  **Test Live Reload**: Change some text in `apps/mobile-app/src/app/tab1/tab1.page.html`. The app on your phone should update instantly!

---

## ⚠️ Important Notes

*   **Same Network**: Your phone/emulator must be on the same WiFi network as your computer.
*   **Android Emulator**: If using the standard Android emulator on the same machine, you can often use `http://10.0.2.2:8100` instead of your LAN IP.
*   **Reverting to Production**: To build a standalone app (offline capable) for the store, simply delete or rename `capacitor.env.json` and run `npx cap sync` again. This removes the live reload server setting.
