import { StyleSheet } from 'react-native';

import data from '@/data.json';

// Accès aux données
const utilisateurs = data.utilisateurs;
const groupes = data.groupes;
const depenses = data.depenses;

const getUtilisateurById = (id: number) => {
  return utilisateurs.find(user => user.id === id);
};

const getDepensesParGroupe = (groupeId: number) => {
  return depenses.filter(depense => depense.id_groupe === groupeId);
};

const getGroupeByUrl = (groupeId: number) => {
  return groupes.find(groupe => groupe.id === groupeId)
}

// const route = useRoute();
// const { id } = route.params;

console.log(getDepensesParGroupe(1))
export default function Depenses() {
  return (
    <>
      
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
