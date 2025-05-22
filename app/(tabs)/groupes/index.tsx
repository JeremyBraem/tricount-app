import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Import direct depuis la racine du json
import groupesData from '@/data.json';
  
// je viens de faire un commit pour le fichier data.json
interface Groupe {
  id: number;
  nom: string;
  depense_attente: number;
}

interface AssociationUtilisateurGroupe {
  id_utilisateur: number;
  id_groupe: number;
}
// l'utilisateur
// je vais chercher le token de l'utilisateur




const HomeScreen: React.FC = ({ navigation, route }: any) => {

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
  const fetchUserId = async () => {
    const id = await SecureStore.getItemAsync('token');
      setUserId(Number(id)); // à condition que le token soit un ID numérique
    };

    fetchUserId();
  }, []);

  // Initialiser l'état pour les groupes
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  //pour gerer le chargement
  const [loading, setLoading] = useState(true);
  //pour gerer les erreurs
  const [error, setError] = useState<string | null>(null);

  // on vas chercher les groupes
  useEffect(() => {
    try {
      // Récupérer les associations utilisateur-groupe
      const associations: AssociationUtilisateurGroupe[] = groupesData.associations_utilisateur_groupe;
      // Trouver les id_groupe associés à l'utilisateur courant
      const groupesIds = associations
        .filter(a => a.id_utilisateur === userId)
        .map(a => a.id_groupe);
      // Filtrer les groupes à afficher
      const groupesFiltres = groupesData.groupes.filter((g: Groupe) => groupesIds.includes(g.id));
      setGroupes(groupesFiltres);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  

  // Fonction pour gérer la sélection d'un groupe
  const handleGroupSelect = (groupId: number) => {
    navigation.navigate('GroupDetails', { groupId });
  };

  // Fonction pour créer un groupe
  const handleCreateGroup = () => {
    navigation.navigate('CreateGroup');
  };

  // Fonction pour supprimer un groupe
  const handleDeleteGroup = (groupId: number) => {
    /// petit msg de confirmation de supprimer 
    Alert.alert(
      'Supprimer le groupe',
      'Voulez-vous vraiment supprimer ce groupe ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: () => {
            setGroupes(prev => prev.filter(g => g.id !== groupId));  // cliquer sur supprimer lance la fonction
                                                                    // qui vient virer lex groupe
            
          },
        },
      ]
    );
  };


//au cas ou il a du chargement
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  // mon affichage
  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
    <Text style={styles.title}>Mes Groupes</Text>
    </View>

  {/* pour afficher la liste de groupe */}
  <FlatList
    data={groupes}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.groupItem}>
        <TouchableOpacity onPress={() => handleGroupSelect(item.id)}>
          <Text style={styles.groupName}>{item.nom}</Text>
          {/* chaque groupe de ma liste possed un bouton supprimer */}
        </TouchableOpacity>
        <Button 
          title="Supprimer"
          onPress={() => handleDeleteGroup(item.id)}
        />
      </View>
    )}
    />
  {/* le bouton qui vas gere la creation de groupe */}
  <Button title="Créer un groupe" onPress={handleCreateGroup} />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '500',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

// Exporter HomeScreen
export default HomeScreen;