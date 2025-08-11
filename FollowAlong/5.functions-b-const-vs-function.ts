// ===== CONST vs FUNCTION - SIMPLE COMPARISON =====

// ===== REGULAR FUNCTION =====
function sayHello(name: string): string {
    return `Hello ${name}`;
}

// ===== CONST FUNCTION (ARROW) =====
const sayHi = (name: string): string => `Hi ${name}`;

// ===== EXAMPLES =====

// Both do the same thing
console.log(sayHello("Alice")); // Hello Alice
console.log(sayHi("Alice"));    // Hi Alice

// ===== MORE EXAMPLES =====

// Regular functions
function add(a: number, b: number): number {
    return a + b;
}

function isEven(num: number): boolean {
    return num % 2 === 0;
}

// Const arrow functions  
const multiply = (a: number, b: number): number => a * b;

const isOdd = (num: number): boolean => num % 2 === 1;

// ===== TEST THEM =====
console.log(add(3, 5));      // 8
console.log(multiply(3, 5)); // 15
console.log(isEven(4));      // true
console.log(isOdd(4));       // false

// ===== KEY DIFFERENCE =====

// ✅ Regular function - can call before definition
console.log(greetEarly("Bob")); // Works!

function greetEarly(name: string): string {
    return `Early hello ${name}`;
}

// ❌ Const function - must define first
// console.log(greetLate("Bob")); // Error!

const greetLate = (name: string): string => `Late hello ${name}`;

export {}; 