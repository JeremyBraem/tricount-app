import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import data from '@/data.json';
import { Link } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

const utilisateurs = data.utilisateurs;
// const groupes = data.groupes;
const depenses = data.depenses;

const getUtilisateurById = (id: number) => {
  return utilisateurs.find(user => user.id === id);
};

const getDepensesParGroupe = (groupeId: number) => {
  return depenses.filter(depense => depense.id_groupe === groupeId);
};

type DepenseProps = {
  id: number
  titre: string,
  montant_total: number,
  montant_attente: number,
  date_entre: string,
  montant_individuel: boolean,
  id_groupe: number,
  id_utilisateur: number,
};

let idUser = 1
let idGroup = 1

const Depense = ({id, titre, montant_total, montant_attente, montant_individuel, date_entre, id_utilisateur}: DepenseProps) => (
  <Link href={`http://localhost:8081/groupes/${idGroup}/depenses/${id}`} style={styles.item}>
    <View style={styles.item}>
      <Text style={styles.title}>{titre}</Text>
      <Text style={styles.montant_total}>{montant_total}€</Text>
      {idUser === id_utilisateur ? (
        <Text style={styles.montant_attente}>Propriétaire</Text>
      ) : (
        <>
          {montant_individuel === false ? (
            <Text style={styles.montant_attente}>
              Vous devez : {montant_attente}€ à {getUtilisateurById(id_utilisateur)?.prenom}
            </Text>
          ) : (
            <Text style={styles.montant_attente}>Vous ne devez plus rien</Text>
          )}
        </>
      )}
      <Text style={styles.montant_individuel}>{montant_individuel}</Text>
      <Text style={styles.date_entre}>{date_entre}</Text>
    </View>
  </Link>
);

export default function Depenses() {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    loadInputValue();
  }, []);

  console.log()
  const loadInputValue = async () => {
    try {
      const savedValue = await AsyncStorage.getItem('userInput');
      if (savedValue !== null) {
        setInputValue(savedValue);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  return (
    <>
      {/* Afficher la valeur de l'input récupérée */}
      {inputValue ? (
        <View style={styles.inputDisplay}>
          <Text style={styles.inputLabel}>Valeur saisie :</Text>
          <Text style={styles.inputText}>{inputValue}</Text>
        </View>
      ) : null}
      
      <FlatList
        data={getDepensesParGroupe(1 as number)}
        renderItem={({item}) => 
        <Depense
          id={item.id}
          titre={item.titre}
          montant_total={item.montant_total} 
          montant_attente={item.montant_attente} 
          montant_individuel={item.montant_individuel}
          date_entre={item.date_entre}
          id_groupe={item.id_groupe}
          id_utilisateur={item.id_utilisateur}
        />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputDisplay: {
    backgroundColor: '#e8f4fd',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a1cedc',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  inputText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 32,
  },
  montant_total: {
    fontSize: 24,
  },
  montant_attente: {
    fontSize: 24,
  },
  montant_individuel: {
    fontSize: 24,
  },
  date_entre: {
    fontSize: 24,
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
  item: {
    backgroundColor: '#fcfcfc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
});