import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConnexionScreen from '@/app/(tabs)/explore.tsx';
import HomeScreen from '@/HomeScreen';

const Stack = createNativeStackNavigator();

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          navigation.replace('Home', { prenom: user.prenom });
        } else {
          navigation.replace('Connexion');
        }
      } catch (error) {
        navigation.replace('Connexion');
      }
    };
    checkUser();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ headerShown: true, title: 'Connexion' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true, title: 'Accueil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
