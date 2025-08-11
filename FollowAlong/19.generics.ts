// ===== GENERICS IN TYPESCRIPT =====
// Understanding generics: writing reusable, type-safe code

// ===== WHAT ARE GENERICS? =====
console.log("=== What Are Generics? ===");

/*
GENERICS are a way to create REUSABLE components that work with MULTIPLE TYPES
while maintaining TYPE SAFETY.

🎯 THINK OF GENERICS AS:
• "Type Variables" - placeholders for actual types
• "Functions for Types" - you pass in a type, get specific behavior
• "Template System" - one definition, many specific implementations

🔧 WHY USE GENERICS?
1. 🛡️  TYPE SAFETY - No 'any' types, catch errors at compile time
2. 🔄  REUSABILITY - Write once, use with many different types
3. 📝  BETTER INTELLISENSE - Full autocompletion and type checking
4. 🚀  PERFORMANCE - No runtime type checking needed
5. 🧹  CLEANER CODE - Avoid duplicate code for different types

❌ WITHOUT GENERICS (Problems):
function getFirstItem(array: any[]): any {
    return array[0];  // Returns 'any' - no type safety!
}

✅ WITH GENERICS (Type Safe):
function getFirstItem<T>(array: T[]): T {
    return array[0];  // Returns exact type T - full type safety!
}

The <T> is a "type parameter" - a placeholder for the actual type.
*/

// ===== BASIC GENERIC FUNCTIONS =====
console.log("\n=== Basic Generic Functions ===");

// Simple generic function
function identity<T>(value: T): T {
    return value;
}

// Usage - TypeScript infers the type
const stringResult = identity("hello");        // Type: string
const numberResult = identity(42);             // Type: number
const booleanResult = identity(true);          // Type: boolean

// You can also explicitly specify the type
const explicitString = identity<string>("world");
const explicitNumber = identity<number>(100);

console.log("String result:", stringResult);
console.log("Number result:", numberResult);
console.log("Boolean result:", booleanResult);

// Generic function with array
function getFirstElement<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[0] : undefined;
}

const firstString = getFirstElement(["apple", "banana", "cherry"]);  // string | undefined
const firstNumber = getFirstElement([1, 2, 3, 4, 5]);               // number | undefined
const firstBoolean = getFirstElement([true, false]);                // boolean | undefined

console.log("First string:", firstString);
console.log("First number:", firstNumber);
console.log("First boolean:", firstBoolean);

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const stringNumberPair = pair("hello", 42);           // [string, number]
const booleanStringPair = pair(true, "world");        // [boolean, string]
const numberArrayPair = pair(100, [1, 2, 3]);         // [number, number[]]

console.log("String-Number pair:", stringNumberPair);
console.log("Boolean-String pair:", booleanStringPair);
console.log("Number-Array pair:", numberArrayPair);

// ===== GENERIC INTERFACES =====
console.log("\n=== Generic Interfaces ===");

// Generic interface for key-value pairs
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

// Usage with different types
const stringNumberKV: KeyValuePair<string, number> = {
    key: "age",
    value: 25
};

const numberBooleanKV: KeyValuePair<number, boolean> = {
    key: 1,
    value: true
};

const stringArrayKV: KeyValuePair<string, string[]> = {
    key: "colors",
    value: ["red", "green", "blue"]
};

console.log("String-Number KV:", stringNumberKV);
console.log("Number-Boolean KV:", numberBooleanKV);
console.log("String-Array KV:", stringArrayKV);

// Generic interface for API responses
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    timestamp: Date;
}

// Different API response types
const userResponse: ApiResponse<{ id: number; name: string; email: string }> = {
    success: true,
    data: { id: 1, name: "John", email: "john@example.com" },
    message: "User retrieved successfully",
    timestamp: new Date()
};

const productsResponse: ApiResponse<{ id: number; title: string; price: number }[]> = {
    success: true,
    data: [
        { id: 1, title: "Laptop", price: 999 },
        { id: 2, title: "Mouse", price: 25 }
    ],
    message: "Products retrieved successfully",
    timestamp: new Date()
};

console.log("User response:", userResponse);
console.log("Products response:", productsResponse);

// ===== GENERIC CLASSES =====
console.log("\n=== Generic Classes ===");

// Generic storage class
class Storage<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
        console.log(`Added item:`, item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    getAll(): T[] {
        return [...this.items];  // Return copy
    }
    
    remove(index: number): T | undefined {
        if (index >= 0 && index < this.items.length) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }
    
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
    
    filter(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
    
    count(): number {
        return this.items.length;
    }
}


const numberStorage = new Storage<number>();
numberStorage.add(10);
numberStorage.add(20);
numberStorage.add(30);

// Type for users
interface User {
    id: number;
    name: string;
    email: string;
}

const userStorage = new Storage<User>();
userStorage.add({ id: 1, name: "Alice", email: "alice@example.com" });
userStorage.add({ id: 2, name: "Bob", email: "bob@example.com" });

console.log("String storage:", stringStorage.getAll());
console.log("Number storage:", numberStorage.getAll());
console.log("User storage:", userStorage.getAll());

// Using generic methods
const firstUser = userStorage.find(user => user.name === "Alice");
const usersWithGmail = userStorage.filter(user => user.email.includes("@example.com"));

console.log("Found user:", firstUser);
console.log("Gmail users:", usersWithGmail);

// ===== GENERIC CONSTRAINTS =====
console.log("\n=== Generic Constraints ===");

/*
GENERIC CONSTRAINTS allow you to LIMIT what types can be used with generics.
Use 'extends' keyword to specify constraints.

🎯 WHY USE CONSTRAINTS?
• Access specific properties/methods on the generic type
• Ensure the type has certain characteristics
• Provide better type safety and IntelliSense
• Express relationships between type parameters
*/

// Constraint: T must have a 'length' property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;  // TypeScript knows T has length property
}

// These all work because they have 'length' property
console.log("String length:", getLength("hello"));           // 5
console.log("Array length:", getLength([1, 2, 3, 4]));       // 4
console.log("Custom object:", getLength({ length: 10 }));    // 10

// This would cause an error:
// console.log(getLength(42)); // Error: number doesn't have length property

// Constraint: T must extend a specific interface
interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);  // TypeScript knows T has id property
}

// Usage with different types that have 'id'
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

const products = [
    { id: 1, title: "Laptop", price: 999, category: "Electronics" },
    { id: 2, title: "Book", price: 20, category: "Education" }
];

const foundUser = findById(users, 1);
const foundProduct = findById(products, 2);

console.log("Found user:", foundUser);
console.log("Found product:", foundProduct);

// Constraint: T must be a key of U (keyof constraint)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "John", age: 30, city: "New York" };

const personName = getProperty(person, "name");    // Type: string
const personAge = getProperty(person, "age");      // Type: number
const personCity = getProperty(person, "city");    // Type: string

// This would cause an error:
// const invalid = getProperty(person, "salary"); // Error: "salary" doesn't exist on person

console.log("Person name:", personName);
console.log("Person age:", personAge);
console.log("Person city:", personCity);

// ===== CONDITIONAL TYPES =====
console.log("\n=== Conditional Types ===");

// Conditional type: T extends string ? string[] : T[]
type ArrayWrapper<T> = T extends string ? string[] : T[];

type StringArrayWrapper = ArrayWrapper<string>;  // string[]
type NumberArrayWrapper = ArrayWrapper<number>;  // number[]

// More complex conditional type
type ApiResult<T> = T extends string 
    ? { message: T } 
    : T extends number 
    ? { code: T } 
    : { data: T };

type StringResult = ApiResult<string>;  // { message: string }
type NumberResult = ApiResult<number>;  // { code: number }
type ObjectResult = ApiResult<User>;    // { data: User }

// Function using conditional types
function processApiResult<T>(input: T): ApiResult<T> {
    if (typeof input === 'string') {
        return { message: input } as ApiResult<T>;
    } else if (typeof input === 'number') {
        return { code: input } as ApiResult<T>;
    } else {
        return { data: input } as ApiResult<T>;
    }
}

const stringApiResult = processApiResult("Success");
const numberApiResult = processApiResult(200);
const objectApiResult = processApiResult({ id: 1, name: "Test" });

console.log("String API result:", stringApiResult);
console.log("Number API result:", numberApiResult);
console.log("Object API result:", objectApiResult);

// ===== UTILITY TYPES =====
console.log("\n=== Utility Types ===");

/*
TypeScript provides built-in UTILITY TYPES that use generics:

🔧 COMMON UTILITY TYPES:
• Partial<T> - Makes all properties optional
• Required<T> - Makes all properties required
• Pick<T, K> - Pick specific properties
• Omit<T, K> - Omit specific properties
• Record<K, T> - Create object type with keys K and values T
• Exclude<T, U> - Exclude types from union
• Extract<T, U> - Extract types from union
• NonNullable<T> - Remove null and undefined
• ReturnType<T> - Get return type of function
• Parameters<T> - Get parameters of function as tuple
*/

// Original interface
interface FullUser {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

// Partial - all properties optional
type PartialUser = Partial<FullUser>;
const updateUser: PartialUser = {
    name: "Updated Name"  // Only name, others optional
};

// Required - all properties required (opposite of Partial)
interface OptionalUser {
    id?: number;
    name?: string;
    email?: string;
}
type RequiredUser = Required<OptionalUser>;  // All properties now required

// Pick - select specific properties
type UserSummary = Pick<FullUser, "id" | "name" | "email">;
const summary: UserSummary = {
    id: 1,
    name: "John",
    email: "john@example.com"
    // age and isActive not needed
};

// Omit - exclude specific properties
type UserWithoutId = Omit<FullUser, "id">;
const newUser: UserWithoutId = {
    name: "Jane",
    email: "jane@example.com",
    age: 25,
    isActive: true
    // id omitted
};

// Record - create object type
type UserRoles = Record<string, string>;
const roles: UserRoles = {
    "admin": "Administrator",
    "user": "Regular User",
    "moderator": "Moderator"
};

type StatusCodes = Record<number, string>;
const httpCodes: StatusCodes = {
    200: "OK",
    404: "Not Found",
    500: "Internal Server Error"
};

// NonNullable - remove null and undefined
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;  // just string

// ReturnType and Parameters
function createUser(name: string, age: number): FullUser {
    return {
        id: Math.random(),
        name,
        email: `${name.toLowerCase()}@example.com`,
        age,
        isActive: true
    };
}

type CreateUserReturn = ReturnType<typeof createUser>;  // FullUser
type CreateUserParams = Parameters<typeof createUser>;  // [string, number]

console.log("Update user:", updateUser);
console.log("User summary:", summary);
console.log("New user:", newUser);
console.log("Roles:", roles);
console.log("HTTP codes:", httpCodes);

// ===== ADVANCED GENERIC PATTERNS =====
console.log("\n=== Advanced Generic Patterns ===");

// Generic factory pattern
interface Constructable<T = {}> {
    new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructable<T>, ...args: any[]): T {
    return new ctor(...args);
}

class Product {
    constructor(public name: string, public price: number) {}
    
    getInfo(): string {
        return `${this.name}: $${this.price}`;
    }
}

class Service {
    constructor(public name: string) {}
    
    start(): string {
        return `${this.name} service started`;
    }
}

// Using the factory
const product = createInstance(Product, "Laptop", 999);
const service = createInstance(Service, "Auth");

console.log("Created product:", product.getInfo());
console.log("Created service:", service.start());

// Generic builder pattern
class QueryBuilder<T> {
    private conditions: string[] = [];
    private selectFields: string[] = [];
    private orderByField?: string;
    private limitValue?: number;
    
    select(...fields: (keyof T)[]): QueryBuilder<T> {
        this.selectFields = fields.map(f => String(f));
        return this;
    }
    
    where(field: keyof T, operator: string, value: any): QueryBuilder<T> {
        this.conditions.push(`${String(field)} ${operator} '${value}'`);
        return this;
    }
    
    orderBy(field: keyof T): QueryBuilder<T> {
        this.orderByField = String(field);
        return this;
    }
    
    limit(count: number): QueryBuilder<T> {
        this.limitValue = count;
        return this;
    }
    
    build(): string {
        let query = "SELECT ";
        query += this.selectFields.length > 0 ? this.selectFields.join(", ") : "*";
        query += " FROM table";
        
        if (this.conditions.length > 0) {
            query += " WHERE " + this.conditions.join(" AND ");
        }
        
        if (this.orderByField) {
            query += ` ORDER BY ${this.orderByField}`;
        }
        
        if (this.limitValue) {
            query += ` LIMIT ${this.limitValue}`;
        }
        
        return query;
    }
}

// Usage with type safety
const userQuery = new QueryBuilder<FullUser>()
    .select("id", "name", "email")
    .where("age", ">", 18)
    .where("isActive", "=", true)
    .orderBy("name")
    .limit(10)
    .build();

console.log("Generated query:", userQuery);

// Generic repository pattern
interface Repository<T, ID> {
    findById(id: ID): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<T>;
    delete(id: ID): Promise<boolean>;
}

class InMemoryRepository<T extends { id: ID }, ID> implements Repository<T, ID> {
    private items: T[] = [];
    
    async findById(id: ID): Promise<T | null> {
        const item = this.items.find(item => item.id === id);
        return item || null;
    }
    
    async findAll(): Promise<T[]> {
        return [...this.items];
    }
    
    async save(entity: T): Promise<T> {
        const existingIndex = this.items.findIndex(item => item.id === entity.id);
        
        if (existingIndex >= 0) {
            this.items[existingIndex] = entity;
        } else {
            this.items.push(entity);
        }
        
        console.log(`Saved entity with ID: ${entity.id}`);
        return entity;
    }
    
    async delete(id: ID): Promise<boolean> {
        const index = this.items.findIndex(item => item.id === id);
        
        if (index >= 0) {
            this.items.splice(index, 1);
            console.log(`Deleted entity with ID: ${id}`);
            return true;
        }
        
        return false;
    }
}

// Usage
const userRepository = new InMemoryRepository<FullUser, number>();

async function demonstrateRepository() {
    // Save users
    await userRepository.save({
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        age: 25,
        isActive: true
    });
    
    await userRepository.save({
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        age: 30,
        isActive: false
    });
    
    // Find user
    const user = await userRepository.findById(1);
    console.log("Found user:", user);
    
    // Get all users
    const allUsers = await userRepository.findAll();
    console.log("All users:", allUsers);
    
    // Delete user
    const deleted = await userRepository.delete(2);
    console.log("User deleted:", deleted);
    
    // Check remaining users
    const remainingUsers = await userRepository.findAll();
    console.log("Remaining users:", remainingUsers);
}

demonstrateRepository();

// ===== GENERIC BEST PRACTICES =====
console.log("\n=== Generic Best Practices ===");

/*
✅ GENERIC BEST PRACTICES:

1. 🎯  USE MEANINGFUL TYPE PARAMETER NAMES
   • Single letter: T, U, V for simple cases
   • Descriptive: TUser, TRequest, TResponse for complex cases

2. 🛡️  ADD CONSTRAINTS WHEN NEEDED
   • Use 'extends' to limit what types can be used
   • Provides better IntelliSense and type safety

3. 🔧  PROVIDE DEFAULT TYPES
   • Use default types for optional type parameters
   • Makes APIs easier to use

4. ⚡  LET TYPESCRIPT INFER TYPES WHEN POSSIBLE
   • Don't always explicitly specify types
   • TypeScript is usually smart enough to infer

5. 📝  DOCUMENT GENERIC FUNCTIONS AND CLASSES
   • Explain what type parameters represent
   • Provide usage examples

6. 🚀  USE UTILITY TYPES
   • Leverage built-in utility types like Partial, Pick, etc.
   • Don't reinvent the wheel

❌ COMMON MISTAKES:
• Using 'any' instead of proper generics
• Not constraining generic types when needed
• Over-complicating with too many type parameters
• Not providing default types for optional parameters
• Using generics when simple types would suffice

🎯 WHEN TO USE GENERICS:
✅ When you need to work with multiple types
✅ When you want type safety without code duplication
✅ When creating reusable libraries or utilities
✅ When you need to preserve type information

❌ WHEN NOT TO USE GENERICS:
• When you only work with one specific type
• When 'any' would actually be appropriate (rare)
• When it makes the code unnecessarily complex
• When simple function overloads would be clearer
*/

// Example of good generic design
interface CacheEntry<T> {
    key: string;
    value: T;
    expiry: Date;
}

class Cache<T = any> {  // Default type parameter
    private entries = new Map<string, CacheEntry<T>>();
    
    set(key: string, value: T, ttlMinutes: number = 60): void {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + ttlMinutes);
        
        this.entries.set(key, { key, value, expiry });
        console.log(`Cached ${key} with TTL ${ttlMinutes} minutes`);
    }
    
    get(key: string): T | null {
        const entry = this.entries.get(key);
        
        if (!entry) {
            return null;
        }
        
        if (entry.expiry < new Date()) {
            this.entries.delete(key);
            console.log(`Cache entry ${key} expired`);
            return null;
        }
        
        return entry.value;
    }
    
    has(key: string): boolean {
        return this.get(key) !== null;
    }
    
    clear(): void {
        this.entries.clear();
        console.log("Cache cleared");
    }
}

// Usage examples
const stringCache = new Cache<string>();
const userCache = new Cache<FullUser>();
const anyCache = new Cache();  // Uses default 'any' type

stringCache.set("greeting", "Hello World", 30);
userCache.set("user:1", { id: 1, name: "Alice", email: "alice@example.com", age: 25, isActive: true }, 120);

console.log("Cached greeting:", stringCache.get("greeting"));
console.log("Cached user:", userCache.get("user:1"));

// ===== SUMMARY =====
console.log("\n=== Generics Summary ===");
console.log("🎯 GENERICS ENABLE:");
console.log("   • Type-safe code reuse");
console.log("   • Better IntelliSense and error checking");
console.log("   • Flexible APIs that work with multiple types");
console.log("   • Clean, maintainable code");
console.log("");
console.log("🔧 KEY CONCEPTS:");
console.log("   • Type parameters (<T>) are placeholders for actual types");
console.log("   • Constraints (extends) limit what types can be used");
console.log("   • Utility types provide common generic transformations");
console.log("   • Conditional types enable advanced type logic");
console.log("");
console.log("✅ REMEMBER:");
console.log("   • Generics = Type safety + Reusability");
console.log("   • Use constraints to access properties/methods");
console.log("   • Let TypeScript infer types when possible");
console.log("   • Utility types are your friends!");
console.log("   • Generics make TypeScript truly powerful! 🚀");

export {}; 