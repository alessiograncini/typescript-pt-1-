// Type narrowing: making broad types more specific at runtime

// Basic typeof narrowing
function processValue(val: number | string) {
    if (typeof val === 'string') {
        return val.toUpperCase(); // TypeScript knows val is string
    }
    return val.toFixed(2); // TypeScript knows val is number
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(42.123)); // "42.12"

// Truthiness narrowing
function processOptional(value: string | number | null | undefined) {
    if (value) {
        // TypeScript knows value is string | number (not null | undefined)
        return typeof value === 'string' ? value.length : value * 2;
    }
    return 0; // null or undefined case
}

console.log(processOptional("hello")); // 5
console.log(processOptional(10)); // 20
console.log(processOptional(null)); // 0

// Equality narrowing
function processStatus(status: "loading" | "success" | "error" | number) {
    if (status === "loading") {
        return "🔄 Loading...";
    }
    if (status === "success") {
        return "✅ Success!";
    }
    if (status === "error") {
        return "❌ Error occurred";
    }
    // TypeScript knows status is number here
    return `📊 Progress: ${status}%`;
}

console.log(processStatus("loading"));
console.log(processStatus(75));

// instanceof narrowing
class Dog {
    constructor(public name: string, public breed: string) {}
    bark() { return `${this.name} barks!`; }
}

class Cat {
    constructor(public name: string, public color: string) {}
    meow() { return `${this.name} meows!`; }
}

type Animal = Dog | Cat;

function handleAnimal(animal: Animal): string {
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog
        return `${animal.bark()} Breed: ${animal.breed}`;
    }
    if (animal instanceof Cat) {
        // TypeScript knows animal is Cat
        return `${animal.meow()} Color: ${animal.color}`;
    }
    throw new Error("Unknown animal type");
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log(handleAnimal(dog));
console.log(handleAnimal(cat));

// 'in' operator narrowing
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
    if ('size' in shape) {
        // TypeScript knows shape is Square
        return shape.size * shape.size;
    }
    if ('width' in shape && 'height' in shape) {
        // TypeScript knows shape is Rectangle
        return shape.width * shape.height;
    }
    if ('radius' in shape) {
        // TypeScript knows shape is Circle
        return Math.PI * shape.radius * shape.radius;
    }
    throw new Error("Unknown shape");
}

const square: Square = { kind: "square", size: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(`Square area: ${calculateArea(square)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);

// Custom type guards
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

interface User {
    id: number;
    name: string;
    email: string;
}

function isUser(value: unknown): value is User {
    return typeof value === 'object' &&
           value !== null &&
           typeof (value as any).id === 'number' &&
           typeof (value as any).name === 'string' &&
           typeof (value as any).email === 'string';
}

function processUnknownValue(value: unknown): string {
    if (isString(value)) {
        return `String: "${value}" (length: ${value.length})`;
    }
    if (isNumber(value)) {
        return `Number: ${value} (integer: ${Number.isInteger(value)})`;
    }
    if (isArray(value)) {
        return `Array with ${value.length} items`;
    }
    if (isUser(value)) {
        return `User: ${value.name} (${value.email})`;
    }
    return `Unknown type: ${typeof value}`;
}

console.log(processUnknownValue("hello"));
console.log(processUnknownValue(42));
console.log(processUnknownValue([1, 2, 3]));
console.log(processUnknownValue({ id: 1, name: "Alice", email: "alice@example.com" }));

// Discriminated unions
interface LoadingState {
    status: "loading";
    progress: number;
}

interface SuccessState {
    status: "success";
    data: any;
}

interface ErrorState {
    status: "error";
    message: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): string {
    switch (state.status) {
        case "loading":
            return `Loading: ${state.progress}%`;
        case "success":
            return `Success: ${JSON.stringify(state.data)}`;
        case "error":
            return `Error: ${state.message}`;
        default:
            // Exhaustiveness check
            const exhaustiveCheck: never = state;
            throw new Error(`Unhandled state: ${exhaustiveCheck}`);
    }
}

const loadingState: LoadingState = { status: "loading", progress: 45 };
const successState: SuccessState = { status: "success", data: { users: [1, 2, 3] } };
const errorState: ErrorState = { status: "error", message: "Network timeout" };

console.log(handleApiState(loadingState));
console.log(handleApiState(successState));
console.log(handleApiState(errorState));

// Control flow analysis
function complexNarrowing(value: string | number | null | undefined) {
    if (!value) {
        return "No value";
    }
    // TypeScript knows value is string | number
    
    let processedValue: string;
    if (typeof value === "string") {
        processedValue = value.toUpperCase();
    } else {
        processedValue = value.toString();
    }
    
    return processedValue.length; // TypeScript knows processedValue is always string
}

console.log(complexNarrowing("hello")); // 5
console.log(complexNarrowing(42)); // 2
console.log(complexNarrowing(null)); // "No value"

// Summary: Type narrowing enables safe access to type-specific properties and methods

export {};