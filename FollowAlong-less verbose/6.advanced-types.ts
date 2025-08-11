// ===== ADVANCED TYPES =====

// Readonly properties
interface User {
    readonly id: number;
    readonly email: string;
    name: string;
    age?: number;
}

const user: User = {
    id: 1,
    email: "john@example.com",
    name: "John"
};

// Can modify non-readonly properties
user.name = "John Updated";
// user.id = 2;     // Error! readonly
// user.email = ""; // Error! readonly

// Optional properties with ?
interface Product {
    name: string;
    price: number;
    description?: string;
    category?: string;
    inStock?: boolean;
}

const product1: Product = { name: "Laptop", price: 999 };
const product2: Product = { name: "Phone", price: 699, description: "Latest smartphone" };

// Combining readonly and optional
interface Config {
    readonly version: string;
    readonly apiUrl: string;
    timeout?: number;
    readonly debug?: boolean;
}

const appConfig: Config = {
    version: "1.0.0",
    apiUrl: "https://api.example.com",
    debug: true
};

// Type aliases
type DatabaseRecord = {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    title: string;
    content?: string;
    tags?: string[];
    published?: boolean;
};

// Intersection types (&) - combine multiple types
type PersonalInfo = {
    readonly id: number;
    name: string;
    email: string;
    age?: number;
};

type Address = {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
};

type ContactPreferences = {
    emailNotifications: boolean;
    smsNotifications?: boolean;
    newsletter?: boolean;
};

type FullUser = PersonalInfo & Address & ContactPreferences;

const completeUser: FullUser = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    street: "123 Main St",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true
};

// Union types (|) - value can be one of several types
type Status = "loading" | "success" | "error";
type ID = string | number;

type ApiResponse = {
    id: ID;
    status: Status;
    data?: any;
    error?: string;
};

const response1: ApiResponse = {
    id: "user-123",
    status: "success",
    data: { name: "John" }
};

const response2: ApiResponse = {
    id: 456,
    status: "error",
    error: "User not found"
};

// Utility types
// Pick specific properties
type UserSummary = Pick<FullUser, "name" | "email" | "city">;

const summary: UserSummary = {
    name: "Bob",
    email: "bob@example.com",
    city: "London"
};

// Omit specific properties
type UserWithoutSensitiveData = Omit<FullUser, "id" | "email">;

// Make all properties required
type RequiredUser = Required<PersonalInfo>;

const mandatoryUser: RequiredUser = {
    id: 3,
    name: "David",
    email: "david@example.com",
    age: 35  // Now required!
};

// Complex type combinations
type SafeUser = Readonly<Required<Pick<FullUser, "name" | "email">>> & {
    readonly createdAt: Date;
    settings?: Partial<ContactPreferences>;
};

const safeUser: SafeUser = {
    name: "Eve",
    email: "eve@test.com",
    createdAt: new Date(),
    settings: {
        emailNotifications: true
    }
};

// Discriminated unions
type LoadingState = {
    status: "loading";
    progress?: number;
};

type SuccessState = {
    status: "success";
    data: any;
    timestamp: Date;
};

type ErrorState = {
    status: "error";
    error: string;
    retryCount?: number;
};

type AppState = LoadingState | SuccessState | ErrorState;

function handleState(state: AppState): string {
    switch (state.status) {
        case "loading":
            return `Loading... ${state.progress || 0}%`;
        case "success":
            return `Success! Data received at ${state.timestamp}`;
        case "error":
            return `Error: ${state.error}`;
        default:
            return "Unknown state";
    }
}

// Generic types with combinations
interface Repository<T> {
    readonly items: ReadonlyArray<T>;
    add(item: Omit<T, "id">): T;
    update(id: string, updates: Partial<T>): T | null;
    find(predicate: (item: T) => boolean): T | undefined;
}

type Entity = {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;
};

type Article = Entity & {
    title: string;
    content: string;
    author: string;
    published?: boolean;
    tags?: string[];
};

// Testing examples
console.log("Complete user:", completeUser);
console.log("Product summary:", summary);

const loadingState: AppState = { status: "loading", progress: 50 };
const successState: AppState = { status: "success", data: {}, timestamp: new Date() };
const errorState: AppState = { status: "error", error: "Network error" };

console.log("Loading:", handleState(loadingState));
console.log("Success:", handleState(successState));
console.log("Error:", handleState(errorState));

export {};