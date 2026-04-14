# Expo Video iOS PiP Return Repro

This project is a minimal reproduction app for an iOS Picture-in-Picture restore bug using `expo-video`.

## Bug Summary

When restoring a video from PiP back to full screen on iOS, the video returns to inline (default) mode instead of fullscreen. `expo-video` does not automatically re-enter fullscreen after a PiP restore.

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
2. Build and install a development client on a physical iOS device (simulator does not support PiP):
   - `npm run ios`

## Repro steps

1. Tap **▶ Play** — video starts and immediately enters fullscreen. Mode label reads `fullscreen`.
2. Background the app (swipe home) — PiP activates automatically. Mode label reads `pip`.
3. Tap the **restore** button in the PiP window.

## Expected behaviour

Mode returns to `fullscreen`.

## Actual behaviour

Mode returns to `default` — the video is alive but hidden off-screen with no way for the user to see it.

## Notes

- The `VideoView` is always mounted but rendered off-screen (`width: 0`, `height: 0`, `position: "absolute"`, far off-screen). Playback is started by a custom button which immediately calls `enterFullscreen()`. This matches the production pattern.
- The current mode is shown on screen in real time so the bug is immediately visible without needing logs.
- `app.json` includes the `expo-video` plugin with `supportsPictureInPicture: true` — required for PiP to work; cannot be tested in Expo Go.
- Root cause is a known limitation in `expo-video` — full control over PiP restore behaviour is not available at the library level. Worth monitoring the `expo-video` changelog for a fix.
