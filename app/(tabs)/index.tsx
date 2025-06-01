import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <Animated.View style={[styles.innerContainer, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
        <LottieView
          source={require('../../assets/animations/brain.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sortify</Text>
        <Text style={styles.subtitle}>
          Visualize sorting algorithms like never before.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push('/visualizer')}
        >
          <Text style={styles.buttonText}>🧠 Open Visualizer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.codeButton]}
          activeOpacity={0.8}
          onPress={() => router.push('/code')}
        >
          <Text style={styles.buttonText}>💻 View Code Examples</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  lottie: {
    width: 160,
    height: 160,
    marginTop: 24,
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: '#00000066',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  codeButton: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
});
