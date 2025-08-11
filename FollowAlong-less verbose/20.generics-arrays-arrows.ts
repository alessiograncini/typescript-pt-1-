// Generic functions with arrays and arrow functions

// Generic array operations
const getFirstElement = <T>(array: T[]): T | undefined => {
    return array[0];
};

const getLastElement = <T>(array: T[]): T | undefined => {
    return array[array.length - 1];
};

// Generic array filtering
const filterTruthy = <T>(array: (T | null | undefined)[]): T[] => {
    return array.filter((item): item is T => Boolean(item));
};

// Generic map function
const mapArray = <T, U>(array: T[], callback: (item: T) => U): U[] => {
    return array.map(callback);
};

// Generic reduce
const reduceArray = <T, R>(array: T[], callback: (acc: R, item: T) => R, initial: R): R => {
    return array.reduce(callback, initial);
};

// Generic array utilities
const createArray = <T>(length: number, fill: T): T[] => {
    return Array(length).fill(fill);
};

const zip = <T, U>(arr1: T[], arr2: U[]): [T, U][] => {
    const length = Math.min(arr1.length, arr2.length);
    const result: [T, U][] = [];
    for (let i = 0; i < length; i++) {
        result.push([arr1[i], arr2[i]]);
    }
    return result;
};

// Generic array transformations
const chunk = <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

const flatten = <T>(array: T[][]): T[] => {
    return array.flat();
};

// Generic comparison functions
const findMax = <T>(array: T[], compareFn: (a: T, b: T) => number): T | undefined => {
    if (array.length === 0) return undefined;
    return array.reduce((max, current) => compareFn(current, max) > 0 ? current : max);
};

const sortBy = <T>(array: T[], keyFn: (item: T) => number | string): T[] => {
    return [...array].sort((a, b) => {
        const aKey = keyFn(a);
        const bKey = keyFn(b);
        return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
    });
};

// Generic array predicates
const every = <T>(array: T[], predicate: (item: T) => boolean): boolean => {
    return array.every(predicate);
};

const some = <T>(array: T[], predicate: (item: T) => boolean): boolean => {
    return array.some(predicate);
};

const count = <T>(array: T[], predicate: (item: T) => boolean): number => {
    return array.filter(predicate).length;
};

// Generic array partitioning
const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
    const truthy: T[] = [];
    const falsy: T[] = [];
    
    array.forEach(item => {
        if (predicate(item)) {
            truthy.push(item);
        } else {
            falsy.push(item);
        }
    });
    
    return [truthy, falsy];
};

// Usage examples
const numbers = [1, 2, 3, 4, 5];
const strings = ["apple", "banana", "cherry"];
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

// Basic operations
console.log(getFirstElement(numbers)); // 1
console.log(getLastElement(strings)); // "cherry"

// Array transformations
const doubled = mapArray(numbers, x => x * 2);
const sum = reduceArray(numbers, (acc, x) => acc + x, 0);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(sum); // 15

// Array utilities
const pairs = zip(numbers, strings);
const chunks = chunk(numbers, 2);
console.log(pairs); // [[1, "apple"], [2, "banana"], [3, "cherry"]]
console.log(chunks); // [[1, 2], [3, 4], [5]]

// Filtering and sorting
const mixedArray = [1, null, 2, undefined, 3, null];
const filtered = filterTruthy(mixedArray);
const sortedUsers = sortBy(users, user => user.age);
console.log(filtered); // [1, 2, 3]
console.log(sortedUsers);

// Predicates and counting
const allPositive = every(numbers, x => x > 0);
const hasEven = some(numbers, x => x % 2 === 0);
const evenCount = count(numbers, x => x % 2 === 0);
console.log(allPositive); // true
console.log(hasEven); // true
console.log(evenCount); // 2

// Partitioning
const [even, odd] = partition(numbers, x => x % 2 === 0);
console.log(even); // [2, 4]
console.log(odd); // [1, 3, 5]

// Summary: Generic arrow functions provide type-safe array operations

export {};