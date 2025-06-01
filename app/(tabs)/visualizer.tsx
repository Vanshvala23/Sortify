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
    description: 'Bubble Sort repeatedly swaps adjacent elements if they are in wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Selection Sort',
    key: 'selection',
    image: require('../../assets/images/Selection.png'),
    description: 'Selection Sort selects the minimum element from unsorted part and swaps it with the beginning.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Insertion Sort',
    key: 'insertion',
    image: require('../../assets/images/insertion.png'),
    description: 'Insertion Sort builds the sorted array one element at a time by inserting elements into the correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Merge Sort',
    key: 'merge',
    image: require('../../assets/images/merge.png'),
    description: 'Merge Sort divides the array into halves, sorts them, and then merges them back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Quick Sort',
    key: 'quick',
    image: require('../../assets/images/quick.png'),
    description: 'Quick Sort picks a pivot and partitions the array around the pivot, then recursively sorts the partitions.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
  },
  {
    name: 'Heap Sort',
    key: 'heap',
    image: require('../../assets/images/heap.png'),
    description: 'Heap Sort builds a max heap from the array and repeatedly extracts the maximum element to build the sorted array.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
  },
];

export default function Visualizer() {
  const [data, setData] = useState(generateArray());
  const [sorting, setSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState(sortingAlgorithms[0]);
  const [speed, setSpeed] = useState(200);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const bg = useThemeColor({ light: '#fff', dark: '#000' }, 'background');
  const text = useThemeColor({}, 'text');
  const barColor = useThemeColor({}, 'tabIconSelected');

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const mergeSort = async (arr: number[], l: number, r: number): Promise<number[]> => {
    if (l >= r) return [arr[l]];

    const mid = Math.floor((l + r) / 2);
    const left = await mergeSort(arr, l, mid);
    const right = await mergeSort(arr, mid + 1, r);

    return await merge(left, right);
  };

  const merge = async (left: number[], right: number[]): Promise<number[]> => {
    const merged: number[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      const idxL = data.indexOf(left[i]);
      const idxR = data.indexOf(right[j]);
      setActiveIndices([idxL, idxR]);
      await sleep(speed);

      if (left[i] <= right[j]) {
        merged.push(left[i++]);
      } else {
        merged.push(right[j++]);
      }
    }

    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);

    const start = data.indexOf(left[0]);
    const updated = [...data];
    for (let k = 0; k < merged.length; k++) {
      updated[start + k] = merged[k];
    }

    setData([...updated]);
    await sleep(speed);

    return merged;
  };
  const quickSort = async (arr: number[], low: number, high: number): Promise<number[]> => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    return arr;
  }
  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      const idxL = data.indexOf(arr[i]);
      const idxR = data.indexOf(arr[j]);
      setActiveIndices([idxL, idxR]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setData([...arr]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setData([...arr]);
    await sleep(speed);

    return i + 1;
  }

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
            }
            await sleep(speed);
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
          while (j >= 0 && arr[j] > key) {
            setActiveIndices([j, j + 1]);
            arr[j + 1] = arr[j];
            j--;
            setData([...arr]);
            await sleep(speed);
          }
          arr[j + 1] = key;
          setData([...arr]);
          await sleep(speed);
        }
        break;

      case 'merge':
        await mergeSort(arr, 0, arr.length - 1);
        break;
        
      case 'quick':
        await quickSort(arr, 0, arr.length - 1);
        alert('This algorithm is not implemented yet.');
        break;
      default:
        alert('This algorithm is not implemented yet.');
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

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: text }]}>{selectedAlgo.description}</Text>
        <Text style={[styles.infoText, { color: text }]}>
          Time Complexity: <Text style={styles.bold}>{selectedAlgo.timeComplexity}</Text>
        </Text>
        <Text style={[styles.infoText, { color: text }]}>
          Space Complexity: <Text style={styles.bold}>{selectedAlgo.spaceComplexity}</Text>
        </Text>
      </View>

      {/* Bar Chart */}
      <View style={styles.barContainer}>
        {data.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <View
              key={idx}
              style={{
                height: val * 2,
                width: screenWidth / data.length - 4,
                backgroundColor: isActive ? '#ef4444' : barColor,
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

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.sortBtn, sorting && styles.disabledBtn]}
        onPress={runSort}
        disabled={sorting}
      >
        <Text style={styles.btnText}>Start Sorting</Text>
      </TouchableOpacity>

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
  container: { flex: 1, padding: 16, height: '100%'},
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
