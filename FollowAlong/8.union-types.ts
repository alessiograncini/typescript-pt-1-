// ===== UNION TYPES IN TYPESCRIPT =====
// Union types let you combine multiple types with |

// ===== BASIC UNION TYPES =====
let id: string | number;
id = "abc123";     // ✅ Valid
id = 456;          // ✅ Valid
// id = true;      // ❌ Error - boolean not allowed

let status: "loading" | "success" | "error";
status = "loading";   // ✅ Valid
status = "success";   // ✅ Valid
// status = "pending"; // ❌ Error - not in union

// ===== FUNCTION PARAMETERS WITH UNIONS =====
function formatId(id: string | number): string {
    return `ID: ${id}`;
}

console.log(formatId("abc"));  // "ID: abc"
console.log(formatId(123));    // "ID: 123"

// ===== TYPE NARROWING =====
function processId(id: string | number): string {
    if (typeof id === "string") {
        // TypeScript knows id is string here
        return id.toUpperCase();
    } else {
        // TypeScript knows id is number here
        return id.toString();
    }
}

console.log(processId("hello"));  // "HELLO"
console.log(processId(42));       // "42"

// ===== UNION WITH OBJECTS =====
interface Dog {
    type: "dog";
    breed: string;
    bark(): void;
}

interface Cat {
    type: "cat";
    color: string;
    meow(): void;
}

type Pet = Dog | Cat;

function petSound(pet: Pet): void {
    if (pet.type === "dog") {
        // TypeScript knows this is a Dog
        pet.bark();
        console.log(`${pet.breed} is barking!`);
    } else {
        // TypeScript knows this is a Cat
        pet.meow();
        console.log(`${pet.color} cat is meowing!`);
    }
}

const myDog: Dog = {
    type: "dog",
    breed: "Golden Retriever",
    bark() { console.log("Woof!"); }
};

const myCat: Cat = {
    type: "cat",
    color: "orange",
    meow() { console.log("Meow!"); }
};

// ===== UNION WITH ARRAYS =====
let mixedArray: (string | number)[] = ["hello", 42, "world", 123];

function printItem(item: string | number): void {
    if (typeof item === "string") {
        console.log(`String: ${item.toUpperCase()}`);
    } else {
        console.log(`Number: ${item * 2}`);
    }
}

mixedArray.forEach(printItem);

// ===== UNION RETURN TYPES =====
function getData(useCache: boolean): string | null {
    if (useCache) {
        return "cached data";
    }
    return null;
}

const result = getData(true);
if (result !== null) {
    // TypeScript knows result is string here
    console.log(result.toUpperCase());
}

// ===== LITERAL UNION TYPES =====
type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "danger";

function createButton(
    text: string, 
    size: Size, 
    variant: ButtonVariant
): string {
    return `${variant} ${size} button: ${text}`;
}

console.log(createButton("Click me", "large", "primary"));

// ===== UNION WITH UNDEFINED/NULL =====
function findUser(id: number): { name: string; email: string } | undefined {
    if (id === 1) {
        return { name: "John", email: "john@example.com" };
    }
    return undefined;
}

const user = findUser(1);
if (user) {
    // TypeScript knows user is defined here
    console.log(`Found user: ${user.name}`);
}

// ===== DISCRIMINATED UNIONS =====
interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: string;
}

interface ErrorState {
    status: "error";
    message: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): string {
    switch (state.status) {
        case "loading":
            return "Loading...";
        case "success":
            return `Data: ${state.data}`;
        case "error":
            return `Error: ${state.message}`;
        default:
            // TypeScript ensures all cases are handled
            const exhaustive: never = state;
            return exhaustive;
    }
}

// ===== UNION TYPE GUARDS =====
function isString(value: string | number): value is string {
    return typeof value === "string";
}

function processValue(value: string | number): string {
    if (isString(value)) {
        // TypeScript knows value is string
        return value.toUpperCase();
    } else {
        // TypeScript knows value is number
        return value.toFixed(2);
    }
}

// ===== COMMON PATTERNS =====

// Optional vs Union with undefined
function greet(name?: string): string {
    // name is string | undefined
    return `Hello ${name || "stranger"}!`;
}

function greetExplicit(name: string | undefined): string {
    // Same as above, but more explicit
    return `Hello ${name || "stranger"}!`;
}

// Union with multiple object types
type Shape = 
    | { type: "circle"; radius: number }
    | { type: "rectangle"; width: number; height: number }
    | { type: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
    switch (shape.type) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}

// ===== TESTING EXAMPLES =====
console.log("=== Union Types Examples ===");
console.log(formatId("USER123"));
console.log(formatId(456));
console.log(processId("typescript"));
console.log(processId(2024));

petSound(myDog);
petSound(myCat);

const loadingState: ApiState = { status: "loading" };
const successState: ApiState = { status: "success", data: "Hello World" };
const errorState: ApiState = { status: "error", message: "Network failed" };

console.log(handleApiState(loadingState));
console.log(handleApiState(successState));
console.log(handleApiState(errorState));

const circle: Shape = { type: "circle", radius: 5 };
const rectangle: Shape = { type: "rectangle", width: 10, height: 20 };

console.log(`Circle area: ${calculateArea(circle)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);

console.log("Union types are powerful! 🚀");

export {}; 