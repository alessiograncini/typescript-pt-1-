// ===== UNION TYPES =====

// Basic union types - combine multiple types with |
let id: string | number;
id = "abc123";     // Valid
id = 456;          // Valid

let status: "loading" | "success" | "error";
status = "loading";   // Valid
status = "success";   // Valid

// Function parameters with unions
function formatId(id: string | number): string {
    return `ID: ${id}`;
}

console.log(formatId("abc"));  // "ID: abc"
console.log(formatId(123));    // "ID: 123"

// Type narrowing with typeof
function processId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();  // TypeScript knows id is string
    } else {
        return id.toString();     // TypeScript knows id is number
    }
}

// Arrays with union types
const mixedArray: (string | number)[] = [1, "hello", 2, "world"];
const statusArray: ("active" | "inactive")[] = ["active", "inactive"];

// Objects with union properties
interface User {
    id: string | number;
    name: string;
    role: "admin" | "user" | "guest";
    isActive: boolean;
}

const user1: User = {
    id: "user123",
    name: "Alice",
    role: "admin",
    isActive: true
};

const user2: User = {
    id: 456,
    name: "Bob", 
    role: "user",
    isActive: false
};

// Function return types with unions
function getUser(id: string): User | null {
    if (id === "123") {
        return { id: "123", name: "John", role: "user", isActive: true };
    }
    return null;
}

// Complex union types
type ApiResponse = {
    success: true;
    data: any;
} | {
    success: false;
    error: string;
};

function handleApiResponse(response: ApiResponse): void {
    if (response.success) {
        console.log("Success:", response.data);
    } else {
        console.log("Error:", response.error);
    }
}

// Testing examples
console.log(processId("hello"));  // "HELLO"
console.log(processId(42));       // "42"
console.log("Mixed array:", mixedArray);
console.log("Users:", user1, user2);

const successResponse: ApiResponse = { success: true, data: { name: "Test" } };
const errorResponse: ApiResponse = { success: false, error: "Not found" };

handleApiResponse(successResponse);
handleApiResponse(errorResponse);

export {};