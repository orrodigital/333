import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { VideoPlayer } from '../components/VideoPlayer';
import { Loading } from '../components/Loading';
import { useStretchVideo } from '@/api/useUploadVideo';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function EditorScreen() {
  const router = useRouter();
  const { videoUri } = useLocalSearchParams<{ videoUri: string }>();
  const [xStretch, setXStretch] = useState(1.0);
  const [yStretch, setYStretch] = useState(1.0);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  const stretchMutation = useStretchVideo();

  useEffect(() => {
    if (!videoUri) {
      Alert.alert('Error', 'No video selected', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }, [videoUri, router]);

  const handleReset = () => {
    setXStretch(1.0);
    setYStretch(1.0);
  };

  const handlePreset = (preset: string) => {
    switch (preset) {
      case 'wide':
        setXStretch(2.0);
        setYStretch(1.0);
        break;
      case 'tall':
        setXStretch(1.0);
        setYStretch(2.0);
        break;
      case 'square':
        setXStretch(1.5);
        setYStretch(1.5);
        break;
      case 'compress':
        setXStretch(0.5);
        setYStretch(0.5);
        break;
      default:
        handleReset();
    }
  };

  const handleProcess = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'No video selected');
      return;
    }

    try {
      setIsProcessing(true);

      // For now, simulate processing since we need backend integration
      // In a real app, this would upload and process the video
      await new Promise(resolve => setTimeout(resolve, 3000));

      Alert.alert(
        'Success!',
        `Video processed with X: ${xStretch.toFixed(1)}x, Y: ${yStretch.toFixed(1)}x`,
        [
          {
            text: 'Process Another',
            onPress: () => router.back(),
          },
          {
            text: 'Done',
            onPress: () => router.replace('/'),
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process video');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <Loading 
        text={`Processing video...\nX: ${xStretch.toFixed(1)}x, Y: ${yStretch.toFixed(1)}x`} 
      />
    );
  }

  if (!videoUri) {
    return <Loading text="Loading editor..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Video Preview */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={[styles.videoContainer, {
            transform: [
              { scaleX: xStretch },
              { scaleY: yStretch },
            ],
          }]}>
            <VideoPlayer
              uri={videoUri}
              style={styles.video}
              shouldPlay={true}
              isMuted={true}
            />
          </View>
          <View style={styles.stretchInfo}>
            <Text style={styles.stretchText}>
              X: {xStretch.toFixed(1)}x | Y: {yStretch.toFixed(1)}x
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Stretch Controls</Text>
          
          {/* X-Axis Stretch */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>X-Axis (Horizontal)</Text>
              <Text style={styles.sliderValue}>{xStretch.toFixed(1)}x</Text>
            </View>
            <Slider
              style={styles.slider}
              value={xStretch}
              onValueChange={setXStretch}
              minimumValue={0.1}
              maximumValue={3.0}
              step={0.1}
              minimumTrackTintColor="#0079F2"
              maximumTrackTintColor="#d1d5db"
              thumbStyle={styles.thumb}
            />
          </View>

          {/* Y-Axis Stretch */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Y-Axis (Vertical)</Text>
              <Text style={styles.sliderValue}>{yStretch.toFixed(1)}x</Text>
            </View>
            <Slider
              style={styles.slider}
              value={yStretch}
              onValueChange={setYStretch}
              minimumValue={0.1}
              maximumValue={3.0}
              step={0.1}
              minimumTrackTintColor="#0079F2"
              maximumTrackTintColor="#d1d5db"
              thumbStyle={styles.thumb}
            />
          </View>

          {/* Presets */}
          <View style={styles.presetsContainer}>
            <Text style={styles.presetsTitle}>Quick Presets</Text>
            <View style={styles.presetsGrid}>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePreset('wide')}
              >
                <Text style={styles.presetText}>Wide</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePreset('tall')}
              >
                <Text style={styles.presetText}>Tall</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePreset('square')}
              >
                <Text style={styles.presetText}>Square</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePreset('compress')}
              >
                <Text style={styles.presetText}>Compress</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Ionicons name="refresh" size={20} color="#6c757d" />
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.processButton}
              onPress={handleProcess}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.processText}>Process Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  videoSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  videoContainer: {
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: SCREEN_WIDTH - 40,
    height: (SCREEN_WIDTH - 40) * 0.5625, // 16:9 aspect ratio
  },
  stretchInfo: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 12,
  },
  stretchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  controlsSection: {
    flex: 1,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0079F2',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    backgroundColor: '#0079F2',
    width: 20,
    height: 20,
  },
  presetsContainer: {
    marginBottom: 24,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  presetText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 20,
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    gap: 8,
  },
  resetText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
  processButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079F2',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  processText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});