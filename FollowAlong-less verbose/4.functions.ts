// ===== FUNCTIONS IN TYPESCRIPT =====

// Basic function declarations with return types
function getName(): string {
    return "John Doe";
}

function getAge(): number {
    return 25;
}

function printWelcome(): void {
    console.log("Welcome!");
}

function isAdult(age: number): boolean {
    return age >= 18;
}

function createPerson(): { name: string; age: number } {
    return { name: "Alice", age: 30 };
}

// ===== FUNCTION DECLARATIONS VS CONST EXPRESSIONS =====

// Function declaration (hoisted)
function regularFunction(x: number): number {
    return x * 2;
}

// Arrow function (not hoisted)
const arrowFunction = (x: number): number => {
    return x * 2;
};

// Function expression (not hoisted)
const traditionalFunction = function(x: number): number {
    return x * 2;
};

// ===== HOISTING EXAMPLES =====

// This works - function declarations are hoisted
console.log(hoistedFunction(5)); // Works even though defined below

function hoistedFunction(x: number): number {
    return x * 10;
}

// This would NOT work - const functions are not hoisted
// console.log(notHoistedFunction(5)); // Error!

const notHoistedFunction = (x: number): number => {
    return x * 10;
};

// ===== PARAMETER TYPES =====

// Optional parameters
function greetOptional(name: string, age?: number): string {
    if (age) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

// Default parameters
function greetDefault(name: string = "Guest", age: number = 0): string {
    if (age > 0) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

// Rest parameters
function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// ===== ARROW FUNCTION VARIATIONS =====

// Arrow function with implicit return
const addArrow = (a: number, b: number): number => a + b;

// Arrow function with default parameters
const greetArrowDefault = (name: string = "Guest"): string => `Hello, ${name}!`;

// Arrow function with object return
const createUser = (
    name: string = "Anonymous", 
    age: number = 18
): object => ({ name, age, id: Math.random() });

// ===== HIGHER ORDER FUNCTIONS =====

// Function that takes another function as parameter
const processData = (
    data: number[], 
    processor: (item: number) => number = (x) => x
): number[] => {
    return data.map(processor);
};

// Function that returns a function
const createMultiplier = (factor: number = 1): (value: number) => number => {
    return (value: number) => value * factor;
};

// ===== FUNCTION OVERLOADS =====

function parseValue(value: string): string;
function parseValue(value: number): number;
function parseValue(value: boolean): boolean;
function parseValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === "string") {
        return value.trim();
    }
    if (typeof value === "number") {
        return Math.round(value);
    }
    return value;
}

// ===== ASYNC FUNCTIONS =====

async function fetchData(url: string = "https://api.example.com"): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

const fetchUserData = async (userId: number = 1): Promise<object> => {
    return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
    };
};

// ===== ARRAY METHODS WITH FUNCTIONS =====

const heroes = ["thor", "spiderman", "ironman"];

const heroMessages = heroes.map(hero => `hero is ${hero}`);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evenNumbers = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((total, num) => total + num, 0);

// ===== ERROR HANDLING =====

// Never type - functions that never return
function fail(msg: string): never {
    throw new Error(msg);
}

// Result pattern
type Result<T, E> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};

function safeParseNumber(input: string): Result<number, string> {
    const num = parseFloat(input);
    
    if (isNaN(num)) {
        return {
            success: false,
            error: `"${input}" is not a valid number`
        };
    }
    
    return {
        success: true,
        data: num
    };
}

// Optional return values
function findUser(id: number): { name: string; email: string } | null {
    if (id === 1) {
        return { name: "John", email: "john@example.com" };
    }
    return null;
}

// ===== TESTING FUNCTIONS =====

console.log(getName()); // "John Doe"
console.log(getAge()); // 25
console.log(isAdult(25)); // true
console.log(greetOptional("Bob")); // "Hello, Bob!"
console.log(greetDefault()); // "Hello, Guest!"
console.log(sumAll(1, 2, 3, 4)); // 10
console.log(heroMessages); // ["hero is thor", "hero is spiderman", "hero is ironman"]

const parseResult = safeParseNumber("123");
if (parseResult.success) {
    console.log("Parsed:", parseResult.data);
} else {
    console.log("Error:", parseResult.error);
}

export {};