// ===== TUPLES IN TYPESCRIPT =====
// Tuples are arrays with fixed length and specific types for each position

// ===== BASIC TUPLES =====
let coordinate: [number, number] = [10, 20];
let person: [string, number] = ["Alice", 30];
let isValid: [boolean, string] = [true, "success"];

console.log(coordinate[0]); // 10 (number)
console.log(coordinate[1]); // 20 (number)
console.log(person[0]);     // "Alice" (string)
console.log(person[1]);     // 30 (number)

// ===== TUPLE VS ARRAY =====
// Array - same type, variable length
let numbers: number[] = [1, 2, 3, 4, 5]; // Can add more numbers

// Tuple - fixed types, fixed length
let point: [number, number] = [5, 10]; // Exactly 2 numbers
// point = [5, 10, 15]; // ❌ Error - too many elements

// ===== TUPLE WITH DIFFERENT TYPES =====
let userInfo: [string, number, boolean] = ["John", 25, true];
let [name, age, isActive] = userInfo; // Destructuring

console.log(`User: ${name}, Age: ${age}, Active: ${isActive}`);

// ===== OPTIONAL TUPLE ELEMENTS =====
let optionalTuple: [string, number?] = ["Hello"]; // Second element optional
optionalTuple = ["Hello", 42]; // Both ways work

let config: [string, boolean, number?] = ["prod", true]; // Third optional
config = ["dev", false, 3000]; // Can include the optional third element

// ===== REST ELEMENTS IN TUPLES =====
let restTuple: [string, ...number[]] = ["prefix", 1, 2, 3, 4];
let mixed: [boolean, string, ...boolean[]] = [true, "test", false, true, false];

console.log(restTuple); // ["prefix", 1, 2, 3, 4]
console.log(mixed);     // [true, "test", false, true, false]

// ===== READONLY TUPLES =====
let readonlyTuple: readonly [string, number] = ["immutable", 100];
// readonlyTuple[0] = "changed"; // ❌ Error - cannot modify
// readonlyTuple.push("new");    // ❌ Error - cannot modify

// ===== NAMED TUPLES (TS 4.0+) =====
let namedTuple: [x: number, y: number] = [50, 75];
let user: [name: string, age: number, email: string] = [
    "Sarah", 
    28, 
    "sarah@example.com"
];

// Better readability - you can see what each position means
console.log(`Point: x=${namedTuple[0]}, y=${namedTuple[1]}`);

// ===== FUNCTIONS RETURNING TUPLES =====
function getCoordinates(): [number, number] {
    return [Math.random() * 100, Math.random() * 100];
}

function getUserData(): [string, number, boolean] {
    return ["Admin", 35, true];
}

// Using the returned tuples
let [x, y] = getCoordinates();
let [userName, userAge, userActive] = getUserData();

console.log(`Random point: (${x}, ${y})`);
console.log(`User: ${userName}, ${userAge}, Active: ${userActive}`);

// ===== TUPLE TYPES FOR FUNCTION PARAMETERS =====
function drawLine(start: [number, number], end: [number, number]): string {
    return `Line from (${start[0]}, ${start[1]}) to (${end[0]}, ${end[1]})`;
}

function createUser(data: [string, number, string]): object {
    let [name, age, email] = data;
    return { name, age, email };
}

console.log(drawLine([0, 0], [100, 100]));
console.log(createUser(["Bob", 40, "bob@test.com"]));

// ===== TUPLE ARRAYS =====
let coordinates: [number, number][] = [
    [0, 0],
    [10, 20],
    [30, 40],
    [50, 60]
];

let users: [string, number][] = [
    ["Alice", 25],
    ["Bob", 30],
    ["Charlie", 35]
];

// Process tuple arrays
coordinates.forEach(([x, y]) => {
    console.log(`Point: (${x}, ${y})`);
});

users.forEach(([name, age]) => {
    console.log(`${name} is ${age} years old`);
});

// ===== PRACTICAL EXAMPLES =====

// 1. API Response with status and data
type ApiResponse<T> = [boolean, T | null, string?];

function fetchUser(id: number): ApiResponse<{name: string; email: string}> {
    if (id === 1) {
        return [true, { name: "John", email: "john@example.com" }];
    } else {
        return [false, null, "User not found"];
    }
}

let [success, userData, error] = fetchUser(1);
if (success && userData) {
    console.log(`Found user: ${userData.name}`);
} else {
    console.log(`Error: ${error}`);
}

// 2. RGB Color representation
type RGB = [red: number, green: number, blue: number];
type RGBA = [red: number, green: number, blue: number, alpha: number];

let red: RGB = [255, 0, 0];
let blue: RGBA = [0, 0, 255, 0.8];

function rgbToHex([r, g, b]: RGB): string {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

console.log(`Red in hex: ${rgbToHex(red)}`); // #ff0000

// 3. Database query result
type QueryResult = [count: number, rows: any[], hasMore: boolean];

function queryDatabase(): QueryResult {
    return [42, [{ id: 1, name: "Item 1" }], true];
}

let [count, rows, hasMore] = queryDatabase();
console.log(`Found ${count} results, has more: ${hasMore}`);

// 4. Validation result
type ValidationResult = [isValid: boolean, errors: string[]];

function validateEmail(email: string): ValidationResult {
    let errors: string[] = [];
    
    if (!email.includes("@")) {
        errors.push("Missing @ symbol");
    }
    if (email.length < 5) {
        errors.push("Too short");
    }
    
    return [errors.length === 0, errors];
}

let [isEmailValid, emailErrors] = validateEmail("test");
console.log(`Email valid: ${isEmailValid}, Errors: ${emailErrors.join(", ")}`);

// ===== TUPLE METHODS =====
let sampleTuple: [string, number, boolean] = ["test", 42, true];

// Length is known at compile time
console.log(`Tuple length: ${sampleTuple.length}`); // 3

// Can use array methods (but be careful with mutating methods)
let tupleAsString = sampleTuple.join(" | ");
console.log(`Joined: ${tupleAsString}`); // "test | 42 | true"

// Find elements
let hasNumber = sampleTuple.some(item => typeof item === "number");
console.log(`Has number: ${hasNumber}`); // true

// ===== WHEN TO USE TUPLES =====
console.log("\n=== When to use Tuples ===");
console.log("✅ Fixed number of elements with different types");
console.log("✅ Function return values (like coordinates, status + data)");
console.log("✅ Representing pairs, triples, etc.");
console.log("✅ When order matters and types are fixed");
console.log("❌ Don't use for lists that can grow");
console.log("❌ Don't use when all elements have the same type");

console.log("Tuples provide structure and type safety! 🎯");

export {}; 