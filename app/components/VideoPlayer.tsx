import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

interface VideoPlayerProps {
  uri: string;
  style?: any;
  shouldPlay?: boolean;
  isLooping?: boolean;
  isMuted?: boolean;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function VideoPlayer({
  uri,
  style,
  shouldPlay = false,
  isLooping = true,
  isMuted = true,
  onPlaybackStatusUpdate,
}: VideoPlayerProps) {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const handlePlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    setStatus(playbackStatus);
    onPlaybackStatusUpdate?.(playbackStatus);
  };

  if (!uri) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>No video selected</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Video
        source={{ uri }}
        style={styles.video}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={shouldPlay}
        isLooping={isLooping}
        isMuted={isMuted}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      {status && 'error' in status && status.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading video</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});