import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import data from '../../data.json'; // 📌 Importation directe du fichier JSON contenant les utilisateurs

type User = {
  username: string;
  password: string;
};

const ConnexionScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Stocke un token sécurisé au chargement du composant
  useEffect(() => {
    const storeToken = async () => {
      await SecureStore.setItemAsync('token', 'my-secret-token');
    };
    storeToken();
  }, []);

  const handleLogin = async () => {
    const user = data.utilisateurs.find(
      (u: any) => u.pseudo === username && u.mdp === password
    );

    if (user) {
      await SecureStore.setItemAsync('user', JSON.stringify(user)); // ✅ Enregistre les infos utilisateur sécurisées
      Alert.alert('Succès', 'Connexion réussie !');
    } else {
      Alert.alert('Erreur', 'Identifiant ou mot de passe incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CONNEXION</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Votre pseudo"
        placeholderTextColor="white"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ width: '50%' }}>
        <Text style={styles.button} onPress={handleLogin}>
          Se connecter
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 20,
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 32,
    padding: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConnexionScreen;
