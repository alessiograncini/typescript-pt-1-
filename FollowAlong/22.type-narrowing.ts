// ===== TYPE NARROWING IN TYPESCRIPT =====
// Understanding type narrowing: making types more specific at runtime

// ===== WHAT IS TYPE NARROWING? =====
console.log("=== What Is Type Narrowing? ===");

/*
TYPE NARROWING is the process of making a BROAD TYPE more SPECIFIC based on runtime checks.

🎯 THINK OF TYPE NARROWING AS:
• "Type Detective Work" - figuring out the exact type at runtime
• "Smart Type Checking" - TypeScript gets smarter as you add checks
• "Conditional Type Safety" - different code paths for different types

🔧 WHY IS TYPE NARROWING IMPORTANT?
1. 🛡️  UNION TYPE SAFETY - Work safely with union types (string | number)
2. 🎯  PRECISE TYPE ACCESS - Access type-specific properties/methods
3. 🚀  BETTER INTELLISENSE - Get accurate autocompletion
4. 🔍  RUNTIME VALIDATION - Ensure types match expectations
5. 🧹  CLEANER CODE - Avoid type assertions and any types

❌ WITHOUT TYPE NARROWING (Problems):
function processValue(val: number | string) {
    return val.toUpperCase();  // Error! toUpperCase doesn't exist on number
}

✅ WITH TYPE NARROWING (Safe):
function processValue(val: number | string) {
    if (typeof val === 'string') {
        return val.toUpperCase();  // ✅ TypeScript knows val is string here
    }
    return val.toString();  // ✅ TypeScript knows val is number here
}

The magic: TypeScript tracks your runtime checks and narrows types accordingly!
*/

// ===== TYPEOF TYPE GUARDS =====
console.log("\n=== typeof Type Guards ===");

// Basic typeof narrowing (from your screenshot example)
function detectType(val: number | string) {
    if (typeof val === 'string') {
        return val.toLowerCase();  // TypeScript knows val is string
    }
    // TypeScript knows val must be number here
    return val.toFixed(2);
}

// More comprehensive typeof examples
function processInput(input: string | number | boolean | object) {
    console.log(`Processing input of type: ${typeof input}`);
    
    if (typeof input === 'string') {
        // TypeScript knows input is string
        console.log(`String length: ${input.length}`);
        console.log(`Uppercase: ${input.toUpperCase()}`);
        return input.trim();
    }
    
    if (typeof input === 'number') {
        // TypeScript knows input is number
        console.log(`Number value: ${input}`);
        console.log(`Is integer: ${Number.isInteger(input)}`);
        return input * 2;
    }
    
    if (typeof input === 'boolean') {
        // TypeScript knows input is boolean
        console.log(`Boolean value: ${input}`);
        return !input;
    }
    
    // TypeScript knows input is object here
    console.log(`Object keys: ${Object.keys(input)}`);
    return input;
}
   
// Testing typeof guards
console.log("=== Testing typeof Guards ===");
console.log(detectType("HELLO"));        // "hello"
console.log(detectType(42.12345));       // "42.12"

console.log(processInput("  TypeScript  "));
console.log(processInput(42));
console.log(processInput(true));
console.log(processInput({ name: "test" }));

// ===== TRUTHINESS NARROWING =====
console.log("\n=== Truthiness Narrowing ===");

function processOptionalValue(value: string | number | null | undefined) {
    // Truthiness check narrows out null and undefined
    if (value) {
        // TypeScript knows value is string | number (not null | undefined)
        console.log(`Value exists: ${value}`);
        
        if (typeof value === 'string') {
            return value.toUpperCase();
        } else {
            return value * 10;
        }
    } else {
        // TypeScript knows value is null | undefined | 0 | "" | false
        console.log(`Value is falsy: ${value}`);
        return "No value provided";
    }
}

function processArray<T>(arr: T[] | null | undefined): T[] {
    if (arr) {
        // TypeScript knows arr is T[] (not null | undefined)
        console.log(`Array has ${arr.length} items`);
        return arr.filter(Boolean); // Remove falsy values
    } else {
        // TypeScript knows arr is null | undefined
        console.log("No array provided");
        return [];
    }
}

// Testing truthiness narrowing
console.log("=== Testing Truthiness Narrowing ===");
console.log(processOptionalValue("hello"));
console.log(processOptionalValue(42));
console.log(processOptionalValue(null));
console.log(processOptionalValue(undefined));
console.log(processOptionalValue(""));  // Empty string is falsy
console.log(processOptionalValue(0));   // Zero is falsy

console.log(processArray([1, 2, 3]));
console.log(processArray(null));
console.log(processArray(undefined));

// ===== EQUALITY NARROWING =====
console.log("\n=== Equality Narrowing ===");

function processStatus(status: "loading" | "success" | "error" | number) {
    // Exact equality checks narrow types
    if (status === "loading") {
        // TypeScript knows status is exactly "loading"
        console.log("🔄 Loading...");
        return { state: "loading", progress: 0 };
    }
    
    if (status === "success") {
        // TypeScript knows status is exactly "success"
        console.log("✅ Success!");
        return { state: "success", data: "Operation completed" };
    }
    
    if (status === "error") {
        // TypeScript knows status is exactly "error"
        console.log("❌ Error occurred");
        return { state: "error", message: "Something went wrong" };
    }
    
    // TypeScript knows status must be number here
    console.log(`📊 Progress: ${status}%`);
    return { state: "progress", value: status };
}

// Multiple equality checks
function compareValues(a: string | number, b: string | number) {
    if (a === b) {
        // TypeScript knows a and b are the same type (string | number)
        // but can't narrow further without additional checks
        console.log(`Values are equal: ${a} === ${b}`);
        return true;
    }
    
    if (typeof a === 'string' && typeof b === 'string') {
        // TypeScript knows both are strings
        console.log(`String comparison: "${a}" vs "${b}"`);
        return a.localeCompare(b) === 0;
    }
    
    if (typeof a === 'number' && typeof b === 'number') {
        // TypeScript knows both are numbers
        console.log(`Number comparison: ${a} vs ${b}`);
        return Math.abs(a - b) < 0.001; // Floating point comparison
    }
    
    // Different types
    console.log(`Different types: ${typeof a} vs ${typeof b}`);
    return false;
}

// Testing equality narrowing
console.log("=== Testing Equality Narrowing ===");
console.log(processStatus("loading"));
console.log(processStatus("success"));
console.log(processStatus(75));

console.log(compareValues("hello", "hello"));
console.log(compareValues(42, 42));
console.log(compareValues("42", 42));

// ===== INSTANCEOF TYPE GUARDS =====
console.log("\n=== instanceof Type Guards ===");

class Dog {
    name: string;
    breed: string;
    
    constructor(name: string, breed: string) {
        this.name = name;
        this.breed = breed;
    }
    
    bark(): string {
        return `${this.name} says Woof!`;
    }
    
    fetch(): string {
        return `${this.name} fetches the ball`;
    }
}

class Cat {
    name: string;
    color: string;
    
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
    
    meow(): string {
        return `${this.name} says Meow!`;
    }
    
    climb(): string {
        return `${this.name} climbs the tree`;
    }
}

class Bird {
    name: string;
    canFly: boolean;
    
    constructor(name: string, canFly: boolean = true) {
        this.name = name;
        this.canFly = canFly;
    }
    
    chirp(): string {
        return `${this.name} chirps`;
    }
    
    fly(): string {
        return this.canFly ? `${this.name} flies high` : `${this.name} cannot fly`;
    }
}

type Animal = Dog | Cat | Bird;

function handleAnimal(animal: Animal): string {
    // instanceof narrowing for classes
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog
        console.log(`🐕 Dog: ${animal.name} (${animal.breed})`);
        return `${animal.bark()} ${animal.fetch()}`;
    }
    
    if (animal instanceof Cat) {
        // TypeScript knows animal is Cat
        console.log(`🐱 Cat: ${animal.name} (${animal.color})`);
        return `${animal.meow()} ${animal.climb()}`;
    }
    
    if (animal instanceof Bird) {
        // TypeScript knows animal is Bird
        console.log(`🐦 Bird: ${animal.name} (flies: ${animal.canFly})`);
        return `${animal.chirp()} ${animal.fly()}`;
    }
    
    // TypeScript knows this is unreachable
    throw new Error("Unknown animal type");
}

// Built-in objects instanceof
function processData(data: string | Date | Array<any> | Error): string {
    if (data instanceof Date) {
        // TypeScript knows data is Date
        return `Date: ${data.toISOString()}`;
    }
    
    if (data instanceof Array) {
        // TypeScript knows data is Array<any>
        return `Array with ${data.length} items: [${data.join(', ')}]`;
    }
    
    if (data instanceof Error) {
        // TypeScript knows data is Error
        return `Error: ${data.message}`;
    }
    
    // TypeScript knows data is string
    return `String: "${data}"`;
}

// Testing instanceof guards
console.log("=== Testing instanceof Guards ===");
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");
const bird = new Bird("Tweety", true);

console.log(handleAnimal(dog));
console.log(handleAnimal(cat));
console.log(handleAnimal(bird));

console.log(processData(new Date()));
console.log(processData([1, 2, 3]));
console.log(processData(new Error("Something went wrong")));
console.log(processData("Hello World"));

// ===== IN OPERATOR NARROWING =====
console.log("\n=== 'in' Operator Narrowing ===");

interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function calculateArea(shape: Shape): number {
    // Using 'in' operator to check for properties
    if ("size" in shape) {
        // TypeScript knows shape has 'size' property (Square)
        console.log(`📐 Square with size: ${shape.size}`);
        return shape.size * shape.size;
    }
    
    if ("width" in shape && "height" in shape) {
        // TypeScript knows shape has both 'width' and 'height' (Rectangle)
        console.log(`📐 Rectangle: ${shape.width} x ${shape.height}`);
        return shape.width * shape.height;
    }
    
    if ("radius" in shape) {
        // TypeScript knows shape has 'radius' property (Circle)
        console.log(`📐 Circle with radius: ${shape.radius}`);
        return Math.PI * shape.radius * shape.radius;
    }
    
    // TypeScript knows this is unreachable
    throw new Error("Unknown shape");
}

// Alternative approach using discriminated unions (kind property)
function calculateAreaDiscriminated(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            // TypeScript knows shape is Square
            return shape.size * shape.size;
            
        case "rectangle":
            // TypeScript knows shape is Rectangle
            return shape.width * shape.height;
            
        case "circle":
            // TypeScript knows shape is Circle
            return Math.PI * shape.radius * shape.radius;
            
        default:
            // Exhaustiveness check - TypeScript ensures all cases are handled
            const exhaustiveCheck: never = shape;
            throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
    }
}

// Testing 'in' operator narrowing
console.log("=== Testing 'in' Operator Narrowing ===");
const square: Square = { kind: "square", size: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(`Square area: ${calculateArea(square)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);

console.log(`Square area (discriminated): ${calculateAreaDiscriminated(square)}`);
console.log(`Rectangle area (discriminated): ${calculateAreaDiscriminated(rectangle)}`);
console.log(`Circle area (discriminated): ${calculateAreaDiscriminated(circle).toFixed(2)}`);

// ===== CUSTOM TYPE GUARDS =====
console.log("\n=== Custom Type Guards ===");

// User-defined type guard functions
interface User {
    id: number;
    name: string;
    email: string;
}

interface Admin extends User {
    permissions: string[];
    role: "admin";
}

interface RegularUser extends User {
    role: "user";
}

type UserType = Admin | RegularUser;

// Custom type guard function
function isAdmin(user: UserType): user is Admin {
    return user.role === "admin" && "permissions" in user;
}

function isRegularUser(user: UserType): user is RegularUser {
    return user.role === "user";
}

// More complex type guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}

function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Generic type guard for non-null values
function isNotNull<T>(value: T | null | undefined): value is T {
    return value != null;
}

// Type guard for checking object properties
function hasProperty<T extends object, K extends string | number | symbol>(
    obj: T,
    prop: K
): obj is T & Record<K, unknown> {
    return prop in obj;
}

// Usage of custom type guards
function processUser(user: UserType): string {
    if (isAdmin(user)) {
        // TypeScript knows user is Admin
        return `Admin ${user.name} with permissions: ${user.permissions.join(", ")}`;
    }
    
    if (isRegularUser(user)) {
        // TypeScript knows user is RegularUser
        return `Regular user: ${user.name}`;
    }
    
    // TypeScript knows this is unreachable
    throw new Error("Unknown user type");
}

function processUnknownValue(value: unknown): string {
    if (isString(value)) {
        // TypeScript knows value is string
        return `String: "${value}" (length: ${value.length})`;
    }
    
    if (isNumber(value)) {
        // TypeScript knows value is number
        return `Number: ${value} (integer: ${Number.isInteger(value)})`;
    }
    
    if (isArray(value)) {
        // TypeScript knows value is unknown[]
        return `Array with ${value.length} items`;
    }
    
    if (isObject(value)) {
        // TypeScript knows value is Record<string, unknown>
        return `Object with keys: ${Object.keys(value).join(", ")}`;
    }
    
    return `Unknown type: ${typeof value}`;
}

// Testing custom type guards
console.log("=== Testing Custom Type Guards ===");
const admin: Admin = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    permissions: ["read", "write", "delete"]
};

const regularUser: RegularUser = {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "user"
};

console.log(processUser(admin));
console.log(processUser(regularUser));

console.log(processUnknownValue("Hello"));
console.log(processUnknownValue(42));
console.log(processUnknownValue([1, 2, 3]));
console.log(processUnknownValue({ name: "test" }));
console.log(processUnknownValue(null));

// Testing hasProperty type guard
const obj = { name: "test", age: 25 };
if (hasProperty(obj, "name")) {
    // TypeScript knows obj has 'name' property
    console.log(`Object name: ${obj.name}`);
}

// ===== CONTROL FLOW ANALYSIS =====
console.log("\n=== Control Flow Analysis ===");

function complexNarrowing(value: string | number | null | undefined) {
    // Early return pattern
    if (!value) {
        console.log("No value provided");
        return null;
    }
    
    // TypeScript knows value is string | number (not null | undefined)
    console.log(`Value exists: ${value}`);
    
    // Type narrowing with assignments
    let processedValue: string;
    
    if (typeof value === "string") {
        // TypeScript knows value is string
        processedValue = value.toUpperCase();
    } else {
        // TypeScript knows value is number
        processedValue = value.toString();
    }
    
    // TypeScript knows processedValue is always string here
    return processedValue.length;
}

function arrayProcessing(items: (string | number)[]): (string | number)[] {
    const result: (string | number)[] = [];
    
    for (const item of items) {
        // Type narrowing inside loops
        if (typeof item === "string") {
            // TypeScript knows item is string
            result.push(item.trim().toLowerCase());
        } else {
            // TypeScript knows item is number
            result.push(Math.round(item));
        }
    }
    
    return result;
}

// Advanced control flow with multiple variables
function advancedNarrowing(a: string | number, b: string | number) {
    if (typeof a === "string") {
        if (typeof b === "string") {
            // Both are strings
            return a.concat(" ", b);
        } else {
            // a is string, b is number
            return a.repeat(b);
        }
    } else {
        if (typeof b === "string") {
            // a is number, b is string
            return b.repeat(a);
        } else {
            // Both are numbers
            return a + b;
        }
    }
}

// Testing control flow analysis
console.log("=== Testing Control Flow Analysis ===");
console.log(complexNarrowing("Hello"));
console.log(complexNarrowing(42));
console.log(complexNarrowing(null));

console.log(arrayProcessing(["  HELLO  ", 3.14, "  world  ", 2.99]));
console.log(advancedNarrowing("Hi", "There"));
console.log(advancedNarrowing("*", 5));
console.log(advancedNarrowing(3, "!"));
console.log(advancedNarrowing(10, 32));

// ===== ASSERTION FUNCTIONS =====
console.log("\n=== Assertion Functions ===");

// Assertion function that throws if condition is false
function assert(condition: any, message: string = "Assertion failed"): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

// Type assertion functions
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error(`Expected string, got ${typeof value}`);
    }
}

function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number" || isNaN(value)) {
        throw new Error(`Expected number, got ${typeof value}`);
    }
}

function assertIsNotNull<T>(value: T | null | undefined): asserts value is T {
    if (value == null) {
        throw new Error("Value cannot be null or undefined");
    }
}

// Usage of assertion functions
function processWithAssertions(value: unknown): string {
    // After assertion, TypeScript knows the type
    assertIsString(value);
    // TypeScript knows value is string here
    return value.toUpperCase();
}

function calculateWithAssertion(a: unknown, b: unknown): number {
    assertIsNumber(a);
    assertIsNumber(b);
    // TypeScript knows both a and b are numbers here
    return a + b;
}

function safeAccess(obj: { data?: string | null }): string {
    assertIsNotNull(obj.data);
    // TypeScript knows obj.data is string here (not null | undefined)
    return obj.data.trim();
}

// Testing assertion functions
console.log("=== Testing Assertion Functions ===");
try {
    console.log(processWithAssertions("hello world"));
    console.log(calculateWithAssertion(10, 20));
    console.log(safeAccess({ data: "  test data  " }));
    
    // This will throw an error
    // console.log(processWithAssertions(42));
} catch (error) {
    console.log("Assertion error:", (error as Error).message);
}

// ===== DISCRIMINATED UNIONS =====
console.log("\n=== Discriminated Unions ===");

// API response patterns
interface LoadingState {
    status: "loading";
    progress?: number;
}

interface SuccessState {
    status: "success";
    data: any;
    timestamp: Date;
}

interface ErrorState {
    status: "error";
    error: string;
    code: number;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): string {
    // Discriminated union using status property
    switch (state.status) {
        case "loading":
            // TypeScript knows state is LoadingState
            const progress = state.progress ?? 0;
            return `🔄 Loading... ${progress}%`;
            
        case "success":
            // TypeScript knows state is SuccessState
            return `✅ Success at ${state.timestamp.toISOString()}: ${JSON.stringify(state.data)}`;
            
        case "error":
            // TypeScript knows state is ErrorState
            return `❌ Error ${state.code}: ${state.error}`;
            
        default:
            // Exhaustiveness check
            const exhaustiveCheck: never = state;
            throw new Error(`Unhandled state: ${exhaustiveCheck}`);
    }
}

// Event system with discriminated unions
interface ClickEvent {
    type: "click";
    element: string;
    x: number;
    y: number;
}

interface KeyboardEvent {
    type: "keyboard";
    key: string;
    modifier: string[];
}

interface ScrollEvent {
    type: "scroll";
    direction: "up" | "down";
    delta: number;
}

type UIEvent = ClickEvent | KeyboardEvent | ScrollEvent;

function handleUIEvent(event: UIEvent): string {
    switch (event.type) {
        case "click":
            // TypeScript knows event is ClickEvent
            return `🖱️ Clicked ${event.element} at (${event.x}, ${event.y})`;
            
        case "keyboard":
            // TypeScript knows event is KeyboardEvent
            const modifiers = event.modifier.length > 0 ? ` (${event.modifier.join("+")})` : "";
            return `⌨️ Key pressed: ${event.key}${modifiers}`;
            
        case "scroll":
            // TypeScript knows event is ScrollEvent
            return `📜 Scrolled ${event.direction} by ${event.delta}px`;
            
        default:
            const exhaustiveCheck: never = event;
            throw new Error(`Unhandled event: ${exhaustiveCheck}`);
    }
}

// Testing discriminated unions
console.log("=== Testing Discriminated Unions ===");
const loadingState: LoadingState = { status: "loading", progress: 45 };
const successState: SuccessState = { 
    status: "success", 
    data: { users: [1, 2, 3] }, 
    timestamp: new Date() 
};
const errorState: ErrorState = { status: "error", error: "Not found", code: 404 };

console.log(handleApiState(loadingState));
console.log(handleApiState(successState));
console.log(handleApiState(errorState));

const clickEvent: ClickEvent = { type: "click", element: "button", x: 100, y: 200 };
const keyboardEvent: KeyboardEvent = { type: "keyboard", key: "Enter", modifier: ["Ctrl", "Shift"] };
const scrollEvent: ScrollEvent = { type: "scroll", direction: "down", delta: 150 };

console.log(handleUIEvent(clickEvent));
console.log(handleUIEvent(keyboardEvent));
console.log(handleUIEvent(scrollEvent));

// ===== TYPE NARROWING BEST PRACTICES =====
console.log("\n=== Type Narrowing Best Practices ===");

/*
✅ TYPE NARROWING BEST PRACTICES:

1. 🎯  USE TYPEOF FOR PRIMITIVES
   ✅ if (typeof value === "string") { ... }
   ❌ if (value instanceof String) { ... }  // Avoid for primitives

2. 🏗️  USE INSTANCEOF FOR CLASSES/OBJECTS
   ✅ if (error instanceof Error) { ... }
   ✅ if (date instanceof Date) { ... }

3. 🔍  USE 'IN' OPERATOR FOR PROPERTIES
   ✅ if ("length" in value) { ... }
   ❌ if (value.length !== undefined) { ... }  // Can throw error

4. 🛡️  CREATE CUSTOM TYPE GUARDS FOR COMPLEX TYPES
   ✅ function isUser(obj: any): obj is User { return obj && typeof obj.id === "number"; }

5. 🎨  USE DISCRIMINATED UNIONS FOR STATE MANAGEMENT
   ✅ type State = { status: "loading" } | { status: "success"; data: any }

6. ⚡  LEVERAGE ASSERTION FUNCTIONS FOR VALIDATION
   ✅ function assertIsString(value: unknown): asserts value is string { ... }

7. 🔄  USE EARLY RETURNS TO SIMPLIFY NARROWING
   ✅ if (!value) return null; // Narrows out null/undefined early

❌ COMMON MISTAKES:

1. Forgetting Type Guards:
   ❌ function process(val: string | number) { return val.toUpperCase(); }  // Error!
   ✅ function process(val: string | number) { 
       if (typeof val === "string") return val.toUpperCase();
       return val.toString();
   }

2. Using Any Instead of Narrowing:
   ❌ function process(val: string | number) { return (val as any).toUpperCase(); }
   ✅ function process(val: string | number) { 
       if (typeof val === "string") return val.toUpperCase();
   }

3. Not Handling All Union Cases:
   ❌ function process(status: "loading" | "success" | "error") {
       if (status === "loading") return "Loading...";
       // Missing success and error cases!
   }

4. Incorrect instanceof Usage:
   ❌ if (value instanceof "string") { ... }  // Wrong!
   ✅ if (typeof value === "string") { ... }

5. Ignoring Null/Undefined:
   ❌ function getLength(str: string | null) { return str.length; }  // Error!
   ✅ function getLength(str: string | null) { return str?.length ?? 0; }
*/

// Example of comprehensive type narrowing
function robustValueProcessor(value: unknown): { type: string; result: any; safe: boolean } {
    // Handle null/undefined first
    if (value == null) {
        return { type: "null", result: null, safe: true };
    }
    
    // Primitive types
    if (typeof value === "string") {
        return { 
            type: "string", 
            result: value.trim().toLowerCase(), 
            safe: true 
        };
    }
    
    if (typeof value === "number") {
        return { 
            type: "number", 
            result: Number.isFinite(value) ? value : 0, 
            safe: Number.isFinite(value) 
        };
    }
    
    if (typeof value === "boolean") {
        return { type: "boolean", result: value, safe: true };
    }
    
    // Object types
    if (value instanceof Date) {
        return { 
            type: "date", 
            result: value.toISOString(), 
            safe: !isNaN(value.getTime()) 
        };
    }
    
    if (value instanceof Array) {
        return { 
            type: "array", 
            result: value.length, 
            safe: true 
        };
    }
    
    if (value instanceof Error) {
        return { 
            type: "error", 
            result: value.message, 
            safe: false 
        };
    }
    
    // Generic object
    if (typeof value === "object") {
        return { 
            type: "object", 
            result: Object.keys(value).length, 
            safe: true 
        };
    }
    
    // Unknown type
    return { 
        type: "unknown", 
        result: String(value), 
        safe: false 
    };
}

// Testing robust processor
console.log("=== Testing Robust Value Processor ===");
console.log(robustValueProcessor("  HELLO WORLD  "));
console.log(robustValueProcessor(42));
console.log(robustValueProcessor(true));
console.log(robustValueProcessor(new Date()));
console.log(robustValueProcessor([1, 2, 3]));
console.log(robustValueProcessor(new Error("Test error")));
console.log(robustValueProcessor({ name: "test", age: 25 }));
console.log(robustValueProcessor(null));
console.log(robustValueProcessor(undefined));

// ===== SUMMARY =====
console.log("\n=== Type Narrowing Summary ===");
console.log("🎯 TYPE NARROWING ENABLES:");
console.log("   • Safe access to type-specific properties and methods");
console.log("   • Better IntelliSense and autocompletion");
console.log("   • Compile-time error prevention");
console.log("   • Runtime type validation");
console.log("");
console.log("🔧 KEY TECHNIQUES:");
console.log("   • typeof guards: typeof value === 'string'");
console.log("   • instanceof checks: value instanceof Date");
console.log("   • 'in' operator: 'property' in object");
console.log("   • Equality checks: status === 'success'");
console.log("   • Custom type guards: value is Type");
console.log("   • Assertion functions: asserts value is Type");
console.log("   • Discriminated unions: { type: 'success', data: any }");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Use typeof for primitives, instanceof for objects");
console.log("   • Create custom type guards for complex validation");
console.log("   • Use discriminated unions for state management");
console.log("   • Handle all cases in union types (exhaustiveness)");
console.log("   • Use early returns to simplify control flow");
console.log("");
console.log("🚀 REMEMBER:");
console.log("   • Type narrowing = Runtime safety + Compile-time intelligence");
console.log("   • TypeScript tracks your checks and narrows accordingly");
console.log("   • Good narrowing prevents bugs and improves developer experience");
console.log("   • Master type narrowing to unlock TypeScript's full power! 🎯");

export {}; 