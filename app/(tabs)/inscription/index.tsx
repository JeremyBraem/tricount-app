import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

// Import direct du JSON 
import dataJson from '@/data.json';

const localDataPath = FileSystem.documentDirectory + 'data.json';

// Fonction de copie du JSON dans le système de fichiers local
export const copyDataFileOnce = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(localDataPath);

    if (!fileInfo.exists) {
      // Écrire le JSON en string dans le fichier local
      await FileSystem.writeAsStringAsync(localDataPath, JSON.stringify(dataJson, null, 2));
      console.log('✅ Fichier data.json copié dans le stockage local.');
    } else {
      console.log('📄 Fichier déjà copié.');
    }
  } catch (err) {
    console.error('❌ Erreur lors de la copie du fichier :', err);
  }
};

const InscriptionScreen = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [mdp, setMdp] = useState('');

  useEffect(() => {
    copyDataFileOnce();
  }, []);

  const handleInscription = async () => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(localDataPath);
      const data = JSON.parse(fileContent);
  
      // Vérifier si le pseudo existe déjà
      const pseudoExiste = data.utilisateurs.some(
        (user: { pseudo: string }) => user.pseudo.toLowerCase() === pseudo.toLowerCase()
      );
  
      if (pseudoExiste) {
        Alert.alert('Erreur', 'Ce pseudo est déjà utilisé. Veuillez en choisir un autre.');
        return; // On stoppe l'inscription
      }
  
      const nouvelUtilisateur = {
        id: data.utilisateurs.length + 1,
        nom,
        prenom,
        pseudo,
        mdp,
      };
  
      data.utilisateurs.push(nouvelUtilisateur);
  
      await FileSystem.writeAsStringAsync(localDataPath, JSON.stringify(data, null, 2));
  
      Alert.alert('Succès', 'Utilisateur inscrit avec succès !');
      setNom('');
      setPrenom('');
      setPseudo('');
      setMdp('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Une erreur est survenue pendant l'inscription.");
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} />
      <TextInput style={styles.input} placeholder="Mot de passe" value={mdp} onChangeText={setMdp} secureTextEntry />
      <Button title="S'inscrire" onPress={handleInscription} />
    </View>
  );
};

export default InscriptionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
});