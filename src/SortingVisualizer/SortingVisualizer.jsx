import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations, getBubbleSortAnimations, getHeapSortAnimations, getQuickSortAnimations } from '../SortingAlgorithms/SortingAlgorithms.js';

// Constant for animation speed
const ANIMATION_SPEED_MS = 3;

// Constant for number of array bars
const NUMBER_OF_ARRAY_BARS = 150;

// Constant for main color of array bars
const PRIMARY_COLOR = 'turquoise';

// Constant for comparison color
const SECONDARY_COLOR = 'red';

// Constant for color of sorted array
const TERTIARY_COLOR = 'chartreuse'

// Constant number used as a buffer value for animations
const buffer = 1.04;

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    // Reset array on page loading
    componentDidMount() {
        this.resetArray();
    }

    // Reset array function
    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 650));
        }
        this.setState({ array });
    }

    // Gets sorted animation array from merge sort function and animates DOM elements
    mergeSort() {
        // Getting the animation array
        const animations = getMergeSortAnimations(this.state.array);
        // Looping through animation array
        for (let i = 0; i < animations.length; i++) {
            // Getting current array bar
            const arrayBars = document.getElementsByClassName('array-bar');
            // Returns true if we are comparing values
            const isColorChange = i % 3 !== 2;
            // If first of a triplet then change color to secondary; else change to primary
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else { // Done comparing so now sort
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // Change color to tertiary after sorting
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = TERTIARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);
        // Change color back to primary after buffer * tertiary animation time
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, buffer * buffer * animations.length * ANIMATION_SPEED_MS);
    }

    // Gets sorted animation array from heap sort function and animates DOM elements
    heapSort() {
        // Getting the animation array
        const animations = getHeapSortAnimations(this.state.array);
        // Looping through animation array
        for (let i = 0; i < animations.length; i++) {
            // Getting current array bar
            const arrayBars = document.getElementsByClassName('array-bar');
            // Returns true if we are comparing values
            const isColorChange = animations[i].length != 4;
            // If length is 4 change to secondary; else change to primary
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = animations[i].length === 3 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else { // Done comparing so now sort
                setTimeout(() => {
                    const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight1}px`;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // Change color to tertiary after sorting
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = TERTIARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);
        // Change color back to primary after buffer * tertiary animation time
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, buffer * buffer * animations.length * ANIMATION_SPEED_MS);
    }

    // Gets sorted animation array from quick sort function and animates DOM elements
    quickSort() {
        // Getting the animation array
        const animations = [];
        getQuickSortAnimations(this.state.array, 0, this.state.array.length - 1, animations);
        // Looping through animation array
        for (let i = 0; i < animations.length; i++) {
            // Getting current array bar
            const arrayBars = document.getElementsByClassName('array-bar');
            // Returns true if we are comparing values
            const isColorChange = animations[i].length != 4;
            // If length is 4 change to secondary; else change to primary
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = animations[i].length === 3 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else { // Done comparing so now sort
                setTimeout(() => {
                    const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight1}px`;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // Change color to tertiary after sorting
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = TERTIARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);
        // Change color back to primary after buffer * tertiary animation time
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, buffer * buffer * animations.length * ANIMATION_SPEED_MS);
    }

    // Gets sorted animation array from bubble sort function and animates DOM elements
    bubbleSort() {
        // Getting the animation array
        const animations = getBubbleSortAnimations(this.state.array);
        // Looping through animation array
        for (let i = 0; i < animations.length; i++) {
            // Getting current array bar
            const arrayBars = document.getElementsByClassName('array-bar');
            // Returns true if we are comparing values
            const isColorChange = animations[i].length != 4;
            // If length is 4 change to secondary; else change to primary
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = animations[i].length === 3 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else { // Done comparing so now sort
                setTimeout(() => {
                    const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight1}px`;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // Change color to tertiary after sorting
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = TERTIARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);
        // Change color back to primary after buffer * tertiary animation time
        setTimeout(() => {
            for (let i = 0; i < this.state.array.length; i++) {
                const arrayBar = document.getElementsByClassName('array-bar');
                arrayBar[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, buffer * animations.length * ANIMATION_SPEED_MS);
    }

    // Testing method for sorting algorithms
    /* testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort(function (a, b) { return a - b });
            const quickSortedArray = quickSort(array.slice(), 0, array.length - 1);
            console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
        }
    } */

    // Rendering all elements
    render() {
        const { array } = this.state;

        return (
            <>
                <div className="menu-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    {/* <button onClick={() => this.testSortingAlgorithms()}>Test</button> */}
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`
                            }}></div>
                    ))}
                </div>
            </>
        );
    }
}

// Get random integer
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Check if arrays are equal (used for testing)
/* function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            console.log(arrayOne.length + ", " + arrayOne[i] + ", " + arrayTwo[i]);
            console.log(arrayOne);
            console.log(arrayTwo);
            return false;
        }
    }
    return true;
} */