import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import data from '../../assets/data.json';

export default function GroupPage() {
    // On récupère les infos sur le groupe depuis le fichier data.json
    const groupeId = 1; // On récupère l'id du groupe cliqué par l'utilisateur sur la page des Groupes
    const groupe = data.groupes.find(g => g.id === groupeId);

    // On récupère les infos sur les membres du groupe
    const membres = data.associations_utilisateur_groupe
        .filter(assoc => assoc.id_groupe === groupeId)
        .map(assoc => {
            return data.utilisateurs.find(u => u.id === assoc.id_utilisateur);
        })
        .filter(Boolean); // enlève les valeurs nulles
    
    // On récupère les infos sur les dépenses associées au groupe
    const depenses = data.depenses.filter(d => d.id_groupe === groupeId);    

    // On paramètre les actions des boutons
    const handleAddUser = () => console.log('Ajouter utilisateur');
    const handleDeleteUser = (id: number) => console.log('Supprimer utilisateur', id);
    const handleAddDepense = () => console.log('Ajouter dépense');
    const handleEditDepense = (id: number) => console.log('Modifier dépense', id);
    const handleDeleteDepense = (id: number) => console.log('Supprimer dépense', id);

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>{groupe.nom}</Text>

            {/* Gestion des membres du groupe */}
            <Text style={styles.title2}>Membres du groupe</Text>
            <FlatList
                data={membres}
                keyExtractor={(item) => item!.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text>{item.pseudo}</Text>
                        <TouchableOpacity onPress={() => handleDeleteUser(item!.id)}>
                            <Text style={styles.delete}>❌</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />    
            <TouchableOpacity style={styles.button} onPress={handleAddUser}>
                <Text style={styles.buttonText}>Ajouter un utilisateur</Text>
            </TouchableOpacity>

            {/* Gestion des dépenses du groupe */}
            <Text style={styles.title2}>Dépenses du groupe</Text>            
            <FlatList
                data={depenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {               
                    const utilisateur = data.utilisateurs.find(u => u.id === item.id_utilisateur);
                    return (
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.depenseTitre}>{item.titre} - {item.montant_total} €</Text>
                                <Text style={styles.depenseAuteur}>par {utilisateur?.pseudo ?? 'inconnu'}</Text>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => handleEditDepense(item.id)}>
                                    <Text style={styles.edit}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteDepense(item.id)}>
                                    <Text style={styles.delete}>❌</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddDepense}>
                <Text style={styles.buttonText}>Ajouter une dépense</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title1: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
    title2: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    depenseTitre: { fontSize: 14, fontWeight: 'bold' },
    depenseAuteur: { fontSize: 12, color: 'gray' },
    actions: { flexDirection: 'row', gap: 10 },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center' },
    delete: { color: 'red', marginLeft: 10 },
    edit: { color: 'green', marginLeft: 10 },
});

