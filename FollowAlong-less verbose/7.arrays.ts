// ===== ARRAYS IN TYPESCRIPT =====

// Basic arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["hello", "world"];
const booleans: boolean[] = [true, false, true];

// Alternative syntax (same thing)
const moreNumbers: Array<number> = [10, 20, 30];
const moreStrings: Array<string> = ["foo", "bar"];

// ===== MIXED ARRAYS =====
const mixed: (string | number)[] = [1, "hello", 2, "world"];
const flexible: any[] = [1, "hello", true, { name: "John" }];

// ===== OBJECT ARRAYS =====
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
];

// ===== READONLY ARRAYS =====
const readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // Error! Cannot modify

const readonlyPeople: ReadonlyArray<Person> = [
    { name: "Charlie", age: 35 }
];
// readonlyPeople.push({...}); // Error! Cannot modify

// ===== ARRAY METHODS WITH TYPES =====
const scores = [85, 92, 78, 96, 88];

// All these methods maintain type safety
const doubled = scores.map(score => score * 2);           // number[]
const highScores = scores.filter(score => score > 90);   // number[]
const total = scores.reduce((sum, score) => sum + score, 0); // number
const firstHigh = scores.find(score => score > 90);      // number | undefined

// ===== TUPLE ARRAYS =====
const coordinate: [number, number] = [10, 20];
const namedPerson: [string, number] = ["John", 30];

// Array of tuples
const coordinates: [number, number][] = [
    [0, 0],
    [10, 20],
    [30, 40]
];

// ===== NESTED ARRAYS =====
const matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const userGroups: Person[][] = [
    [{ name: "Admin1", age: 40 }, { name: "Admin2", age: 35 }],
    [{ name: "User1", age: 25 }, { name: "User2", age: 30 }]
];

// ===== ARRAY WITH OPTIONAL ELEMENTS =====
const optionalData: (string | undefined)[] = ["hello", undefined, "world"];
const maybeNumbers: (number | null)[] = [1, null, 3, null, 5];

// ===== ARRAY DESTRUCTURING =====
const fruits = ["apple", "banana", "cherry"];
const [first, second, ...rest] = fruits;
console.log(first);  // "apple"
console.log(second); // "banana"
console.log(rest);   // ["cherry"]

// ===== COMMON ARRAY OPERATIONS =====
const items = ["a", "b", "c"];

// Add elements
items.push("d");              // ["a", "b", "c", "d"]
items.unshift("start");       // ["start", "a", "b", "c", "d"]

// Remove elements
const last = items.pop();     // "d", items = ["start", "a", "b", "c"]
const first2 = items.shift(); // "start", items = ["a", "b", "c"]

// Find elements
const found = items.includes("b");     // true
const index = items.indexOf("b");      // 1

// ===== TESTING ARRAYS =====
console.log("Numbers:", numbers);
console.log("People:", people);
console.log("Doubled scores:", doubled);
console.log("High scores:", highScores);
console.log("Matrix:", matrix);

console.log("Arrays are easy in TypeScript!");

export {}; 