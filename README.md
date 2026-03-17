# Expo Video Android PiP Repro

This project is a minimal reproduction app for Android fullscreen + Picture-in-Picture behavior using `expo-video`.

## Versions aligned with member app

- `expo`: `^55.0.0`
- `react-native`: `0.83.2`
- `react`: `19.2.0`
- `expo-video`: `~55.0.10`
- `expo-dev-client`: `~55.0.16`
- Android target/compile SDK: `36`

## Run

1. Install dependencies:
   - `npm install`
2. Build and install a development client on Android (needed for native config/plugin changes):
   - `npm run android`
   - This runs `expo run:android` and installs to the connected USB device/emulator.
3. Repro steps in app:
   - Play video inline.
   - Tap **Enter Fullscreen**.
   - Background app (swipe home).
   - Observe PiP behavior and whether app process restarts when reopened.

## Notes

- `app.json` config includes:
  - `expo-video` plugin with `supportsPictureInPicture: true`
  - `expo-build-properties` with `compileSdkVersion: 36` and `targetSdkVersion: 36`
- `App.tsx` contains lifecycle and PiP/fullscreen logs prefixed with `[ReproApp]`.
