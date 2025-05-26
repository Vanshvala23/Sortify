// app/tabs/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔢 Sortify</Text>
      <Text style={styles.subtitle}>Visualize sorting algorithms like never before.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/visualizer')}>
        <Text style={styles.buttonText}>🧠 Open Visualizer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.codeButton]} onPress={() => router.push('/code')}>
        <Text style={styles.buttonText}>💻 View Code Examples</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#4f46e5', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 24 },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  codeButton: { backgroundColor: '#22c55e' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
