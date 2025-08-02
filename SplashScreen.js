import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
