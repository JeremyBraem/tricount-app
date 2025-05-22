import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import data from '../.././data.json'; // 📌 Importation directe du fichier JSON contenant les utilisateurs

// Définition du type User pour mieux structurer les données utilisateur
type User = {
  username: string;
  password: string;
};

// 🌟 Composant principal de l'écran de connexion
const ConnexionScreen: React.FC = () => {
  // Déclaration des états pour stocker le pseudo et le mot de passe saisis par l'utilisateur
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 🏆 Fonction de gestion de la connexion
  const handleLogin = () => {
    // Recherche d'un utilisateur correspondant dans les données JSON
    const user = data.utilisateurs.find(
      (u: any) => u.pseudo === username && u.mdp === password
    );

    // Vérification des identifiants et affichage du message correspondant
    if (user) {
      Alert.alert('Succès', 'Connexion réussie !'); // ✅ Connexion validée
    } else {
      Alert.alert('Erreur', 'Identifiant ou mot de passe incorrect.'); // ❌ Échec de connexion
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CONNEXION</Text>

      {/* 🔑 Champ de saisie pour le pseudo */}
      <TextInput
        style={styles.input}
        placeholder="Votre pseudo"
        placeholderTextColor={'white'}
        value={username}
        onChangeText={setUsername}
      />

      {/* 🔒 Champ de saisie pour le mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={'white'}
        secureTextEntry // Masque le texte saisi pour plus de sécurité
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔘 Bouton de connexion */}
      <View style={{ width: '50%' }}>
        <Text style={styles.button} onPress={handleLogin}>
          Se connecter
        </Text>
      </View>
    </View>
  );
};

// 🎨 Styles pour l'interface utilisateur
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
  }
});

export default ConnexionScreen; //  Exportation du composant pour l'utiliser ailleurs dans l'application