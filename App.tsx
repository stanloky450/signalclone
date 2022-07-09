import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import AuthContextProvider from './contexts/AuthContext';
import Navigation from './navigation';

Amplify.configure({...config, Analytics:{disable: true}});

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);