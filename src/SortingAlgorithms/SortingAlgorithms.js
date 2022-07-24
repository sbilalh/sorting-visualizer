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

    insert(item) {
        this.heap.push(item);
        let index = this.heap.length - 1;
        let parent = this.parentIndex(index);
        while (this.heap[parent] && this.heap[parent] < this.heap[index]) {
            this.swap(parent, index);
            index = this.parentIndex(index);
            parent = this.parentIndex(index);
        }
    }

    delete() {
        let item = this.heap.shift();
        this.heap.unshift(this.heap.pop());
        let index = 0;
        let leftChild = this.leftChildIndex(index);
        let rightChild = this.rightChildIndex(index);
        while (this.heap[leftChild] && this.heap[leftChild] > this.heap[index] || this.heap[rightChild] > this.heap[index]) {
            let max = leftChild;
            if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) {
                max = rightChild
            }
            this.swap(max, index);
            index = max;
            leftChild = this.leftChildIndex(max);
            rightChild = this.rightChildIndex(max);
        }
        return item;
    }
}

// Heap Sort Implementation
export function heapSort(arr) {
    let sorted = [];
    let heap = new MinHeap();

    for (let i = 0; i < arr.length; i++) {
        heap.insert(arr[i]);
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        sorted[i] = heap.delete();
    }
    return sorted;
}

// TODO: Quick Sort

// Bubble Sort
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