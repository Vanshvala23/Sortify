import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const languages = ['javascript', 'python', 'java', 'c', 'cpp'];
const sortingAlgorithms = ['bubble', 'selection', 'insertion'];

const codeSnippets: Record<
  string,
  Record<string, string>
> = {
  javascript: {
    bubble: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    selection: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    insertion: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  },
  python: {
    bubble: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n):
    for j in range(0, n-i-1):
      if arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]
  return arr`,
    selection: `def selection_sort(arr):
  n = len(arr)
  for i in range(n):
    min_idx = i
    for j in range(i+1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
  return arr`,
    insertion: `def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key
  return arr`,
  },
  java: {
    bubble: `void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
    selection: `void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`,
    insertion: `void insertionSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
  },
  c: {
    bubble: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
    selection: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`,
    insertion: `void insertionSort(int arr[], int n) {
  int i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
  },
  cpp: {
    bubble: `void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
      }
    }
  }
}`,
    selection: `void selectionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    swap(arr[minIdx], arr[i]);
  }
}`,
    insertion: `void insertionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
  },
};

export default function CodeExamples() {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');

  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'text');
  const codeBg = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: primary }]}>💻 Sorting Algorithm Codes</Text>

      {/* Language selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.langSelector}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.langButton,
              {
                backgroundColor: selectedLang === lang ? primary : 'transparent',
                borderColor: primary,
              },
            ]}
            onPress={() => setSelectedLang(lang)}
          >
            <Text style={{ color: selectedLang === lang ? '#fff' : primary, fontWeight: '600' }}>
              {lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Algorithm selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.algoSelector}>
        {sortingAlgorithms.map((algo) => (
          <TouchableOpacity
            key={algo}
            style={[
              styles.algoButton,
              {
                backgroundColor: selectedAlgo === algo ? primary : 'transparent',
                borderColor: primary,
              },
            ]}
            onPress={() => setSelectedAlgo(algo)}
          >
            <Text style={{ color: selectedAlgo === algo ? '#fff' : primary, fontWeight: '600' }}>
              {algo.charAt(0).toUpperCase() + algo.slice(1)} Sort
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Code display */}
      <ScrollView
        horizontal
        style={[styles.codeBox, { backgroundColor: codeBg }]}
        contentContainerStyle={{ padding: 12 }}
      >
        <Text style={[styles.codeText, { color: text, fontFamily: 'monospace' }]}>
          {codeSnippets[selectedLang]?.[selectedAlgo]}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:10,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  langSelector: {
    flexGrow: 0,
    marginBottom: 10,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  algoSelector: {
    flexGrow: 0,
    marginBottom: 16,
  },
  algoButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  codeBox: {
    flexGrow: 0,
    borderRadius: 8,
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  codeText: {
    fontSize: 14,
  },
});
