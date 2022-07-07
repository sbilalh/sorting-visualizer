// MergeSort Implementation
export function mergeSort(arr, l, h) {
    if (l < h) {
        let m = Math.floor((l + h) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, h);
        merge(arr, l, m, h);
    }
    return arr;
}

// Merge Implementation
function merge(arr, l, m, h) {
    let i = 0;
    let j = 0;
    let k = l;
    let n1 = m - l + 1;
    let n2 = h - m;
    let temp1 = new Array(n1);
    let temp2 = new Array(n2);

    for (let i = 0; i < n1; i++) {
        temp1[i] = arr[l + i];
    }

    for (let i = 0; i < n2; i++) {
        temp2[i] = arr[m + 1 + i];
    }

    while (i < n1 && j < n2) {
        if (temp1[i] <= temp2[j]) {
            arr[k] = temp1[i];
            i++;
        } else {
            arr[k] = temp2[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = temp1[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = temp2[j];
        j++;
        k++;
    }
}