// ===== FUNCTIONS IN TYPESCRIPT =====
// Comprehensive guide to TypeScript functions

// 🔥 THE COOLEST THING ABOUT TYPESCRIPT FUNCTIONS! 🔥
// ===== RETURN TYPE ANNOTATIONS =====
// This is what makes TypeScript AMAZING - you can specify what type the function returns!

/*
   function greet(name: string): string {
                                ^^^^^^^^
                         THIS IS THE MAGIC!
   
   The ": string" tells TypeScript (and other developers):
   - This function MUST return a string
   - TypeScript will CHECK that you actually return a string
   - Your IDE will know the return type for autocomplete
   - Other developers immediately understand what this function gives back
*/

// 🎯 EXAMPLES OF THE RETURN TYPE POWER:

// Returns a string - TypeScript knows this!
function getName(): string {
    return "John Doe";  // ✅ TypeScript is happy
    // return 42;       // ❌ TypeScript would catch this error!
}

// Returns a number - crystal clear!
function getAge(): number {
    return 25;          // ✅ Perfect
    // return "25";     // ❌ TypeScript saves you from bugs!
}

// Returns nothing (void) - explicit about side effects
function printWelcome(): void {
    console.log("Welcome!");
    // No return needed for void
}

// Returns a boolean - no guessing!
function isAdult(age: number): boolean {
    return age >= 18;   // ✅ Must return true or false
}

// Returns a complex object - TypeScript tracks the shape!
function createPerson(): { name: string; age: number } {
    return {
        name: "Alice",
        age: 30
        // TypeScript ensures this object has the right structure!
    };
}

// 🚀 WHY THIS IS SO POWERFUL:
// 1. CATCHES BUGS EARLY - Before your code even runs!
// 2. AMAZING IDE SUPPORT - Autocomplete knows what you're working with
// 3. SELF-DOCUMENTING - The function signature tells you everything
// 4. REFACTORING SAFETY - Change return type, TypeScript finds all issues
// 5. TEAM COLLABORATION - Everyone knows what to expect

console.log("🎉 Return types make TypeScript incredible!");

// ===== FUNCTION vs CONST: THE COMPLETE GUIDE =====
// 🤔 What's the difference between function declarations and const function expressions?

// 📝 WHAT IS CONST IN GENERAL?
// const = "constant" - a variable that CANNOT be reassigned after creation
const name = "John";
// name = "Jane";  // ❌ ERROR! Cannot reassign const variables

const numbers = [1, 2, 3];
numbers.push(4);     // ✅ OK! Can modify array contents
// numbers = [5, 6]; // ❌ ERROR! Cannot reassign the array itself

// 🔥 FUNCTION DECLARATION vs CONST FUNCTION EXPRESSION

// ===== 1. FUNCTION DECLARATION =====
function regularFunction(x: number): number {
    return x * 2;
}

// ===== 2. CONST FUNCTION EXPRESSION (Arrow Function) =====
const arrowFunction = (x: number): number => {
    return x * 2;
};

// ===== 3. CONST FUNCTION EXPRESSION (Traditional) =====
const traditionalConstFunction = function(x: number): number {
    return x * 2;
};

// 🎯 KEY DIFFERENCES:

// ===== DIFFERENCE #1: HOISTING =====
// 🚀 WHAT IS HOISTING? 
// Hoisting = JavaScript "moves" declarations to the TOP of their scope during compilation

/*
   🎯 THINK OF HOISTING LIKE THIS:
   
   When JavaScript reads your code, it does TWO passes:
   
   PASS 1: Find all declarations and "hoist" them to the top
   PASS 2: Execute the code line by line
   
   So when you write:
   
   console.log(myFunction()); // Called first
   
   function myFunction() {    // Defined later
       return "Hello!";
   }
   
   JavaScript internally reorganizes it like:
   
   function myFunction() {    // Hoisted to top!
       return "Hello!";
   }
   
   console.log(myFunction()); // Now this makes sense
*/

// 🔍 HOISTING EXAMPLES - What gets hoisted and what doesn't?

// ===== FUNCTION DECLARATIONS - FULLY HOISTED =====
console.log("=== HOISTING EXAMPLES ===");

// ✅ This works! Function declaration is FULLY hoisted
console.log("Result:", canCallEarly(10)); // Works even though function is defined below!

function canCallEarly(x: number): number {
    return x * 5;
}

// ===== VAR DECLARATIONS - PARTIALLY HOISTED =====

// 🤔 var is hoisted but NOT its value
// console.log("Var before declaration:", varExample); // Would be undefined in plain JS
var varExample = "I'm a var";
console.log("Var after declaration:", varExample); // "I'm a var"

// Internally JavaScript sees it like:
// var varExample;              // Declaration hoisted (undefined)
// console.log(varExample);     // undefined
// varExample = "I'm a var";    // Assignment happens here

// ===== LET/CONST - NOT HOISTED (Temporal Dead Zone) =====

// ❌ These would cause errors! let/const are NOT hoisted
// console.log(letExample);     // ReferenceError: Cannot access before initialization
// console.log(constExample);   // ReferenceError: Cannot access before initialization

let letExample = "I'm a let";
const constExample = "I'm a const";

// ===== CONST FUNCTION EXPRESSIONS - NOT HOISTED =====

// ❌ This would NOT work! Arrow functions stored in const are not hoisted
// console.log(notHoistedArrowFunction(5)); // ERROR! Cannot access before initialization

const notHoistedArrowFunction = (x: number): number => {
    return x * 10;
};

// ===== VISUAL REPRESENTATION =====

console.log("\n🎨 VISUAL HOISTING EXAMPLE:");

// What you write:
sayHello();           // Call function
var greeting = "Hi";  // Declare var
sayGoodbye();        // Call another function

function sayHello(): void {
    console.log("Hello from hoisted function!");
}

// What JavaScript internally sees (conceptually):
/*
   // 1. HOISTED DECLARATIONS (moved to top):
   var greeting;                    // var declaration hoisted (undefined)
   function sayHello(): void {      // function fully hoisted
       console.log("Hello from hoisted function!");
   }
   
   // 2. EXECUTION (in order):
   sayHello();                      // ✅ Works! Function exists
   greeting = "Hi";                 // Assignment happens here
   sayGoodbye();                    // ❌ Error! Function doesn't exist yet
*/

// This function is defined after it's called above - causes error
function sayGoodbye(): void {
    console.log("Goodbye!");
}

// ===== HOISTING WITH DIFFERENT FUNCTION STYLES =====

console.log("\n🔬 HOISTING COMPARISON:");

// 1. ✅ Function Declaration - HOISTED
console.log("1. Function declaration:", typeof hoistedFunc);     // "function"

function hoistedFunc(): string {
    return "I'm hoisted!";
}

// 2. ❌ Function Expression with var - Partially hoisted
// console.log("2. Var function expression:", typeof varFunc);  // Would be "undefined" in plain JS

var varFunc = function(): string {
    return "I'm in a var";
};

// 3. ❌ Arrow Function with const - NOT hoisted
// console.log("3. Const arrow function:", typeof constFunc);   // ReferenceError!

const constFunc = (): string => {
    return "I'm in a const";
};

// 4. ❌ Arrow Function with let - NOT hoisted  
// console.log("4. Let arrow function:", typeof letFunc);       // ReferenceError!

let letFunc = (): string => {
    return "I'm in a let";
};

// ===== WHY DOES HOISTING EXIST? =====

console.log("\n🤔 WHY HOISTING EXISTS:");
console.log("Historical reasons - JavaScript needed to:");
console.log("1. Allow mutual recursion (functions calling each other)");
console.log("2. Make function declarations usable anywhere in their scope");
console.log("3. Handle var declarations in a consistent way");

// ===== BEST PRACTICES WITH HOISTING =====

console.log("\n✅ HOISTING BEST PRACTICES:");
console.log("1. Don't rely on hoisting - define before using");
console.log("2. Use const/let instead of var");
console.log("3. Put function declarations at the top of their scope");
console.log("4. Use arrow functions for most cases (no hoisting confusion)");

// Function declarations are "hoisted" - you can call them before they're defined!

console.log("=== HOISTING EXAMPLES ===");

// ✅ This works! Function declaration is hoisted
console.log(hoistedFunction(5)); // Works even though function is defined below!

function hoistedFunction(x: number): number {
    return x * 10;
}

// ❌ This would NOT work! Const functions are not hoisted
// console.log(notHoistedFunction(5)); // ERROR! Cannot access before initialization

const notHoistedFunction = (x: number): number => {
    return x * 10;
};

// ===== DIFFERENCE #2: REASSIGNMENT =====

// ✅ Function declarations can be redeclared (but this can cause confusion)
function redeclarableFunction(): string {
    return "first version";
}

// Note: In practice, redeclaring functions like this would cause TypeScript errors
// This is just to show the conceptual difference

// ❌ Const functions CANNOT be reassigned - much safer!
const safeFunction = (): string => "I cannot be changed";
// safeFunction = (): string => "trying to change"; // ERROR! Cannot reassign

// ===== DIFFERENCE #3: SCOPE BEHAVIOR =====

if (true) {
    // Function declarations are hoisted to the top of their scope
    function scopedFunction(): string {
        return "I exist in function scope";
    }
    
    // Const functions respect block scope strictly
    const blockScopedFunction = (): string => {
        return "I exist only in this block";
    };
}

// scopedFunction();      // ✅ Might work (depends on JS engine)
// blockScopedFunction(); // ❌ Definitely won't work - not in scope

// ===== DIFFERENCE #4: THIS BINDING (Advanced) =====

class Example {
    name = "Example Class";
    
    // Regular function - 'this' can change based on how it's called
    regularMethod(): string {
        return `Regular: ${this.name}`;
    }
    
    // Arrow function - 'this' is always bound to the class instance
    arrowMethod = (): string => {
        return `Arrow: ${this.name}`;
    };
}

// ===== WHEN TO USE WHICH? =====

// 🎯 USE FUNCTION DECLARATIONS WHEN:
// ✅ You need hoisting (call before definition)
// ✅ You're defining main/utility functions
// ✅ You want traditional function behavior

function utilityFunction(data: string): string {
    return data.toUpperCase();
}

// 🎯 USE CONST + ARROW FUNCTIONS WHEN:
// ✅ You want to prevent reassignment (safer)
// ✅ You're assigning functions to variables
// ✅ You want predictable scoping
// ✅ You're working with callbacks or event handlers

const processDataExample = (data: string[]): string[] => {
    return data.map(item => item.toLowerCase());
};

const eventHandler = (event: string): void => {
    console.log(`Handling: ${event}`);
};

// ===== PRACTICAL EXAMPLES =====

// 📚 Library/Utility Functions - Use function declarations
function calculateTax(price: number, rate: number = 0.1): number {
    return price * rate;
}

function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

// 🎮 Event Handlers/Callbacks - Use const + arrow functions
const handleClick = (buttonId: string): void => {
    console.log(`Button ${buttonId} clicked`);
};

const validateEmail = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
};

// 🏭 Configuration/Options - Use const + arrow functions
const apiConfig = {
    baseUrl: "https://api.example.com",
    timeout: 5000,
    retry: (attempt: number): boolean => attempt < 3,
    transform: (data: any): any => ({ ...data, timestamp: Date.now() })
};

// ===== SUMMARY =====
console.log("=== FUNCTION vs CONST SUMMARY ===");
console.log("Function Declaration:");
console.log("  ✅ Hoisted (can call before definition)");
console.log("  ⚠️  Can be redeclared");
console.log("  🔄 Traditional this binding");

console.log("\nConst Function Expression:");
console.log("  🔒 Cannot be reassigned (safer)");
console.log("  📍 Block scoped");
console.log("  🎯 Predictable this binding (arrows)");
console.log("  ❌ Not hoisted (must define before use)");

// ===== 1. SIMPLE FUNCTION DECLARATIONS =====

// Basic function with parameters and return type
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Function with multiple parameters
function add(a: number, b: number): number {
    return a + b;
}

// Function with no return value (void)
function logMessage(message: string): void {
    console.log(message);
}

// Function with optional parameters (using ?)
function greetOptional(name: string, age?: number): string {
    if (age) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

// Function with default parameters (prevents missing argument errors)
function greetDefault(name: string = "Guest", age: number = 0): string {
    if (age > 0) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

// Function with rest parameters
function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// ===== 2. ARROW FUNCTIONS =====

// Basic arrow function
const greetArrow = (name: string): string => {
    return `Hello, ${name}!`;
};

// Arrow function with implicit return (single expression)
const addArrow = (a: number, b: number): number => a + b;

// Arrow function with default parameters (prevents TypeScript errors)
const greetArrowDefault = (name: string = "Guest"): string => `Hello, ${name}!`;

// Arrow function with multiple default parameters
const createUser = (
    name: string = "Anonymous", 
    age: number = 18, 
    email: string = "no-email@example.com"
): object => ({
    name,
    age,
    email,
    id: Math.random()
});

// Arrow function with optional parameters
const calculatePrice = (basePrice: number, discount?: number): number => {
    const discountAmount = discount || 0;
    return basePrice - (basePrice * discountAmount / 100);
};

// Arrow function with rest parameters
const multiplyAll = (...numbers: number[]): number => 
    numbers.reduce((product, num) => product * num, 1);

// ===== 3. FUNCTION EXPRESSIONS =====

// Function expression (assigned to variable)
const subtract = function(a: number, b: number): number {
    return a - b;
};

// Function expression with default parameters
const divide = function(a: number, b: number = 1): number {
    return a / b;
};

// ===== 4. FUNCTIONS WITH COMPLEX TYPES =====

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

// Function with union type parameters
const formatValue = (value: string | number, prefix: string = ""): string => {
    return `${prefix}${value}`;
};

// Function with object parameter (with default values)
interface UserConfig {
    name?: string;
    age?: number;
    email?: string;
}

const createUserProfile = (config: UserConfig = {}): UserConfig => {
    return {
        name: config.name || "Anonymous",
        age: config.age || 18,
        email: config.email || "no-email@example.com"
    };
};

// ===== 5. FUNCTION OVERLOADS =====

// Function overload signatures
function parseValue(value: string): string;
function parseValue(value: number): number;
function parseValue(value: boolean): boolean;

// Implementation
function parseValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === "string") {
        return value.trim();
    }
    if (typeof value === "number") {
        return Math.round(value);
    }
    return value;
}

// ===== 6. ASYNC FUNCTIONS =====

// Simple async function
async function fetchData(url: string = "https://api.example.com"): Promise<string> {
    // Simulated API call
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

// Async arrow function
const fetchUserData = async (userId: number = 1): Promise<object> => {
    // Simulated user fetch
    return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
    };
};

// ===== 7. HIGHER-ORDER FUNCTIONS =====

// Function that takes and returns functions
const withLogging = <T extends (...args: any[]) => any>(fn: T) => {
    return (...args: Parameters<T>): ReturnType<T> => {
        console.log(`Calling function with args:`, args);
        const result = fn(...args);
        console.log(`Function returned:`, result);
        return result;
    };
};

// ===== 8. PRACTICAL EXAMPLES =====

// Calculator functions with default values
const calculator = {
    add: (a: number = 0, b: number = 0): number => a + b,
    subtract: (a: number = 0, b: number = 0): number => a - b,
    multiply: (a: number = 1, b: number = 1): number => a * b,
    divide: (a: number = 1, b: number = 1): number => b !== 0 ? a / b : 0
};

// String utility functions
const stringUtils = {
    capitalize: (str: string = ""): string => 
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    
    truncate: (str: string = "", maxLength: number = 50): string =>
        str.length > maxLength ? str.slice(0, maxLength) + "..." : str,
    
    slugify: (str: string = ""): string =>
        str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
};

// Array utility functions
const arrayUtils = {
    chunk: <T>(array: T[] = [], size: number = 1): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    unique: <T>(array: T[] = []): T[] => [...new Set(array)],
    
    shuffle: <T>(array: T[] = []): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// ===== 9. TESTING THE FUNCTIONS =====

// Test simple functions
console.log("=== Simple Functions ===");
console.log(greet("Alice")); // Hello, Alice!
console.log(add(5, 3)); // 8
console.log(greetOptional("Bob")); // Hello, Bob!
console.log(greetOptional("Charlie", 25)); // Hello, Charlie! You are 25 years old.

// Test functions with defaults (no TypeScript errors!)
console.log("\n=== Functions with Defaults ===");
console.log(greetDefault()); // Hello, Guest!
console.log(greetDefault("David")); // Hello, David!
console.log(greetDefault("Eve", 30)); // Hello, Eve! You are 30 years old.

// Test arrow functions
console.log("\n=== Arrow Functions ===");
console.log(greetArrowDefault()); // Hello, Guest!
console.log(addArrow(10, 20)); // 30
console.log(createUser()); // Creates user with default values
console.log(createUser("John", 25)); // Creates user with custom values

// Test utility functions
console.log("\n=== Utility Functions ===");
console.log(calculator.add()); // 0 (using defaults)
console.log(calculator.multiply(5)); // 5 (5 * 1)
console.log(stringUtils.capitalize("hello world")); // Hello world
console.log(arrayUtils.unique([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]

// Test with higher-order functions
console.log("\n=== Higher-Order Functions ===");
const loggedAdd = withLogging(calculator.add);
console.log(loggedAdd(5, 3)); // Logs the call and returns 8

// ===== ARRAY METHODS WITH ARROW FUNCTIONS =====
// 🎯 Real-world examples of arrow functions with array methods

// Example like the image - hero mapping
const heros = ["thor", "spiderman", "ironman"];
// const heros = [1, 2, 3] // Alternative with numbers

const heroMessages = heros.map(hero => {
    return `hero is ${hero}`;
});

console.log("\n=== ARRAY METHODS EXAMPLES ===");
console.log("Heroes:", heros);
console.log("Hero messages:", heroMessages);

// More array method examples with arrow functions
const numbersArray = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbersArray.map(num => num * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// Filter - keep elements that match condition
const evenNumbers = numbersArray.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers); // [2, 4]

// Find - get first element that matches
const foundNumber = numbersArray.find(num => num > 3);
console.log("First number > 3:", foundNumber); // 4

// Reduce - combine all elements into single value
const sum = numbersArray.reduce((total, num) => total + num, 0);
console.log("Sum:", sum); // 15

// ForEach - do something with each element
console.log("Each number:");
numbersArray.forEach(num => {
    console.log(`Number: ${num}`);
});

// ===== COMPLEX EXAMPLES =====

// Working with objects
interface Hero {
    name: string;
    power: string;
    strength: number;
}

const superHeros: Hero[] = [
    { name: "thor", power: "thunder", strength: 95 },
    { name: "spiderman", power: "web-slinging", strength: 80 },
    { name: "ironman", power: "technology", strength: 85 }
];

// Map to create descriptions
const heroDescriptions = superHeros.map(hero => {
    return `${hero.name} has ${hero.power} with strength ${hero.strength}`;
});

console.log("\nHero descriptions:");
heroDescriptions.forEach(desc => console.log(desc));

// Filter strong heroes
const strongHeros = superHeros.filter(hero => hero.strength > 85);
console.log("\nStrong heroes:", strongHeros.map(h => h.name));

// Map with implicit return (one-liner)
const heroNames = superHeros.map(hero => hero.name.toUpperCase());
console.log("Hero names (uppercase):", heroNames);

// Chaining array methods
const powerfulHeroNames = superHeros
    .filter(hero => hero.strength > 80)        // Filter strong ones
    .map(hero => hero.name.toUpperCase())      // Convert to uppercase
    .sort();                                   // Sort alphabetically

console.log("Powerful hero names (sorted):", powerfulHeroNames);

// ===== ARROW FUNCTION VARIATIONS =====

const fruits = ["apple", "banana", "cherry"];

// Different ways to write the same map operation:

// 1. With block body (explicit return)
const result1 = fruits.map(fruit => {
    return `I love ${fruit}`;
});
// result is ["I love apple", "I love banana", "I love cherry"]

// 2. With implicit return (one-liner)
const result2 = fruits.map(fruit => `I love ${fruit}`);

// 3. With parentheses for clarity
const result3 = fruits.map((fruit) => `I love ${fruit}`);

// 4. With type annotation (TypeScript)
const result4 = fruits.map((fruit: string): string => `I love ${fruit}`);

console.log("\nAll results are the same:", result1);

// ===== ERROR HANDLING IN FUNCTIONS =====
// 🚨 How to handle errors and special return types in TypeScript

// ===== THE 'NEVER' TYPE =====
// 'never' represents values which are NEVER observed
// Functions that never return a value (throw errors or infinite loops)

function fail(msg: string): never {
    throw new Error(msg);
    // This function NEVER returns - it always throws an error
}

function infiniteLoop(): never {
    while (true) {
        console.log("This runs forever");
        // This function NEVER returns - it runs forever
    }
}

// ===== THE 'UNKNOWN' TYPE =====
// 'unknown' is the safe counterpart to 'any'
// You must check the type before using it

function safeParse(s: string): unknown {
    return JSON.parse(s);
    // We don't know what JSON.parse will return, so we use 'unknown'
}

// Need to be careful with 'unknown' - must type check first
const obj = safeParse('{"name": "John"}');

// ❌ This would cause an error:
// console.log(obj.name); // Error! Object is of type 'unknown'

// ✅ This is safe - type checking first:
if (typeof obj === 'object' && obj !== null && 'name' in obj) {
    console.log((obj as any).name); // Now it's safe
}

// ===== ERROR HANDLING PATTERNS =====

// 1. Try-Catch with typed errors
function riskyOperation(input: string): string {
    try {
        if (input.length === 0) {
            throw new Error("Input cannot be empty");
        }
        return input.toUpperCase();
    } catch (error) {
        // TypeScript doesn't know what type 'error' is
        if (error instanceof Error) {
            console.log("Error message:", error.message);
            return "DEFAULT_VALUE";
        }
        throw error; // Re-throw if it's not an Error we can handle
    }
}

// 2. Result pattern (returning success/error objects)
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

// Usage of Result pattern
const parseResult = safeParseNumber("123");
if (parseResult.success) {
    console.log("Parsed number:", parseResult.data); // TypeScript knows this is a number
} else {
    console.log("Parse error:", parseResult.error); // TypeScript knows this is a string
}

// 3. Optional return values (null/undefined for errors)
function findUser(id: number): { name: string; email: string } | null {
    // Simulate database lookup
    if (id === 1) {
        return { name: "John", email: "john@example.com" };
    }
    return null; // User not found
}

const user = findUser(1);
if (user) {
    console.log(`User: ${user.name}`); // Safe to access properties
} else {
    console.log("User not found");
}

// ===== ASYNC ERROR HANDLING =====

// Promise-based error handling
async function fetchUserDataSafe(userId: number): Promise<{ name: string } | null> {
    try {
        // Simulate API call that might fail
        if (userId < 1) {
            throw new Error("Invalid user ID");
        }
        
        // Simulate successful response
        return { name: `User ${userId}` };
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null; // Return null instead of throwing
    }
}

// Using async error handling
async function handleUserFetch(): Promise<void> {
    const userData = await fetchUserDataSafe(1);
    
    if (userData) {
        console.log("User data:", userData.name);
    } else {
        console.log("Failed to get user data");
    }
}

// ===== CUSTOM ERROR TYPES =====

class ValidationError extends Error {
    constructor(
        message: string,
        public field: string
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(
        message: string,
        public statusCode: number
    ) {
        super(message);
        this.name = "NetworkError";
    }
}

function validateEmailWithError(email: string): string {
    if (!email.includes("@")) {
        throw new ValidationError("Email must contain @", "email");
    }
    return email;
}

// Handling custom errors
function handleEmailValidation(email: string): void {
    try {
        const validEmail = validateEmail(email);
        console.log("Valid email:", validEmail);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`Validation error in ${error.field}: ${error.message}`);
        } else {
            console.log("Unexpected error:", error);
        }
    }
}

// ===== UNION TYPES FOR ERROR HANDLING =====

type ApiResponse<T> = 
    | { status: 'success'; data: T }
    | { status: 'error'; message: string; code: number };

function processApiCall(response: ApiResponse<{ id: number; name: string }>): void {
    // TypeScript forces us to handle both cases
    if (response.status === 'success') {
        console.log("User:", response.data.name); // TypeScript knows data exists
    } else {
        console.log(`Error ${response.code}: ${response.message}`); // TypeScript knows error props exist
    }
}

// ===== TESTING ERROR HANDLING =====

console.log("\n=== ERROR HANDLING EXAMPLES ===");

// Test safe parsing
console.log("Safe parse valid:", safeParseNumber("42"));
console.log("Safe parse invalid:", safeParseNumber("not-a-number"));

// Test risky operation
console.log("Risky operation:", riskyOperation("hello"));
console.log("Risky operation empty:", riskyOperation(""));

// Test user finding
console.log("Find user 1:", findUser(1));
console.log("Find user 999:", findUser(999));

// Test email validation
handleEmailValidation("john@example.com");
handleEmailValidation("invalid-email");

console.log("Error handling examples complete!");

// ===== MISLEADING OBJECT BEHAVIOR =====
// 🚨 This can be confusing! TypeScript allows extra properties in some cases

// Function expects only name and isPaid
function createUserExample(name: string, isPaid: boolean): void {
    console.log(`User: ${name}, Paid: ${isPaid}`);
}

// ❌ This should work but seems wrong:
let newUser = { 
    name: "hitesh", 
    isPaid: false, 
    email: "h@h.com"  // Extra property!
};

createUserExample(newUser.name, newUser.isPaid); // Works fine

// 🤔 But this is MORE confusing - object with extra properties:
function processUser(user: { name: string; isPaid: boolean }): void {
    console.log(`Processing: ${user.name}, Status: ${user.isPaid}`);
}

// ✅ This works! TypeScript allows extra properties when using variables
let userWithExtra = { 
    name: "hitesh", 
    isPaid: false, 
    email: "h@h.com",    // Extra property allowed!
    age: 25              // Another extra property!
};

processUser(userWithExtra); // Works! TypeScript ignores extra properties

// ❌ But this would NOT work - direct object literal:
// processUser({
//     name: "hitesh",
//     isPaid: false,
//     email: "h@h.com"  // Error! Object literal may only specify known properties
// });

// ===== WHY THIS HAPPENS =====

console.log("\n=== MISLEADING BEHAVIOR EXPLANATION ===");

// 1. Variable assignment = "Duck typing" (if it has what we need, it's fine)
let flexibleUser = { name: "Alice", isPaid: true, extra: "data" };
processUser(flexibleUser); // ✅ Works - has name and isPaid, extra ignored

// 2. Direct object literal = "Strict checking" (only known properties)
// processUser({ name: "Alice", isPaid: true, extra: "data" }); // ❌ Error

// ===== REAL WORLD EXAMPLE =====

interface Course {
    title: string;
    price: number;
}

function buyCourse(course: Course): void {
    console.log(`Buying ${course.title} for $${course.price}`);
}

// API response has extra data
let apiResponse = {
    title: "React Basics",
    price: 99,
    instructor: "John Doe",     // Extra!
    duration: "5 hours",        // Extra!
    rating: 4.8                 // Extra!
};

// ✅ This works - TypeScript sees it has title and price
buyCourse(apiResponse);

// ❌ But this doesn't work:
// buyCourse({
//     title: "React Basics",
//     price: 99,
//     instructor: "John Doe"  // Error! Extra property
// });

// ===== HOW TO HANDLE THIS =====

// ===== USING TYPE ALIASES =====

// Type alias for user
type User = {
    name: string;
    isPaid: boolean;
};

function processUserWithType(user: User): void {
    console.log(`Processing: ${user.name}, Status: ${user.isPaid}`);
}

// Same misleading behavior with type aliases!
let userWithTypeAlias = {
    name: "sarah",
    isPaid: true,
    email: "sarah@example.com",  // Extra property still allowed!
    age: 28
};

// ✅ Works! Type alias behaves the same way
processUserWithType(userWithTypeAlias);

// ❌ But direct object still fails:
// processUserWithType({
//     name: "sarah",
//     isPaid: true,
//     email: "sarah@example.com"  // Error! Extra property not allowed
// });

// Type alias vs Interface - same behavior
interface UserInterface {
    name: string;
    isPaid: boolean;
}

type UserType = {
    name: string;
    isPaid: boolean;
};

// Both have the same misleading behavior!
function testInterface(user: UserInterface): void { console.log(user.name); }
function testType(user: UserType): void { console.log(user.name); }

let userData = { name: "test", isPaid: false, extra: "data" };
testInterface(userData); // ✅ Works
testType(userData);      // ✅ Works

// Option 1: Be explicit about extra properties
interface FlexibleCourse {
    title: string;
    price: number;
    [key: string]: any; // Allow any extra properties
}

function buyFlexibleCourse(course: FlexibleCourse): void {
    console.log(`Buying ${course.title} for $${course.price}`);
}

// Now this works:
buyFlexibleCourse({
    title: "Advanced React",
    price: 199,
    instructor: "Jane Smith"  // ✅ Extra property allowed
});

// Option 2: Use type assertion
buyCourse({
    title: "TypeScript Course",
    price: 149,
    instructor: "Expert"
} as Course); // ✅ Force TypeScript to accept it

console.log("Misleading behavior examples complete!");

console.log("Functions examples complete!");

export {}; 