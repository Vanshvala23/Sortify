// app/tabs/visualizer.tsx

import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const screenWidth = Dimensions.get('window').width;

const generateArray = (size = 20) => Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const sortingAlgorithms = [
  {
    name: 'Bubble Sort',
    key: 'bubble',
    image: require('../../assets/images/bubble.png'),
    description:
      'Bubble Sort repeatedly swaps adjacent elements if they are in wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Selection Sort',
    key: 'selection',
    image: require('../../assets/images/Selection.png'),
    description:
      'Selection Sort selects the minimum element from unsorted part and swaps it with the beginning.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Insertion Sort',
    key: 'insertion',
    image: require('../../assets/images/insertion.png'),
    description:
      'Insertion Sort builds the sorted array one element at a time by inserting elements into the correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
];

export default function Visualizer() {
  const [data, setData] = useState(generateArray());
  const [sorting, setSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState(sortingAlgorithms[0]);
  const [speed, setSpeed] = useState(200);
  const [activeIndices, setActiveIndices] = useState<number[]>([]); // to highlight bars

  const bg = useThemeColor({ light: '#fff', dark: '#000' }, 'background');
  const text = useThemeColor({}, 'text');
  const barColor = useThemeColor({}, 'tabIconSelected');

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const runSort = async () => {
    setSorting(true);
    let arr = [...data];

    switch (selectedAlgo.key) {
      case 'bubble':
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            setActiveIndices([j, j + 1]);
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              setData([...arr]);
              await sleep(speed);
            } else {
              await sleep(speed);
            }
          }
        }
        break;

      case 'selection':
        for (let i = 0; i < arr.length; i++) {
          let minIdx = i;
          for (let j = i + 1; j < arr.length; j++) {
            setActiveIndices([minIdx, j]);
            if (arr[j] < arr[minIdx]) {
              minIdx = j;
            }
            await sleep(speed);
          }
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          setData([...arr]);
          await sleep(speed);
        }
        break;

      case 'insertion':
        for (let i = 1; i < arr.length; i++) {
          let key = arr[i];
          let j = i - 1;
          setActiveIndices([i]);
          await sleep(speed);
          while (j >= 0 && arr[j] > key) {
            setActiveIndices([j, j + 1]);
            arr[j + 1] = arr[j];
            j = j - 1;
            setData([...arr]);
            await sleep(speed);
          }
          arr[j + 1] = key;
          setData([...arr]);
          await sleep(speed);
        }
        break;
    }

    setActiveIndices([]);
    setSorting(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: text }]}>🔁 Sorting Visualizer</Text>

      {/* Algorithm Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.algoList}>
        {sortingAlgorithms.map((algo) => (
          <TouchableOpacity
            key={algo.key}
            style={[
              styles.algoButton,
              { backgroundColor: selectedAlgo.key === algo.key ? '#4f46e5' : '#e5e7eb' },
            ]}
            onPress={() => !sorting && setSelectedAlgo(algo)}
            disabled={sorting}
          >
            <Text style={{ color: selectedAlgo.key === algo.key ? '#fff' : '#000' }}>{algo.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Algorithm Image */}
      <Image source={selectedAlgo.image} style={styles.referenceImage} resizeMode="contain" />

      {/* Algorithm Info */}
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: text }]}>{selectedAlgo.description}</Text>
        <Text style={[styles.infoText, { color: text }]}>
          Time Complexity: <Text style={styles.bold}>{selectedAlgo.timeComplexity}</Text>
        </Text>
        <Text style={[styles.infoText, { color: text }]}>
          Space Complexity: <Text style={styles.bold}>{selectedAlgo.spaceComplexity}</Text>
        </Text>
      </View>

      {/* Bars */}
      <View style={styles.barContainer}>
        {data.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <View
              key={idx}
              style={{
                height: val * 2,
                width: screenWidth / data.length - 4,
                backgroundColor: isActive ? '#ef4444' : barColor, // active bars in red
                marginHorizontal: 2,
                borderRadius: 4,
              }}
            />
          );
        })}
      </View>

      {/* Speed Control */}
      <View style={styles.speedControl}>
        <Text style={{ color: text, marginBottom: 6 }}>Animation Speed: {speed} ms</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={[styles.speedBtn, sorting && styles.disabledBtn]}
            onPress={() => setSpeed((prev) => Math.max(10, prev - 50))}
            disabled={sorting}
          >
            <Text style={styles.speedBtnText}>Faster</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.speedBtn, sorting && styles.disabledBtn]}
            onPress={() => setSpeed((prev) => Math.min(2000, prev + 50))}
            disabled={sorting}
          >
            <Text style={styles.speedBtnText}>Slower</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start Sorting Button */}
      <TouchableOpacity style={[styles.sortBtn, sorting && styles.disabledBtn]} onPress={runSort} disabled={sorting}>
        <Text style={styles.btnText}>Start Sorting</Text>
      </TouchableOpacity>

      {/* Regenerate Array Button */}
      <TouchableOpacity
        style={[styles.sortBtn, { backgroundColor: '#334155' }, sorting && styles.disabledBtn]}
        onPress={() => setData(generateArray())}
        disabled={sorting}
      >
        <Text style={styles.btnText}>Regenerate Array</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  algoList: { flexDirection: 'row', marginBottom: 16 },
  algoButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    elevation: 1,
  },
  referenceImage: { height: 100, width: '100%', marginBottom: 20 },
  infoBox: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: { fontSize: 14, marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 220,
    marginBottom: 20,
  },
  sortBtn: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  disabledBtn: { opacity: 0.6 },
  speedControl: { marginBottom: 20, alignItems: 'center' },
  speedBtn: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  speedBtnText: { color: '#fff', fontWeight: '600' },
});
