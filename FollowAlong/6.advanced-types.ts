// ===== ADVANCED TYPES: READONLY, OPTIONAL & TYPE COMBINATIONS =====
// Deep dive into TypeScript's powerful type system

// ===== READONLY PROPERTIES =====
// readonly prevents modification after creation

interface User {
    readonly id: number;        // Cannot be changed after creation
    readonly email: string;     // Cannot be changed after creation
    name: string;               // Can be changed
    age?: number;               // Optional and can be changed
}

const user: User = {
    id: 1,
    email: "john@example.com",
    name: "John"
};

// ✅ This works
user.name = "John Updated";

// ❌ These would cause errors:
// user.id = 2;              // Error! Cannot assign to 'id' because it is readonly
// user.email = "new@email"; // Error! Cannot assign to 'email' because it is readonly

console.log("User:", user);

// ===== OPTIONAL PROPERTIES (?) =====
// ? means the property may or may not exist

interface Product {
    name: string;           // Required
    price: number;          // Required
    description?: string;   // Optional
    category?: string;      // Optional
    inStock?: boolean;      // Optional
}

// All these are valid:
const product1: Product = {
    name: "Laptop",
    price: 999
    // No optional properties - that's fine!
};

const product2: Product = {
    name: "Phone",
    price: 699,
    description: "Latest smartphone"
    // Some optional properties
};

const product3: Product = {
    name: "Tablet",
    price: 399,
    description: "Portable tablet",
    category: "Electronics",
    inStock: true
    // All properties included
};

// ===== COMBINING READONLY AND OPTIONAL =====

interface Config {
    readonly version: string;      // Required readonly
    readonly apiUrl: string;       // Required readonly
    timeout?: number;              // Optional mutable
    readonly debug?: boolean;      // Optional readonly
}

const appConfig: Config = {
    version: "1.0.0",
    apiUrl: "https://api.example.com",
    debug: true
};

// ✅ Can change optional mutable properties
// appConfig.timeout = 5000;  // This would work if we had it

// ❌ Cannot change readonly properties
// appConfig.version = "2.0.0";  // Error!
// appConfig.debug = false;      // Error! Even optional readonly can't be changed

// ===== TYPE ALIASES WITH READONLY AND OPTIONAL =====

type DatabaseRecord = {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    title: string;
    content?: string;
    tags?: string[];
    published?: boolean;
};

const blogPost: DatabaseRecord = {
    id: "post-123",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "TypeScript Deep Dive"
};

// ✅ Can modify mutable properties
blogPost.title = "Advanced TypeScript";
blogPost.content = "This is the content";
blogPost.tags = ["typescript", "programming"];

// ❌ Cannot modify readonly properties
// blogPost.id = "new-id";           // Error!
// blogPost.createdAt = new Date();  // Error!

// ===== COMBINING TYPES =====
// Creating new types based on combination of other types

// Base types
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

// ===== INTERSECTION TYPES (&) =====
// Combining multiple types into one

type FullUser = PersonalInfo & Address & ContactPreferences;

const completeUser: FullUser = {
    // From PersonalInfo
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    
    // From Address
    street: "123 Main St",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    
    // From ContactPreferences
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true
};

console.log("Complete user:", completeUser);

// ===== UNION TYPES (|) =====
// Value can be one of several types

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

// ===== CONDITIONAL TYPES WITH COMBINATIONS =====

// Advanced: Types that depend on other types
type UserWithRole<T> = PersonalInfo & {
    role: T;
    permissions: T extends "admin" ? string[] : T extends "user" ? string[] : never;
};

const adminUser: UserWithRole<"admin"> = {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    permissions: ["read", "write", "delete"]
};

const regularUser: UserWithRole<"user"> = {
    id: 2,
    name: "Regular User", 
    email: "user@example.com",
    role: "user",
    permissions: ["read"]
};

// ===== MAPPED TYPES =====
// Creating new types by transforming existing ones

// Make all properties optional
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Custom mapped type: Make specific properties readonly
type ReadonlyFields<T, K extends keyof T> = {
    readonly [P in K]: T[P];
} & {
    [P in Exclude<keyof T, K>]: T[P];
};

type UserWithReadonlyId = ReadonlyFields<PersonalInfo, "id">;

// ===== UTILITY TYPES WITH COMBINATIONS =====

// Pick specific properties
type UserSummary = Pick<FullUser, "name" | "email" | "city">;

const summary: UserSummary = {
    name: "Bob",
    email: "bob@example.com",
    city: "London"
};

// Omit specific properties
type UserWithoutSensitiveData = Omit<FullUser, "id" | "email">;

const publicUser: UserWithoutSensitiveData = {
    name: "Charlie",
    age: 30,
    street: "456 Oak Ave",
    city: "Paris",
    country: "France",
    emailNotifications: true
};

// Make all properties required
type RequiredUser = Required<PersonalInfo>;

const mandatoryUser: RequiredUser = {
    id: 3,
    name: "David",
    email: "david@example.com",
    age: 35  // Now required!
};

// ===== COMPLEX TYPE COMBINATIONS =====

// Combining multiple type operations
type SafeUser = Readonly<Required<Pick<FullUser, "name" | "email">>> & {
    readonly createdAt: Date;
    settings?: Partial<ContactPreferences>;
};

const safeUser: SafeUser = {
    name: "Eve",           // Required and readonly
    email: "eve@test.com", // Required and readonly
    createdAt: new Date(), // Readonly
    settings: {
        emailNotifications: true
        // Other settings are optional
    }
};

// ❌ Cannot modify readonly properties
// safeUser.name = "New Name";        // Error!
// safeUser.createdAt = new Date();   // Error!

// ===== DISCRIMINATED UNIONS =====
// Combining types with discriminator properties

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

// ===== GENERIC TYPES WITH COMBINATIONS =====

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

// Implementation would handle the readonly properties
const articleRepo: Repository<Article> = {
    items: [],
    
    add(articleData) {
        const newArticle: Article = {
            ...articleData,
            id: Math.random().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return newArticle;
    },
    
    update(id, updates) {
        // Implementation would update and return the article
        return null; // Simplified
    },
    
    find(predicate) {
        return this.items.find(predicate);
    }
};

// ===== REAL-WORLD EXAMPLE =====

// E-commerce system types
type BaseProduct = {
    readonly id: string;
    readonly sku: string;
    name: string;
    price: number;
    description?: string;
};

type InventoryInfo = {
    readonly stockCount: number;
    readonly lastRestocked: Date;
    lowStockThreshold?: number;
};

type CategoryInfo = {
    category: string;
    subcategory?: string;
    tags?: string[];
};

type ProductMetadata = {
    readonly createdAt: Date;
    readonly updatedAt: Date;
    createdBy: string;
    featured?: boolean;
};

// Complete product type combining all aspects
type CompleteProduct = BaseProduct & InventoryInfo & CategoryInfo & ProductMetadata;

// Different views of the same product
type ProductSummary = Pick<CompleteProduct, "name" | "price" | "category">;
type ProductInventory = Pick<CompleteProduct, "id" | "sku" | "stockCount" | "lowStockThreshold">;
type ProductAdmin = Omit<CompleteProduct, "stockCount" | "lastRestocked">;

// Function using combined types
function processProduct(product: CompleteProduct): {
    summary: ProductSummary;
    needsRestock: boolean;
    adminView: ProductAdmin;
} {
    return {
        summary: {
            name: product.name,
            price: product.price,
            category: product.category
        },
        needsRestock: product.stockCount < (product.lowStockThreshold || 10),
        adminView: {
            id: product.id,
            sku: product.sku,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            subcategory: product.subcategory,
            tags: product.tags,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            createdBy: product.createdBy,
            featured: product.featured
        }
    };
}

// ===== TESTING THE TYPES =====

console.log("\n=== ADVANCED TYPES EXAMPLES ===");

console.log("Complete user has all properties:", Object.keys(completeUser));
console.log("Safe user is readonly:", safeUser);
console.log("Product summary:", summary);

// Test state handling
const loadingState: AppState = { status: "loading", progress: 50 };
const successState: AppState = { status: "success", data: {}, timestamp: new Date() };
const errorState: AppState = { status: "error", error: "Network error" };

console.log("Loading:", handleState(loadingState));
console.log("Success:", handleState(successState));
console.log("Error:", handleState(errorState));


console.log("Advanced types examples complete!");

export {}; 