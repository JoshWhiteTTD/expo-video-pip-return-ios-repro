import { useRef, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [mode, setMode] = useState<"default" | "fullscreen" | "pip">("default");

  const videoRef = useRef<VideoView>(null);

  const player = useVideoPlayer(
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    (p) => {
      p.loop = true;
    },
  );

  const handlePlay = () => {
    player.play();
    videoRef.current?.enterFullscreen();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>iOS PiP Return Repro</Text>

      <Text style={styles.modeLabel}>mode: {mode}</Text>

      <Text style={styles.steps}>
        1. Tap Play — video enters fullscreen{"\n"}
        2. Background the app — PiP starts{"\n"}
        3. Tap restore in PiP{"\n"}
        {"\n"}
        Expected: fullscreen{"\n"}
        Actual: default (inline / hidden)
      </Text>

      {/* Hidden off-screen — video is only visible once fullscreen is entered */}
      <VideoView
        ref={videoRef}
        player={player}
        style={styles.vimeo}
        allowsPictureInPicture
        nativeControls
        onFullscreenEnter={() => setMode("fullscreen")}
        onFullscreenExit={() => setMode("default")}
        onPictureInPictureStart={() => setMode("pip")}
        onPictureInPictureStop={() => setMode("default")}
      />

      {mode === "default" && (
        <Pressable style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>▶ Play</Text>
        </Pressable>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  modeLabel: {
    color: "#4af",
    fontSize: 18,
    fontFamily: "monospace",
  },
  steps: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "left",
    alignSelf: "stretch",
  },
  vimeo: {
    width: 0,
    height: 0,
    left: -1000,
    top: -1000,
    position: "absolute",
    zIndex: -1,
    marginTop: -1000,
  },
  playButton: {
    backgroundColor: "#e50914",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
