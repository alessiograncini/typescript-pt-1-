// ===== SEMICOLONS IN TYPESCRIPT =====
// Semicolons are OPTIONAL in TypeScript due to Automatic Semicolon Insertion (ASI)

// ===== BASIC EXAMPLES - BOTH STYLES WORK =====
let withSemicolon: string = "Hello World";
let withoutSemicolon: string = "Hello World"  // No semicolon needed!

// ===== FUNCTION DECLARATIONS =====
function withSemi(): void {
    console.log("Function with semicolons");
    return;
}

function withoutSemi(): void {
    console.log("Function without semicolons")
    return
}

// ===== OBJECT DECLARATIONS =====
const objectWithSemi = {
    name: "Alice",
    age: 30,
};

const objectWithoutSemi = {
    name: "Bob",
    age: 25
}

// ===== ARRAY DECLARATIONS =====
const arrayWithSemi = [1, 2, 3];
const arrayWithoutSemi = [4, 5, 6]

// ===== CLASS DECLARATIONS =====
class PersonWithSemi {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

class PersonWithoutSemi {
    name: string
    
    constructor(name: string) {
        this.name = name
    }
    
    greet(): string {
        return `Hello, I'm ${this.name}`
    }
}

// ===== WHEN SEMICOLONS ARE REQUIRED/RECOMMENDED =====

// ❌ DANGEROUS - When starting a line with [ ( ` + -
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
// This would be interpreted as: const arr1 = [1, 2, 3][4, 5, 6] (accessor!)

// ✅ SAFE - Add semicolon to prevent issues
const safeArr1 = [1, 2, 3];
const safeArr2 = [4, 5, 6]

// ❌ DANGEROUS - IIFE (Immediately Invoked Function Expression)
const result1 = (() => "first")()
const result2 = (() => "second")()
// This would be interpreted as: const result1 = (() => "first")()(() => "second")()

// ✅ SAFE - Add semicolon
const safeResult1 = (() => "first")();
const safeResult2 = (() => "second")()

// ❌ DANGEROUS - Template literals
const str1 = "Hello"
const str2 = `World ${str1}`
// This could cause issues in some cases

// ✅ SAFE
const safeStr1 = "Hello";
const safeStr2 = `World ${safeStr1}`

// ===== EXAMPLES WHERE ASI WORKS WELL =====
// These are all perfectly fine without semicolons:

if (true) {
    console.log("This works fine")
}

for (let i = 0; i < 3; i++) {
    console.log(`Iteration ${i}`)
}

const userExample = {
    name: "John",
    getName() {
        return this.name
    }
}

// ===== COMMON PITFALLS TO AVOID =====

// ❌ This doesn't work as expected:
function returnObject() {
    return
    {
        name: "John"
    }
}
// Returns undefined! Should be:
function returnObjectCorrect() {
    return {
        name: "John"
    }
}

// ❌ Line breaks can be problematic:
let a = 1
let b = 2
let c = a
+ b  // This becomes: let c = a; +b (not addition!)

// ✅ Better:
let x = 1
let y = 2
let z = x + y  // All on one line

// ===== BEST PRACTICES =====

// Option 1: Always use semicolons (more explicit)
const explicit = "Always use semicolons";
console.log(explicit);

// Option 2: Omit semicolons but be careful (more concise)
const implicit = "Omit semicolons carefully"
console.log(implicit)

// Option 3: Use a linter/formatter (recommended)
// ESLint + Prettier can enforce consistent style automatically

// ===== TYPESCRIPT-SPECIFIC NOTES =====
// TypeScript follows the same ASI rules as JavaScript
// The TypeScript compiler doesn't care about semicolons for type checking
// Your IDE/linter settings determine the style

// Interface declarations work without semicolons
interface UserWithoutSemi {
    name: string
    age: number
    isActive: boolean
}

// Type aliases work without semicolons
type StatusWithoutSemi = "loading" | "success" | "error"

// Enum declarations work without semicolons
enum ColorWithoutSemi {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

console.log("Semicolon examples complete!")

export {}; 