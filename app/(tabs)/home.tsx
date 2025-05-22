import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../../UserContext'; 

export default function HomeScreen() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {user ? `Bienvenue, ${user.prenom} !` : 'Bienvenue, invité !'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
