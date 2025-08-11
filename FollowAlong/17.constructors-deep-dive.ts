// ===== CONSTRUCTORS DEEP DIVE IN TYPESCRIPT =====
// Understanding constructors: the foundation of object-oriented programming

// ===== WHY ARE CONSTRUCTORS IMPORTANT? =====
console.log("=== Why Constructors Are Essential ===");

/*
CONSTRUCTORS are the FOUNDATION of object creation because they:

1. 🏗️  INITIALIZE OBJECTS - Set up the initial state when creating instances
2. 🛡️  ENSURE DATA INTEGRITY - Validate and set required properties
3. 🎯  FORCE REQUIRED PARAMETERS - Make sure objects have necessary data
4. 🔧  SETUP COMPLEX STATE - Initialize relationships, connections, timers
5. 📝  PROVIDE TYPE SAFETY - TypeScript checks constructor parameters
6. 🚀  ENABLE DEPENDENCY INJECTION - Pass in required services/dependencies
7. 🔒  CONTROL OBJECT CREATION - Manage how objects are constructed

WITHOUT CONSTRUCTORS (Problems):
let user = {};                    // Empty object - no guarantees
user.name = "Alice";              // Could forget to set this
user.age = "twenty-five";         // Wrong type - runtime error!
user.email = "invalid";           // No validation
// Object is in inconsistent state throughout construction

WITH CONSTRUCTORS (Reliable):
let user = new User("Alice", 25, "alice@email.com");  // All required data provided
// Object is ALWAYS in a valid, consistent state
*/

// ===== BASIC CONSTRUCTOR PATTERNS =====
console.log("\n=== Basic Constructor Patterns ===");

// 1. Simple Constructor - Basic initialization
class BasicUser {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
        
        console.log(`✅ BasicUser created: ${name}`);
    }
}

// 2. Constructor with Validation
class ValidatedUser {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        // Validation before setting properties
        if (!name || name.trim().length === 0) {
            throw new Error("Name is required and cannot be empty");
        }
        
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("Valid email is required");
        }
        
        if (age < 0 || age > 150) {
            throw new Error("Age must be between 0 and 150");
        }

        this.name = name.trim();
        this.email = email.toLowerCase();
        this.age = age;
        
        console.log(`✅ ValidatedUser created: ${this.name}`);
    }
}

// 3. Constructor with Default Values
class UserWithDefaults {
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    role: string;

    constructor(
        name: string, 
        email: string, 
        age: number = 18,           // Default age
        isActive: boolean = true,   // Default active status
        role: string = "user"       // Default role
    ) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.isActive = isActive;
        this.role = role;
        
        console.log(`✅ UserWithDefaults created: ${this.name} (${this.role})`);
    }
}

// Usage examples
const basicUser = new BasicUser("John", "john@example.com", 30);
const validatedUser = new ValidatedUser("Alice", "alice@example.com", 25);
const defaultUser = new UserWithDefaults("Bob", "bob@example.com"); // Uses defaults
const customUser = new UserWithDefaults("Charlie", "charlie@example.com", 35, false, "admin");

// ===== CONSTRUCTOR SHORTHAND (PARAMETER PROPERTIES) =====
console.log("\n=== Constructor Shorthand (Parameter Properties) ===");

// Traditional way (verbose)
class TraditionalUser {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

// Shorthand way (concise) - TypeScript automatically creates properties
class ShorthandUser {
    constructor(
        public name: string,        // public property created automatically
        public email: string,       // public property created automatically
        private age: number,        // private property created automatically
        readonly id: number = Math.random() * 1000,  // readonly with default
        protected createdAt: Date = new Date()       // protected with default
    ) {
        // Constructor body can contain additional logic
        console.log(`✅ ShorthandUser created: ${name} with ID ${this.id}`);
    }

    // Can access all properties based on their modifiers
    getAge(): number {
        return this.age;  // Private property accessible inside class
    }

    getInfo(): string {
        return `${this.name} (${this.email}) - Created: ${this.createdAt.toDateString()}`;
    }
}

const shorthandUser = new ShorthandUser("David", "david@example.com", 28);
console.log(shorthandUser.name);     // ✅ Public property
console.log(shorthandUser.getAge()); // ✅ Access private property via method
console.log(shorthandUser.getInfo());

// ===== ADVANCED CONSTRUCTOR PATTERNS =====
console.log("\n=== Advanced Constructor Patterns ===");

// 1. Constructor Overloading (using union types and optional parameters)
class FlexibleUser {
    name: string;
    email: string;
    age: number;
    id: string;

    // Multiple constructor signatures
    constructor(name: string, email: string);
    constructor(name: string, email: string, age: number);
    constructor(name: string, email: string, age: number, id: string);
    constructor(
        name: string, 
        email: string, 
        age?: number, 
        id?: string
    ) {
        this.name = name;
        this.email = email;
        this.age = age ?? 18;  // Default age if not provided
        this.id = id ?? `USER_${Math.random().toString(36).substr(2, 9)}`;
        
        console.log(`✅ FlexibleUser created: ${this.name} (ID: ${this.id})`);
    }
}

// Can be called with different parameter combinations
const user1 = new FlexibleUser("Emma", "emma@example.com");
const user2 = new FlexibleUser("Frank", "frank@example.com", 32);
const user3 = new FlexibleUser("Grace", "grace@example.com", 27, "CUSTOM_ID");

// 2. Constructor with Object Parameter (Options Pattern)
interface UserOptions {
    name: string;
    email: string;
    age?: number;
    role?: string;
    isActive?: boolean;
    preferences?: {
        theme: string;
        language: string;
    };
}

class ConfigurableUser {
    name: string;
    email: string;
    age: number;
    role: string;
    isActive: boolean;
    preferences: {
        theme: string;
        language: string;
    };

    constructor(options: UserOptions) {
        // Required properties
        this.name = options.name;
        this.email = options.email;
        
        // Optional properties with defaults
        this.age = options.age ?? 18;
        this.role = options.role ?? "user";
        this.isActive = options.isActive ?? true;
        this.preferences = {
            theme: options.preferences?.theme ?? "light",
            language: options.preferences?.language ?? "en"
        };

        // Validation
        if (!this.name.trim()) {
            throw new Error("Name is required");
        }
        
        if (!this.email.includes("@")) {
            throw new Error("Valid email is required");
        }

        console.log(`✅ ConfigurableUser created: ${this.name}`);
    }

    getProfile(): object {
        return {
            name: this.name,
            email: this.email,
            age: this.age,
            role: this.role,
            isActive: this.isActive,
            preferences: this.preferences
        };
    }
}

// Clean, readable object creation
const configurableUser = new ConfigurableUser({
    name: "Helen",
    email: "helen@example.com",
    age: 29,
    role: "admin",
    preferences: {
        theme: "dark",
        language: "es"
    }
});

console.log("Configurable user profile:", configurableUser.getProfile());

// ===== CONSTRUCTOR INHERITANCE =====
console.log("\n=== Constructor Inheritance ===");

// Base class with constructor
class Animal {
    protected name: string;
    protected species: string;
    protected age: number;

    constructor(name: string, species: string, age: number) {
        this.name = name;
        this.species = species;
        this.age = age;
        
        console.log(`🐾 Animal created: ${name} (${species})`);
    }

    getInfo(): string {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }

    makeSound(): string {
        return "Some generic animal sound";
    }
}

// Derived class must call parent constructor
class Dog extends Animal {
    private breed: string;
    private isGoodBoy: boolean;

    constructor(name: string, breed: string, age: number, isGoodBoy: boolean = true) {
        // MUST call super() before accessing 'this'
        super(name, "Dog", age);  // Call parent constructor
        
        // Now can set derived class properties
        this.breed = breed;
        this.isGoodBoy = isGoodBoy;
        
        console.log(`🐕 Dog created: ${name} (${breed})`);
    }

    // Override parent method
    makeSound(): string {
        return "Woof! Woof!";
    }

    // Dog-specific methods
    getBreed(): string {
        return this.breed;
    }

    isGoodBoyCheck(): boolean {
        return this.isGoodBoy;
    }

    getFullInfo(): string {
        return `${this.getInfo()}, Breed: ${this.breed}, Good boy: ${this.isGoodBoy}`;
    }
}

class Cat extends Animal {
    private indoor: boolean;
    private livesLeft: number;

    constructor(name: string, age: number, indoor: boolean = true) {
        super(name, "Cat", age);  // Call parent constructor
        
        this.indoor = indoor;
        this.livesLeft = 9;
        
        console.log(`🐱 Cat created: ${name}`);
    }

    makeSound(): string {
        return "Meow meow";
    }

    useLive(): void {
        if (this.livesLeft > 0) {
            this.livesLeft--;
            console.log(`${this.name} used a life. Lives left: ${this.livesLeft}`);
        }
    }

    getCatInfo(): string {
        return `${this.getInfo()}, Indoor: ${this.indoor}, Lives: ${this.livesLeft}`;
    }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever", 3);
const cat = new Cat("Whiskers", 2, false);

console.log(dog.getFullInfo());
console.log(dog.makeSound());
console.log(`Is good boy: ${dog.isGoodBoyCheck()}`);

console.log(cat.getCatInfo());
console.log(cat.makeSound());
cat.useLive();

// ===== STATIC FACTORY METHODS =====
console.log("\n=== Static Factory Methods ===");

class UserFactory {
    private static nextId: number = 1;

    constructor(
        public readonly id: number,
        public name: string,
        public email: string,
        public role: string,
        public createdAt: Date
    ) {}

    // Static factory methods - alternative ways to create objects
    static createRegularUser(name: string, email: string): UserFactory {
        return new UserFactory(
            UserFactory.nextId++,
            name,
            email,
            "user",
            new Date()
        );
    }

    static createAdmin(name: string, email: string): UserFactory {
        const admin = new UserFactory(
            UserFactory.nextId++,
            name,
            email,
            "admin",
            new Date()
        );
        
        console.log(`👑 Admin user created: ${name}`);
        return admin;
    }

    static createModerator(name: string, email: string): UserFactory {
        return new UserFactory(
            UserFactory.nextId++,
            name,
            email,
            "moderator",
            new Date()
        );
    }

    // Factory method from existing data (like from database)
    static fromJson(data: any): UserFactory {
        return new UserFactory(
            data.id,
            data.name,
            data.email,
            data.role,
            new Date(data.createdAt)
        );
    }

    // Factory method with validation
    static createValidatedUser(name: string, email: string, role: string): UserFactory {
        if (!name || name.trim().length === 0) {
            throw new Error("Name is required");
        }
        
        if (!email.includes("@")) {
            throw new Error("Valid email is required");
        }
        
        const validRoles = ["user", "admin", "moderator"];
        if (!validRoles.includes(role)) {
            throw new Error(`Role must be one of: ${validRoles.join(", ")}`);
        }

        return new UserFactory(
            UserFactory.nextId++,
            name.trim(),
            email.toLowerCase(),
            role,
            new Date()
        );
    }

    getProfile(): string {
        return `${this.name} (${this.role}) - ID: ${this.id}, Created: ${this.createdAt.toDateString()}`;
    }
}

// Using factory methods - more descriptive than constructor
const regularUser = UserFactory.createRegularUser("Ivan", "ivan@example.com");
const admin = UserFactory.createAdmin("Jane", "jane@example.com");
const moderator = UserFactory.createModerator("Kevin", "kevin@example.com");

// Create from JSON data
const fromJsonUser = UserFactory.fromJson({
    id: 100,
    name: "Legacy User",
    email: "legacy@example.com",
    role: "user",
    createdAt: "2020-01-01T00:00:00Z"
});

console.log(regularUser.getProfile());
console.log(admin.getProfile());
console.log(moderator.getProfile());
console.log(fromJsonUser.getProfile());

// ===== DEPENDENCY INJECTION IN CONSTRUCTORS =====
console.log("\n=== Dependency Injection in Constructors ===");

// Services that can be injected
interface Logger {
    log(message: string): void;
}

interface Database {
    save(data: any): Promise<void>;
    find(id: string): Promise<any>;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    }
}

class MockDatabase implements Database {
    private data: Map<string, any> = new Map();

    async save(data: any): Promise<void> {
        this.data.set(data.id, data);
        console.log(`💾 Saved to database: ${data.id}`);
    }

    async find(id: string): Promise<any> {
        const result = this.data.get(id);
        console.log(`🔍 Found in database: ${id}`);
        return result;
    }
}

// Service class using dependency injection
class UserService {
    constructor(
        private logger: Logger,     // Injected dependency
        private database: Database  // Injected dependency
    ) {
        this.logger.log("UserService initialized with dependencies");
    }

    async createUser(name: string, email: string): Promise<string> {
        this.logger.log(`Creating user: ${name}`);
        
        const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        const userData = {
            id: userId,
            name,
            email,
            createdAt: new Date().toISOString()
        };

        await this.database.save(userData);
        this.logger.log(`User created successfully: ${userId}`);
        
        return userId;
    }

    async getUser(userId: string): Promise<any> {
        this.logger.log(`Retrieving user: ${userId}`);
        return await this.database.find(userId);
    }
}

// Dependency injection in action
const logger = new ConsoleLogger();
const database = new MockDatabase();
const userService = new UserService(logger, database);

// Using the service with injected dependencies
async function demonstrateUserService() {
    const userId = await userService.createUser("Mike", "mike@example.com");
    const user = await userService.getUser(userId);
    console.log("Retrieved user:", user);
}

demonstrateUserService();

// ===== WHEN TO USE DIFFERENT CONSTRUCTOR PATTERNS =====
console.log("\n=== When to Use Different Constructor Patterns ===");

/*
🎯 CONSTRUCTOR PATTERN DECISION GUIDE:

1. 📝 SIMPLE CONSTRUCTOR:
   ✅ Use when: Few parameters, straightforward initialization
   ✅ Example: Basic data classes, simple domain objects
   
2. 🛡️ CONSTRUCTOR WITH VALIDATION:
   ✅ Use when: Data integrity is critical
   ✅ Example: User registration, financial calculations
   
3. 🔧 CONSTRUCTOR WITH DEFAULTS:
   ✅ Use when: Many optional parameters
   ✅ Example: Configuration objects, UI components
   
4. ⚡ PARAMETER PROPERTIES (SHORTHAND):
   ✅ Use when: Simple property assignment without logic
   ✅ Example: DTOs, simple models, data containers
   
5. 🎛️ OPTIONS PATTERN:
   ✅ Use when: Many parameters, complex configuration
   ✅ Example: API clients, complex components
   
6. 🏭 STATIC FACTORY METHODS:
   ✅ Use when: Multiple ways to create objects
   ✅ Example: User types (admin/regular), object builders
   
7. 💉 DEPENDENCY INJECTION:
   ✅ Use when: Object needs external services
   ✅ Example: Services, repositories, complex business logic

❌ ANTI-PATTERNS TO AVOID:
   • Too many parameters (use options pattern instead)
   • Logic-heavy constructors (move to methods)
   • Constructor without validation for critical data
   • Not calling super() in derived classes
   • Throwing exceptions for expected scenarios
*/

// ===== REAL-WORLD EXAMPLES =====
console.log("\n=== Real-World Constructor Examples ===");

// E-commerce Product
class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public price: number,
        public category: string,
        public readonly createdAt: Date = new Date(),
        public isActive: boolean = true
    ) {
        // Validation
        if (price < 0) {
            throw new Error("Price cannot be negative");
        }
        
        if (!name.trim()) {
            throw new Error("Product name is required");
        }

        // Normalization
        this.name = name.trim();
        this.category = category.toLowerCase();
        
        console.log(`📦 Product created: ${this.name} - $${this.price}`);
    }

    // Factory methods for different product types
    static createDigitalProduct(name: string, price: number): Product {
        return new Product(`DIG_${Date.now()}`, name, price, "digital");
    }

    static createPhysicalProduct(name: string, price: number): Product {
        return new Product(`PHY_${Date.now()}`, name, price, "physical");
    }
}

// HTTP Client with configuration
interface HttpClientConfig {
    baseURL: string;
    timeout?: number;
    retries?: number;
    headers?: Record<string, string>;
}

class HttpClient {
    private baseURL: string;
    private timeout: number;
    private retries: number;
    private defaultHeaders: Record<string, string>;

    constructor(config: HttpClientConfig) {
        this.baseURL = config.baseURL.replace(/\/$/, ""); // Remove trailing slash
        this.timeout = config.timeout ?? 5000;
        this.retries = config.retries ?? 3;
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...config.headers
        };

        // Validation
        if (!config.baseURL) {
            throw new Error("Base URL is required");
        }

        console.log(`🌐 HTTP Client initialized: ${this.baseURL}`);
    }

    async get(endpoint: string): Promise<any> {
        const url = `${this.baseURL}/${endpoint.replace(/^\//, "")}`;
        console.log(`GET ${url} (timeout: ${this.timeout}ms, retries: ${this.retries})`);
        
        // Simulate HTTP request
        return { status: 200, data: { message: "Success" } };
    }
}

// Usage examples
const digitalProduct = Product.createDigitalProduct("TypeScript Course", 99.99);
const physicalProduct = Product.createPhysicalProduct("Programming Book", 39.99);

const apiClient = new HttpClient({
    baseURL: "https://api.example.com",
    timeout: 10000,
    retries: 5,
    headers: {
        "Authorization": "Bearer token123"
    }
});

apiClient.get("/users/123");

// ===== CONSTRUCTOR BEST PRACTICES =====
console.log("\n=== Constructor Best Practices ===");

class BestPracticesExample {
    private readonly id: string;
    private name: string;
    private email: string;
    private readonly createdAt: Date;

    constructor(name: string, email: string) {
        // ✅ 1. Validate early and fail fast
        this.validateInputs(name, email);
        
        // ✅ 2. Assign to readonly properties first
        this.id = this.generateId();
        this.createdAt = new Date();
        
        // ✅ 3. Normalize/sanitize data
        this.name = name.trim();
        this.email = email.toLowerCase().trim();
        
        // ✅ 4. Log creation for debugging
        console.log(`✅ BestPracticesExample created: ${this.id}`);
        
        // ✅ 5. Initialize any complex state last
        this.initializeComplexState();
    }

    private validateInputs(name: string, email: string): void {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error("Name must be a non-empty string");
        }
        
        if (!email || typeof email !== 'string' || !email.includes("@")) {
            throw new Error("Valid email is required");
        }
    }

    private generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private initializeComplexState(): void {
        // Any complex initialization logic goes here
        console.log("Complex state initialized");
    }

    // Public methods
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
}

const bestPracticeExample = new BestPracticesExample("Laura", "laura@example.com");
console.log(`Created object with ID: ${bestPracticeExample.getId()}`);

// ===== SUMMARY =====
console.log("\n=== Constructors Summary ===");
console.log("🏗️ CONSTRUCTORS ARE ESSENTIAL FOR:");
console.log("   • Guaranteed object initialization");
console.log("   • Data validation and integrity");
console.log("   • Type safety and compile-time checks");
console.log("   • Dependency injection and configuration");
console.log("   • Setting up complex object relationships");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Validate inputs early");
console.log("   • Keep constructors focused on initialization");
console.log("   • Use parameter properties for simple cases");
console.log("   • Use options pattern for complex configuration");
console.log("   • Always call super() first in derived classes");
console.log("   • Consider static factory methods for clarity");
console.log("   • Inject dependencies rather than creating them");
console.log("");
console.log("🎯 REMEMBER:");
console.log("   • Constructors ensure objects start in valid state");
console.log("   • They're your first line of defense against bugs");
console.log("   • Good constructors make objects reliable and predictable");
console.log("   • They enable powerful patterns like DI and factories");

export {}; 