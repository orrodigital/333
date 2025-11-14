import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold">Video Stretch</Text>
      <Text className="mt-4 text-center">Choose axis points and stretch your video.</Text>
      <Link href="/auth/login" asChild>
        <Button title="Login / Signup" onPress={() => {}} />
      </Link>
      <Link href="/stretch" asChild>
        <Button title="Open Editor" onPress={() => {}} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  signOutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#dc3545',
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  features: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  feature: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 12,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079F2',
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  userText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
  },
});