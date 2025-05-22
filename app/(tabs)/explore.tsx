import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { UserContext } from '../../UserContext'; // ajuste le chemin si besoin

const localDataPath = FileSystem.documentDirectory + 'data.json';

export default function ConnexionScreen() {
  const [pseudo, setPseudo] = useState('');
  const [mdp, setMdp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleConnexion = async () => {
    if (!pseudo || !mdp) {
      Alert.alert('Erreur', 'Merci de remplir pseudo et mot de passe.');
      return;
    }

    setLoading(true);
    try {
      const fileContent = await FileSystem.readAsStringAsync(localDataPath);
      const data = JSON.parse(fileContent);

      const utilisateurTrouve = data.utilisateurs.find(
        (user: { pseudo: string; mdp: string; prenom: string }) =>
          user.pseudo.toLowerCase() === pseudo.toLowerCase() && user.mdp === mdp
      );

      if (utilisateurTrouve) {
        setUser({ prenom: utilisateurTrouve.prenom });
        Alert.alert('Succès', `Bienvenue ${utilisateurTrouve.prenom} !`);
        // Ici tu peux naviguer vers home, par exemple avec Expo Router :
        // router.push('/(tabs)/home');
      } else {
        Alert.alert('Erreur', 'Pseudo ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de lire les données utilisateur.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        placeholderTextColor="#ccc"
      />
      <Button title={loading ? 'Connexion...' : 'Se connecter'} onPress={handleConnexion} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
});
