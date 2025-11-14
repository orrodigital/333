import React from 'react';
import { View, Text, Button } from 'react-native';

type Props = { children: React.ReactNode; onReset?: () => void };

export class ErrorBoundary extends React.Component<
  Props,
  { hasError: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="p-4">
          <Text>Something went wrong.</Text>
          <Button title="Reload" onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }
    return this.props.children;
  }
}