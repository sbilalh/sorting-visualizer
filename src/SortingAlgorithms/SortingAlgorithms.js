// MergeSort Animations
export function getMergeSortAnimations(array) {
    const animations = [];
    let temp = array.slice();
    if (array.length <= 1) {
        return array;
    }
    mergeSort(array, 0, array.length - 1, animations, temp);
    return animations;
}

// MergeSort Implementation
function mergeSort(arr, l, h, animations, temp) {
    if (l < h) {
        let m = Math.floor((l + h) / 2);
        mergeSort(temp, l, m, animations, arr);
        mergeSort(temp, m + 1, h, animations, arr);
        merge(arr, l, m, h, animations, temp);
    }
}

// Merge Implementation
function merge(arr, l, m, h, animations, temp) {
    let i = l;
    let j = m + 1;
    let k = l;

    while (i <= m && j <= h) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (temp[i] <= temp[j]) {
            animations.push([k, temp[i]]);
            arr[k] = temp[i];
            i++;
        } else {
            animations.push([k, temp[j]]);
            arr[k] = temp[j];
            j++;
        }
        k++;
    }

    while (i <= m) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, temp[i]]);
        arr[k] = temp[i];
        i++;
        k++;
    }

    while (j <= h) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, temp[j]]);
        arr[k] = temp[j];
        j++;
        k++;
    }
}

// Heap Sort Class
class MinHeap {

    constructor() {
        this.heap = [];
    }

    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChildIndex(index) {
        return (2 * index + 1);
    }

    rightChildIndex(index) {
        return (2 * index + 2);
    }

    swap(a, b) {
        let temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    insert(item, animations) {
        this.heap.push(item);
        let index = this.heap.length - 1;
        let parent = this.parentIndex(index);
        while (this.heap[parent] < this.heap[index]) {
            animations.push([parent, index]);
            animations.push([parent, index, 0]);
            animations.push([parent, this.heap[index], index, this.heap[parent]]);
            this.swap(parent, index);
            index = this.parentIndex(index);
            parent = this.parentIndex(index);
        }
    }

    delete(animations) {
        animations.push([this.heap.length - 1, this.heap[0], 0, this.heap[this.heap.length - 1]]);
        this.heap.shift();
        this.heap.unshift(this.heap.pop());
        let index = 0;
        let leftChild = this.leftChildIndex(index);
        let rightChild = this.rightChildIndex(index);
        while (this.heap[leftChild] > this.heap[index] || this.heap[rightChild] > this.heap[index]) {
            let max = leftChild;
            if (this.heap[rightChild] > this.heap[max]) {
                max = rightChild
            }
            animations.push([max, index]);
            animations.push([max, index, 0]);
            animations.push([max, this.heap[index], index, this.heap[max]]);
            this.swap(max, index);
            index = max;
            leftChild = this.leftChildIndex(max);
            rightChild = this.rightChildIndex(max);
        }
    }
}

// Heap Sort Animations
export function getHeapSortAnimations(arr) {
    let animations = [];
    let heap = new MinHeap();

    for (let i = 0; i < arr.length; i++) {
        heap.insert(arr[i], animations);
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        heap.delete(animations);
    }
    return animations;
}

// Quick Sort Partition
function partition(arr, low, high, animations) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            animations.push([i, j]);
            animations.push([i, j, 0]);
            animations.push([i, arr[j], j, arr[i]]);
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    animations.push([i + 1, high]);
    animations.push([i + 1, high, 0]);
    animations.push([i + 1, arr[high], high, arr[i + 1]]);
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

// Quick Sort Implementation
export function getQuickSortAnimations(arr, low, high, animations) {
    if (low < high) {
        let pi = partition(arr, low, high, animations);
        getQuickSortAnimations(arr, low, pi - 1, animations);
        getQuickSortAnimations(arr, pi + 1, high, animations);
    }
    return animations;
}

// Bubble Sort Animations
export function getBubbleSortAnimations(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                animations.push([j, j + 1, 0, 0, 0]);
                animations.push([j, j + 1, 0]);
                animations.push([j, array[j + 1], j + 1, array[j]]);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return animations;
}