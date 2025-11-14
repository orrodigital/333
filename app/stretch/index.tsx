import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/hooks/useAuth';
import { VideoPlayer } from '../components/VideoPlayer';
import { Loading } from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';

export default function StretchScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    }
  }, [user, router]);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'We need camera roll permissions to select videos.'
        );
        return false;
      }
    }
    return true;
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setLoading(true);

      if (Platform.OS === 'web') {
        // Use document picker for web
        const result = await DocumentPicker.getDocumentAsync({
          type: 'video/*',
          copyToCacheDirectory: true,
        });

        if (result.canceled || !result.assets?.[0]) {
          return;
        }

        setSelectedVideo(result.assets[0].uri);
      } else {
        // Use image picker for mobile
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: false,
          quality: 1,
        });

        if (result.canceled || !result.assets?.[0]) {
          return;
        }

        setSelectedVideo(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
      console.error('Video picker error:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setLoading(true);

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled || !result.assets?.[0]) {
        return;
      }

      setSelectedVideo(result.assets[0].uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to record video');
      console.error('Video recording error:', error);
    } finally {
      setLoading(false);
    }
  };

  const proceedToEditor = () => {
    if (!selectedVideo) {
      Alert.alert('Error', 'Please select a video first');
      return;
    }

    router.push({
      pathname: '/stretch/editor',
      params: { videoUri: selectedVideo },
    });
  };

  if (loading) {
    return <Loading text="Processing..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Video Preview */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Video Preview</Text>
          <View style={styles.videoContainer}>
            <VideoPlayer
              uri={selectedVideo || ''}
              style={styles.video}
              shouldPlay={!!selectedVideo}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Select Video</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={pickVideo}>
            <Ionicons name="folder-open" size={24} color="#0079F2" />
            <Text style={styles.actionText}>Choose from Library</Text>
            <Ionicons name="chevron-forward" size={20} color="#6c757d" />
          </TouchableOpacity>

          {Platform.OS !== 'web' && (
            <TouchableOpacity style={styles.actionButton} onPress={recordVideo}>
              <Ionicons name="videocam" size={24} color="#0079F2" />
              <Text style={styles.actionText}>Record New Video</Text>
              <Ionicons name="chevron-forward" size={20} color="#6c757d" />
            </TouchableOpacity>
          )}

          {selectedVideo && (
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={proceedToEditor}
            >
              <Text style={styles.proceedText}>Continue to Editor</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#0079F2" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Supported Formats</Text>
              <Text style={styles.infoText}>
                MP4, MOV, AVI, and most common video formats are supported
              </Text>
            </View>
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
    paddingVertical: 20,
  },
  videoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  videoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  video: {
    width: '100%',
    height: 200,
  },
  actionSection: {
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    marginLeft: 12,
    fontWeight: '500',
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079F2',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0079F2',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1565c0',
    lineHeight: 18,
  },
});