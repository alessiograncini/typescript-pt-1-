// ===== CONST vs FUNCTION COMPARISON =====

// Function declaration
function sayHello(name: string): string {
    return `Hello ${name}`;
}

// Const arrow function
const sayHi = (name: string): string => `Hi ${name}`;

// Test both
console.log(sayHello("Alice")); // Hello Alice
console.log(sayHi("Alice"));    // Hi Alice

// More examples - function declarations
function add(a: number, b: number): number {
    return a + b;
}

function isEven(num: number): boolean {
    return num % 2 === 0;
}

// Const arrow functions  
const multiply = (a: number, b: number): number => a * b;
const isOdd = (num: number): boolean => num % 2 === 1;

console.log(add(3, 5));      // 8
console.log(multiply(3, 5)); // 15
console.log(isEven(4));      // true
console.log(isOdd(4));       // false

// Key difference: hoisting
// Function declarations can be called before definition
console.log(greetEarly("Bob")); // Works!

function greetEarly(name: string): string {
    return `Early hello ${name}`;
}

// Const functions must be defined first
// console.log(greetLate("Bob")); // Error!
const greetLate = (name: string): string => `Late hello ${name}`;

export {}; 