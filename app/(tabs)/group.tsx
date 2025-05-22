import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import data from '../../assets/data.json';

export default function GroupPage() {
    // On récupère les infos sur le groupe depuis le fichier data.json
    const groupeId = 1; // On récupère l'id du groupe cliqué par l'utilisateur sur la page des Groupes
    const groupe = data.groupes.find(g => g.id === groupeId);

    // On récupère les infos sur les membres du groupe
    const [membres, setMembres] = useState(
        data.associations_utilisateur_groupe
            .filter(assoc => assoc.id_groupe === groupeId)
            .map(assoc => data.utilisateurs.find(u => u.id === assoc.id_utilisateur))
            .filter(Boolean)
    );
    
    // On récupère les infos sur les dépenses associées au groupe
    const [depenses, setDepenses] = useState(
        data.depenses.filter(d => d.id_groupe === groupeId)
    ); 

    // Liste des utilisateurs non membres du groupe
    const utilisateursNonMembres = data.utilisateurs.filter(
        u => !membres.find(m => m?.id === u.id)
    );

    // Affichage de la liste des non membres
    const [showUserList, setShowUserList] = useState(false);

    // On paramètre les actions des boutons
    const handleAddUser = (id: number) => {
        const utilisateurAjoute = data.utilisateurs.find(u => u.id === id);
        if (!utilisateurAjoute) return;
        setMembres([...membres, utilisateurAjoute]);
        setShowUserList(false);
    };

    const handleDeleteUser = (id: number) => {
        setMembres(membres.filter(m => m?.id !== id));
    };

    const handleAddDepense = () => {
        const nouvelleDepense = {
            id: depenses.length + 1,
            titre: 'Nouvelle dépense',
            montant_attente: 100,
            montant_total: 100,
            date_entre: new Date().toISOString().slice(0, 10),
            montant_individuel: false,
            id_groupe: groupeId,
            id_utilisateur: membres[0]?.id || 1
        };
        setDepenses([...depenses, nouvelleDepense]);
    };

    const handleEditDepense = (id: number) => {
        setDepenses(depenses.map(d => 
            d.id === id ? { ...d, titre: d.titre + " (modifié)" } : d
        ));
    };

    const handleDeleteDepense = (id: number) => {
        setDepenses(depenses.filter(d => d.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>{groupe?.nom}</Text>

            {/* Gestion des membres du groupe */}
            <Text style={styles.title2}>Membres du groupe</Text>
            <FlatList
                data={membres}
                keyExtractor={(item) => item!.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.membre}>{item?.pseudo}</Text>
                        <TouchableOpacity onPress={() => handleDeleteUser(item!.id)}>
                            <Text style={styles.delete}>❌</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {/* Ajout d'un utilisateur au groupe */}            
            <TouchableOpacity style={styles.button} onPress={() => setShowUserList(!showUserList)}>
                <Text style={styles.buttonText}>Ajouter un utilisateur au groupe</Text>
            </TouchableOpacity>

            {showUserList && (
                utilisateursNonMembres.length === 0 ? (
                    <Text style={{ fontStyle: 'italic' }}>Tous les utilisateurs sont déjà membres.</Text>
                ) : (
                    utilisateursNonMembres.map(user => (
                        <TouchableOpacity
                            key={user.id}
                            style={styles.button}
                            onPress={() => handleAddUser(user.id)}
                        >
                            <Text style={styles.buttonText}>
                                {user.prenom} {user.nom} ({user.pseudo})
                            </Text>
                        </TouchableOpacity>
                    ))
                )
            )}

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
    container: { flex: 1, padding: 20 },
    title1: { color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
    title2: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    row: { color: 'white', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    membre: { color: 'white' },
    depenseTitre: { color: 'white', fontSize: 14, fontWeight: 'bold' },
    depenseAuteur: { fontSize: 12, color: 'gray' },
    actions: { flexDirection: 'row', gap: 10 },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center' },
    delete: { color: 'red', marginLeft: 10 },
    edit: { color: 'green', marginLeft: 10 },
});

