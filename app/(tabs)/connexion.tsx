import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';



export default function Index() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CONNEXION</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre pseudo"
        placeholderTextColor={'white'}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={'white'}
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={{ width: '50%' }}>
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            textAlign: 'center',
            paddingVertical: 10,
            borderRadius: 100,
            fontWeight: 'bold',
            fontSize: 18,
          }}
          onPress={() => {
            alert('Connexion en cours...');
          }}
        >
          Se connecter
        </Text>
      </View>
    </View>
  );
}


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
  }
});
