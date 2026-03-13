import { useEffect, useRef, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [bootId] = useState(
    () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  );

  const videoRef = useRef<VideoView>(null);

  const player = useVideoPlayer(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    (p) => {
      p.loop = true;
      p.play();
    },
  );

  useEffect(() => {
    console.log("[ReproApp] JS mounted", { bootId });
    return () => {
      console.log("[ReproApp] JS unmounted", { bootId });
    };
  }, [bootId]);

  useEffect(() => {
    const sub = player.addListener("statusChange", ({ status, error }) => {
      if (status === "error" && error) {
        console.log("[ReproApp] Player error", error);
      } else {
        console.log("[ReproApp] Player status", status);
      }
    });
    return () => sub.remove();
  }, [player]);

  const handleFullscreen = () => {
    console.log("[ReproApp] enterFullscreen pressed");
    videoRef.current?.enterFullscreen();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Video Android PiP Repro</Text>
      <Text style={styles.subtitle}>bootId: {bootId}</Text>
      <Text style={styles.subtitle}>
        fullscreen: {String(isFullscreen)} | pip: {String(isPiP)}
      </Text>
      <View style={styles.videoWrap}>
        <VideoView
          ref={videoRef}
          player={player}
          style={styles.video}
          allowsFullscreen={true}
          allowsPictureInPicture={true}
          startsPictureInPictureAutomatically={true}
          nativeControls={true}
          onFullscreenEnter={() => {
            console.log("[ReproApp] onFullscreenEnter");
            setIsFullscreen(true);
          }}
          onFullscreenExit={() => {
            console.log("[ReproApp] onFullscreenExit");
            setIsFullscreen(false);
          }}
          onPictureInPictureStart={() => {
            console.log("[ReproApp] onPictureInPictureStart");
            setIsPiP(true);
          }}
          onPictureInPictureStop={() => {
            console.log("[ReproApp] onPictureInPictureStop");
            setIsPiP(false);
          }}
        />
      </View>
      <Button title="Enter Fullscreen" onPress={handleFullscreen} />
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
    paddingHorizontal: 16,
    gap: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: "#ccc",
  },
  videoWrap: {
    width: "100%",
    maxWidth: 600,
    aspectRatio: 16 / 9,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
