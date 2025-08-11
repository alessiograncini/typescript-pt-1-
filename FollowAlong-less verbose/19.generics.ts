// Generics: reusable code with type parameters

// Basic generic function
function identity<T>(value: T): T {
    return value;
}

const stringResult = identity<string>("hello"); // Type: string
const numberResult = identity<number>(42); // Type: number
const autoInferred = identity("world"); // Type inferred as string

console.log(stringResult, numberResult, autoInferred);

// Generic functions with multiple parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const stringNumber = pair<string, number>("age", 25);
const booleanString = pair(true, "active"); // Types inferred

console.log(stringNumber, booleanString);

// Generic function with constraints
interface Lengthable {
    length: number;
}

function getLength<T extends Lengthable>(item: T): number {
    return item.length;
}

console.log(getLength("hello")); // string has length
console.log(getLength([1, 2, 3])); // array has length
// console.log(getLength(42)); // Error: number doesn't have length

// Generic interfaces
interface Container<T> {
    value: T;
    getValue(): T;
}

class Box<T> implements Container<T> {
    constructor(public value: T) {}
    
    getValue(): T {
        return this.value;
    }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);

console.log(stringBox.getValue());
console.log(numberBox.getValue());

// Generic type aliases
type Result<T> = {
    success: boolean;
    data: T;
    error?: string;
};

function createResult<T>(data: T, success: boolean = true): Result<T> {
    return { success, data };
}

const userResult = createResult({ name: "John", age: 30 });
const stringResult2 = createResult("Operation completed");

console.log(userResult);
console.log(stringResult2);

// Generic with default types
interface ApiResponse<T = any> {
    data: T;
    status: number;
}

const response1: ApiResponse<string> = { data: "hello", status: 200 };
const response2: ApiResponse = { data: { name: "John" }, status: 200 };

console.log(response1, response2);

// Generic utility functions
function swap<T>(array: T[], i: number, j: number): T[] {
    const newArray = [...array];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    return newArray;
}

const numbers = [1, 2, 3, 4];
const swapped = swap(numbers, 0, 3);
console.log(swapped);

// Multiple constraints
interface Serializable {
    serialize(): string;
}

interface Comparable<T> {
    compareTo(other: T): number;
}

function processItem<T extends Serializable & Comparable<T>>(item: T): string {
    return `Processed: ${item.serialize()}`;
}

// Conditional types with generics
type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNumber = NonNullable<string | null>; // string

// Generic keyof operator
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30, city: "NYC" };
const personName = getProperty(person, "name"); // Type: string
const personAge = getProperty(person, "age"); // Type: number

console.log(personName, personAge);

// Generic mapped types
type Optional<T> = {
    [K in keyof T]?: T[K];
};

interface User {
    name: string;
    email: string;
    age: number;
}

type PartialUser = Optional<User>; // All properties optional

const partialUser: PartialUser = { name: "Bob" }; // Valid

// Generic functions with arrays
function firstElement<T>(array: T[]): T | undefined {
    return array[0];
}

function lastElement<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

const numbers2 = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c"];

console.log(firstElement(numbers2)); // Type: number | undefined
console.log(lastElement(strings)); // Type: string | undefined

// Generic factory function
function createArray<T>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

const boolArray = createArray(5, true);
const stringArray = createArray(3, "hello");

console.log(boolArray, stringArray);

// Summary: Generics enable type-safe, reusable code with flexible type parameters

export {};