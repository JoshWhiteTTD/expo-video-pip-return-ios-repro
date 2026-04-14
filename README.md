# Expo Video iOS PiP Return Repro

This project is a minimal reproduction app for an iOS Picture-in-Picture restore bug using `expo-video`.

## Bug Summary

When restoring a video from PiP back to full screen on iOS, the video momentarily closes and reopens before resuming. This close/reopen flash is an intentional workaround — without it, restoring from PiP closes the video entirely with no recovery.

**iOS only** — not reproducible on Android.

## Versions aligned with member app

- `expo`: `^55.0.0`
- `react-native`: `0.83.2`
- `react`: `19.2.0`
- `expo-video`: `~55.0.10`
- `expo-dev-client`: `~55.0.16`

## Run

1. Install dependencies:
   - `npm install`
2. Build and install a development client on an iOS device:
   - `npm run ios`
   - This runs `expo run:ios` and installs to the connected device/simulator.
3. Repro steps in app:
   - Tap **▶ Play Video** — the video starts and immediately enters fullscreen.
   - Background the app (swipe home) — PiP activates automatically.
   - Tap the **restore** button in the PiP window to return to full screen.
   - Observe the video briefly closing and reopening before resuming.

## Expected behaviour

Video restores to full screen seamlessly without interruption.

## Actual behaviour

Video briefly closes (VideoView unmounts) and reopens (VideoView remounts) during the restore transition. It does recover to the same position.

## Notes

- The VideoView is always mounted but rendered off-screen (width/height 0, `position: "absolute"`, far off-screen). Playback is started by a custom button which immediately calls `enterFullscreen()`.
- `app.json` config includes the `expo-video` plugin with `supportsPictureInPicture: true`.
- `App.tsx` contains lifecycle and PiP/fullscreen logs prefixed with `[ReproApp]`.
- Root cause is a known limitation in `expo-video` — full control over PiP restore behaviour is not available at the library level. Worth monitoring the `expo-video` changelog for a fix.
