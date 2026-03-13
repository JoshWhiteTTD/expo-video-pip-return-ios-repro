# Expo Video Android PiP Repro

This project is a minimal reproduction app for Android fullscreen + Picture-in-Picture behavior using `expo-video`.

## Versions aligned with member app

- `expo`: `~52.0.26`
- `react-native`: `0.76.7`
- `react`: `18.3.1`
- `expo-video`: `~2.0.6`
- Android target/compile SDK: `35`

## Run

1. Install dependencies:
   - `npm install`
2. Build a development client (needed for native config/plugin changes):
   - `npm run android`
3. Repro steps in app:
   - Play video inline.
   - Tap **Enter Fullscreen**.
   - Background app (swipe home).
   - Observe PiP behavior and whether app process restarts when reopened.

## Notes

- `app.json` config includes:
  - `expo-video` plugin with `supportsPictureInPicture: true`
  - `expo-build-properties` with `compileSdkVersion: 35` and `targetSdkVersion: 35`
- `App.tsx` contains lifecycle and PiP/fullscreen logs prefixed with `[ReproApp]`.
