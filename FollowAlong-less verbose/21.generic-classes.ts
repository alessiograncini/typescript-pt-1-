// ===== GENERIC CLASSES IN TYPESCRIPT =====
// Understanding generic classes: reusable class blueprints with type safety

// ===== WHAT ARE GENERIC CLASSES? =====
console.log("=== What Are Generic Classes? ===");

/*
GENERIC CLASSES are class templates that work with MULTIPLE TYPES while maintaining type safety.

🎯 THINK OF GENERIC CLASSES AS:
• "Class Templates" - one class definition, many type-specific instances
• "Type-Safe Containers" - hold any type while preserving type information
• "Reusable Blueprints" - write once, use with different types

🔧 WHY USE GENERIC CLASSES?
1. 🛡️  TYPE SAFETY - No casting or 'any' types needed
2. 🔄  REUSABILITY - One class works with many types
3. 📝  BETTER INTELLISENSE - Full autocompletion for the specific type
4. 🚀  PERFORMANCE - No runtime type checking overhead
5. 🧹  CLEANER CODE - Avoid duplicate class definitions

❌ WITHOUT GENERIC CLASSES (Problems):
class StringList {
    private items: string[] = [];
    add(item: string) { this.items.push(item); }
    get(index: number): string { return this.items[index]; }
}
class NumberList {
    private items: number[] = [];
    add(item: number) { this.items.push(item); }
    get(index: number): number { return this.items[index]; }
}
// Duplicate code for every type! 😱

✅ WITH GENERIC CLASSES (Clean & Reusable):
class List<T> {
    private items: T[] = [];
    add(item: T) { this.items.push(item); }
    get(index: number): T { return this.items[index]; }
}
// One class, works with any type! 🎯
*/

// ===== BASIC GENERIC CLASS =====
console.log("\n=== Basic Generic Class ===");

// Simple generic container class
class Container<T> {
    private value: T;

    constructor(initialValue: T) {
        this.value = initialValue;
        console.log(`📦 Container created with value:`, initialValue);
    }

    get(): T {
        return this.value;
    }

    set(newValue: T): void {
        this.value = newValue;
        console.log(`📦 Container updated with value:`, newValue);
    }

    toString(): string {
        return `Container(${this.value})`;
    }
}

// Usage with different types
const stringContainer = new Container<string>("Hello World");
const numberContainer = new Container<number>(42);
const booleanContainer = new Container<boolean>(true);

console.log("String container:", stringContainer.get());
console.log("Number container:", numberContainer.get());
console.log("Boolean container:", booleanContainer.get());

stringContainer.set("Updated Hello");
numberContainer.set(100);
console.log("Updated containers:", stringContainer.toString(), numberContainer.toString());

// ===== GENERIC COLLECTION CLASSES =====
console.log("\n=== Generic Collection Classes ===");

// Generic stack implementation
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
        console.log(`📚 Pushed to stack:`, item);
    }

    pop(): T | undefined {
        const item = this.items.pop();
        console.log(`📚 Popped from stack:`, item);
        return item;
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    toArray(): T[] {
        return [...this.items]; // Return copy
    }
}

// Generic queue implementation
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
        console.log(`🚶 Enqueued:`, item);
    }

    dequeue(): T | undefined {
        const item = this.items.shift();
        console.log(`🚶 Dequeued:`, item);
        return item;
    }

    front(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    toArray(): T[] {
        return [...this.items]; // Return copy
    }
}

// Testing collection classes
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("Stack peek:", numberStack.peek());
console.log("Stack array:", numberStack.toArray());

const stringQueue = new Queue<string>();
stringQueue.enqueue("first");
stringQueue.enqueue("second");
stringQueue.enqueue("third");
console.log("Queue front:", stringQueue.front());
stringQueue.dequeue();
console.log("Queue after dequeue:", stringQueue.toArray());

// ===== GENERIC CLASS WITH CONSTRAINTS =====
console.log("\n=== Generic Class with Constraints ===");

// Base interface for objects with id
interface HasId {
    id: number;
}

// Generic repository class with constraint
class Repository<T extends HasId> {
    private items: T[] = [];
    private nextId: number = 1;

    add(item: Omit<T, 'id'>): T {
        const newItem = { ...item, id: this.nextId++ } as T;
        this.items.push(newItem);
        console.log(`🗄️ Added to repository:`, newItem);
        return newItem;
    }

    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    findAll(): T[] {
        return [...this.items]; // Return copy
    }

    update(id: number, updates: Partial<Omit<T, 'id'>>): T | undefined {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updates };
            console.log(`🗄️ Updated item ${id}:`, this.items[index]);
            return this.items[index];
        }
        return undefined;
    }

    delete(id: number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = this.items.splice(index, 1)[0];
            console.log(`🗄️ Deleted from repository:`, deleted);
            return true;
        }
        return false;
    }

    count(): number {
        return this.items.length;
    }
}

// Types that extend HasId
interface User extends HasId {
    name: string;
    email: string;
    age: number;
}

interface Product extends HasId {
    name: string;
    price: number;
    category: string;
}

// Usage with constrained generic class
const userRepository = new Repository<User>();
const productRepository = new Repository<Product>();

const user1 = userRepository.add({ name: "Alice", email: "alice@example.com", age: 25 });
const user2 = userRepository.add({ name: "Bob", email: "bob@example.com", age: 30 });

const product1 = productRepository.add({ name: "Laptop", price: 999, category: "Electronics" });
const product2 = productRepository.add({ name: "Book", price: 20, category: "Education" });

console.log("Found user:", userRepository.findById(1));
console.log("All products:", productRepository.findAll());

userRepository.update(1, { age: 26 });
productRepository.delete(2);

console.log("User count:", userRepository.count());
console.log("Product count:", productRepository.count());

// ===== MULTIPLE TYPE PARAMETERS =====
console.log("\n=== Multiple Type Parameters ===");

// Generic key-value store
class KeyValueStore<K, V> {
    private store = new Map<K, V>();

    set(key: K, value: V): void {
        this.store.set(key, value);
        console.log(`🔑 Set key-value:`, key, "=>", value);
    }

    get(key: K): V | undefined {
        return this.store.get(key);
    }

    has(key: K): boolean {
        return this.store.has(key);
    }

    delete(key: K): boolean {
        const deleted = this.store.delete(key);
        if (deleted) {
            console.log(`🔑 Deleted key:`, key);
        }
        return deleted;
    }

    keys(): K[] {
        return Array.from(this.store.keys());
    }

    values(): V[] {
        return Array.from(this.store.values());
    }

    entries(): [K, V][] {
        return Array.from(this.store.entries());
    }

    size(): number {
        return this.store.size;
    }

    clear(): void {
        this.store.clear();
        console.log(`🔑 Store cleared`);
    }
}

// Usage with different key-value types
const stringNumberStore = new KeyValueStore<string, number>();
stringNumberStore.set("age", 25);
stringNumberStore.set("score", 100);

const numberStringStore = new KeyValueStore<number, string>();
numberStringStore.set(1, "first");
numberStringStore.set(2, "second");

const userStore = new KeyValueStore<string, User>();
userStore.set("alice", user1);
userStore.set("bob", user2);

console.log("String-Number store:", stringNumberStore.entries());
console.log("Number-String store:", numberStringStore.entries());
console.log("User store keys:", userStore.keys());

// ===== GENERIC CLASS INHERITANCE =====
console.log("\n=== Generic Class Inheritance ===");

// Base generic class
abstract class BaseCollection<T> {
    protected items: T[] = [];

    constructor(initialItems: T[] = []) {
        this.items = [...initialItems];
        console.log(`📋 BaseCollection created with ${this.items.length} items`);
    }

    add(item: T): void {
        this.items.push(item);
        this.onItemAdded(item);
    }

    remove(index: number): T | undefined {
        if (index >= 0 && index < this.items.length) {
            const removed = this.items.splice(index, 1)[0];
            this.onItemRemoved(removed);
            return removed;
        }
        return undefined;
    }

    getAll(): T[] {
        return [...this.items]; // Return copy
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Abstract methods that subclasses must implement
    protected abstract onItemAdded(item: T): void;
    protected abstract onItemRemoved(item: T): void;
    
    // Template method
    abstract toString(): string;
}

// Derived generic class
class ObservableList<T> extends BaseCollection<T> {
    private listeners: ((item: T, action: 'added' | 'removed') => void)[] = [];

    addListener(listener: (item: T, action: 'added' | 'removed') => void): void {
        this.listeners.push(listener);
        console.log(`👂 Listener added to ObservableList`);
    }

    removeListener(listener: (item: T, action: 'added' | 'removed') => void): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
            console.log(`👂 Listener removed from ObservableList`);
        }
    }

    protected onItemAdded(item: T): void {
        console.log(`📋 Item added to ObservableList:`, item);
        this.notifyListeners(item, 'added');
    }

    protected onItemRemoved(item: T): void {
        console.log(`📋 Item removed from ObservableList:`, item);
        this.notifyListeners(item, 'removed');
    }

    private notifyListeners(item: T, action: 'added' | 'removed'): void {
        this.listeners.forEach(listener => listener(item, action));
    }

    toString(): string {
        return `ObservableList[${this.items.join(', ')}]`;
    }
}

// Another derived generic class
class SortedList<T> extends BaseCollection<T> {
    private compareFn: (a: T, b: T) => number;

    constructor(compareFn: (a: T, b: T) => number, initialItems: T[] = []) {
        super();
        this.compareFn = compareFn;
        
        // Add and sort initial items
        initialItems.forEach(item => this.add(item));
    }

    add(item: T): void {
        this.items.push(item);
        this.items.sort(this.compareFn);
        this.onItemAdded(item);
    }

    protected onItemAdded(item: T): void {
        console.log(`📊 Item added to SortedList:`, item);
    }

    protected onItemRemoved(item: T): void {
        console.log(`📊 Item removed from SortedList:`, item);
    }

    toString(): string {
        return `SortedList[${this.items.join(', ')}]`;
    }
}

// Testing inheritance
const observableNumbers = new ObservableList<number>();
observableNumbers.addListener((item, action) => {
    console.log(`🔔 Notification: ${item} was ${action}`);
});

observableNumbers.add(5);
observableNumbers.add(3);
observableNumbers.add(8);
console.log(observableNumbers.toString());

const sortedStrings = new SortedList<string>((a, b) => a.localeCompare(b));
sortedStrings.add("zebra");
sortedStrings.add("apple");
sortedStrings.add("banana");
console.log(sortedStrings.toString());

// ===== STATIC METHODS IN GENERIC CLASSES =====
console.log("\n=== Static Methods in Generic Classes ===");

class Utility<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    // Static methods can't use class type parameters
    // They need their own type parameters
    static create<U>(value: U): Utility<U> {
        console.log(`🔧 Creating utility with value:`, value);
        return new Utility(value);
    }

    static combine<U>(utilities: Utility<U>[]): U[] {
        console.log(`🔧 Combining ${utilities.length} utilities`);
        return utilities.map(util => util.getValue());
    }

    static isEqual<U>(util1: Utility<U>, util2: Utility<U>): boolean {
        return util1.getValue() === util2.getValue();
    }

    // Static factory methods for common types
    static createString(value: string): Utility<string> {
        return Utility.create(value);
    }

    static createNumber(value: number): Utility<number> {
        return Utility.create(value);
    }

    static createArray<U>(values: U[]): Utility<U[]> {
        return Utility.create(values);
    }
}

// Usage of static methods
const util1 = Utility.create("Hello");
const util2 = Utility.createString("World");
const util3 = Utility.createNumber(42);
const util4 = Utility.createArray([1, 2, 3]);

console.log("Utilities created:", util1.getValue(), util2.getValue(), util3.getValue(), util4.getValue());

const combined = Utility.combine([util1, util2]);
console.log("Combined string utilities:", combined);

console.log("Are util1 and util2 equal?", Utility.isEqual(util1, util2));

// ===== REAL-WORLD EXAMPLES =====
console.log("\n=== Real-World Examples ===");

// Example 1: Database connection class (from your screenshot)
interface Database {
    connection: string;
    username: string;
    password: string;
}

class DatabaseConnection<T extends Database> {
    private config: T;
    private isConnected: boolean = false;

    constructor(config: T) {
        this.config = config;
        console.log(`💾 Database connection created for: ${config.connection}`);
    }

    connect(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.isConnected = true;
                console.log(`💾 Connected to database: ${this.config.connection}`);
                console.log(`💾 Username: ${this.config.username}`);
                resolve();
            }, 100);
        });
    }

    disconnect(): void {
        this.isConnected = false;
        console.log(`💾 Disconnected from database: ${this.config.connection}`);
    }

    isActive(): boolean {
        return this.isConnected;
    }

    getConfig(): T {
        return { ...this.config }; // Return copy
    }

    query<R>(sql: string): Promise<R[]> {
        if (!this.isConnected) {
            throw new Error("Database not connected");
        }
        
        console.log(`💾 Executing query: ${sql}`);
        // Simulate query execution
        return Promise.resolve([] as R[]);
    }
}

// Specific database types
interface MySQLDatabase extends Database {
    port: number;
    charset: string;
}

interface PostgreSQLDatabase extends Database {
    schema: string;
    sslMode: boolean;
}

// Usage with different database types
const mysqlConfig: MySQLDatabase = {
    connection: "mysql://localhost",
    username: "admin",
    password: "secret",
    port: 3306,
    charset: "utf8"
};

const postgresConfig: PostgreSQLDatabase = {
    connection: "postgresql://localhost",
    username: "admin",
    password: "secret",
    schema: "public",
    sslMode: true
};

const mysqlConnection = new DatabaseConnection(mysqlConfig);
const postgresConnection = new DatabaseConnection(postgresConfig);

// Example 2: Course management system (from your screenshot)
interface Course {
    name: string;
    author: string;
    subject: string;
}

class Sellable<T extends Course> {
    public cart: T[] = [];

    constructor() {
        console.log(`🛒 Sellable cart created`);
    }

    addToCart(product: T): void {
        this.cart.push(product);
        console.log(`🛒 Added to cart:`, product.name);
    }

    removeFromCart(index: number): T | undefined {
        if (index >= 0 && index < this.cart.length) {
            const removed = this.cart.splice(index, 1)[0];
            console.log(`🛒 Removed from cart:`, removed.name);
            return removed;
        }
        return undefined;
    }

    getCart(): T[] {
        return [...this.cart];
    }

    getTotalItems(): number {
        return this.cart.length;
    }

    clearCart(): void {
        const count = this.cart.length;
        this.cart = [];
        console.log(`🛒 Cart cleared. Removed ${count} items.`);
    }

    getCartSummary(): string {
        return this.cart.map(item => `${item.name} by ${item.author}`).join(', ');
    }
}

// Specific course types
interface VideoLecture extends Course {
    duration: number; // in minutes
    videoQuality: string;
}

interface EBook extends Course {
    pages: number;
    format: string;
}

interface LiveWorkshop extends Course {
    startDate: Date;
    duration: number; // in hours
    maxParticipants: number;
}

// Usage with different course types
const videoLectureCart = new Sellable<VideoLecture>();
const eBookCart = new Sellable<EBook>();
const workshopCart = new Sellable<LiveWorkshop>();

const videoLecture1: VideoLecture = {
    name: "TypeScript Mastery",
    author: "John Doe",
    subject: "Programming",
    duration: 180,
    videoQuality: "4K"
};

const eBook1: EBook = {
    name: "Clean Code Principles",
    author: "Jane Smith",
    subject: "Software Engineering",
    pages: 350,
    format: "PDF"
};

const workshop1: LiveWorkshop = {
    name: "React Advanced Patterns",
    author: "Mike Johnson",
    subject: "Frontend Development",
    startDate: new Date("2024-03-15"),
    duration: 8,
    maxParticipants: 50
};

videoLectureCart.addToCart(videoLecture1);
eBookCart.addToCart(eBook1);
workshopCart.addToCart(workshop1);

console.log("Video lecture cart:", videoLectureCart.getCartSummary());
console.log("E-book cart:", eBookCart.getCartSummary());
console.log("Workshop cart:", workshopCart.getCartSummary());

// Example 3: Generic event emitter
class EventEmitter<T extends Record<string, any[]>> {
    private listeners = new Map<keyof T, ((...args: any[]) => void)[]>();

    on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
        console.log(`🎧 Listener added for event: ${String(event)}`);
    }

    off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index !== -1) {
                eventListeners.splice(index, 1);
                console.log(`🎧 Listener removed for event: ${String(event)}`);
            }
        }
    }

    emit<K extends keyof T>(event: K, ...args: T[K]): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            console.log(`🎧 Emitting event: ${String(event)} with args:`, args);
            eventListeners.forEach(listener => listener(...args));
        }
    }

    removeAllListeners<K extends keyof T>(event?: K): void {
        if (event) {
            this.listeners.delete(event);
            console.log(`🎧 All listeners removed for event: ${String(event)}`);
        } else {
            this.listeners.clear();
            console.log(`🎧 All listeners removed for all events`);
        }
    }
}

// Define event types
interface UserEvents {
    userLoggedIn: [userId: number, username: string];
    userLoggedOut: [userId: number];
    userUpdated: [userId: number, changes: Partial<User>];
}

// Usage
const userEventEmitter = new EventEmitter<UserEvents>();

userEventEmitter.on('userLoggedIn', (userId, username) => {
    console.log(`👤 User ${username} (ID: ${userId}) logged in`);
});

userEventEmitter.on('userLoggedOut', (userId) => {
    console.log(`👤 User (ID: ${userId}) logged out`);
});

userEventEmitter.on('userUpdated', (userId, changes) => {
    console.log(`👤 User (ID: ${userId}) updated:`, changes);
});

// Emit events
userEventEmitter.emit('userLoggedIn', 1, 'alice');
userEventEmitter.emit('userUpdated', 1, { age: 26 });
userEventEmitter.emit('userLoggedOut', 1);

// ===== GENERIC CLASS BEST PRACTICES =====
console.log("\n=== Generic Class Best Practices ===");

/*
✅ GENERIC CLASS BEST PRACTICES:

1. 🎯  USE MEANINGFUL TYPE PARAMETER NAMES
   ❌ class MyClass<T, U, V> { ... }
   ✅ class Repository<TEntity extends HasId> { ... }

2. 🛡️  ADD CONSTRAINTS TO ENABLE FUNCTIONALITY
   ❌ class Processor<T> { process(item: T) { return item.id; } }  // Error!
   ✅ class Processor<T extends HasId> { process(item: T) { return item.id; } }

3. 🔧  PROVIDE DEFAULT TYPE PARAMETERS
   ✅ class Cache<T = string> { ... }

4. 📝  DOCUMENT GENERIC CLASSES THOROUGHLY
   /**
    * Generic repository for entities with ID
    * @template T - Entity type that extends HasId
   

5. ⚡  USE STATIC FACTORY METHODS
   ✅ static create<U>(value: U): MyClass<U> { return new MyClass(value); }

6. 🏗️  COMBINE GENERICS WITH INHERITANCE CAREFULLY
   ✅ class SpecialList<T> extends List<T> { ... }

7. 🚀  LEVERAGE UTILITY TYPES IN GENERIC CLASSES
   ✅ update(id: number, updates: Partial<T>): T | undefined { ... }

❌ COMMON MISTAKES:

1. Too Many Type Parameters:
   ❌ class Complex<T, U, V, W, X, Y, Z> { ... }  // Hard to understand
   ✅ class Simple<T> { ... }  // Clear and focused

2. Not Using Constraints:
   ❌ class Sorter<T> { sort(items: T[]) { return items.sort(); } }  // Error!
   ✅ class Sorter<T extends { valueOf(): number }> { ... }

3. Ignoring Type Safety:
   ❌ getValue(): any { return this.value; }
   ✅ getValue(): T { return this.value; }

4. Not Providing Type Parameters:
   ❌ const list = new List();  // Uses any
   ✅ const list = new List<string>();  // Type safe

5. Overcomplicating with Generics:
   ❌ class SimpleString<T = string> { ... }  // Just use string!
   ✅ class SimpleString { ... }
*/

// Example of well-designed generic class
interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

class AuditableRepository<T extends HasId & Timestamped> {
    private items = new Map<number, T>();
    private nextId = 1;

    create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
        const now = new Date();
        const item = {
            ...data,
            id: this.nextId++,
            createdAt: now,
            updatedAt: now
        } as T;
        
        this.items.set(item.id, item);
        console.log(`📋 Created auditable item:`, item);
        return item;
    }

    update(id: number, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | undefined {
        const existing = this.items.get(id);
        if (existing) {
            const updated = {
                ...existing,
                ...updates,
                updatedAt: new Date()
            };
            this.items.set(id, updated);
            console.log(`📋 Updated auditable item:`, updated);
            return updated;
        }
        return undefined;
    }

    findById(id: number): T | undefined {
        return this.items.get(id);
    }

    findAll(): T[] {
        return Array.from(this.items.values());
    }

    getAuditTrail(id: number): { created: Date; lastUpdated: Date } | undefined {
        const item = this.items.get(id);
        if (item) {
            return {
                created: item.createdAt,
                lastUpdated: item.updatedAt
            };
        }
        return undefined;
    }
}

// Usage with proper type constraints
interface AuditableUser extends HasId, Timestamped {
    name: string;
    email: string;
}

const auditableUserRepo = new AuditableRepository<AuditableUser>();
const auditUser = auditableUserRepo.create({
    name: "Charlie",
    email: "charlie@example.com"
});

// Simulate some time passing
setTimeout(() => {
    auditableUserRepo.update(auditUser.id, { name: "Charles" });
    console.log("Audit trail:", auditableUserRepo.getAuditTrail(auditUser.id));
}, 100);

// ===== SUMMARY =====
console.log("\n=== Generic Classes Summary ===");
console.log("🎯 GENERIC CLASSES ENABLE:");
console.log("   • Type-safe class templates that work with multiple types");
console.log("   • Reusable code without sacrificing type safety");
console.log("   • Better IntelliSense and compile-time error checking");
console.log("   • Clean, maintainable object-oriented designs");
console.log("");
console.log("🔧 KEY CONCEPTS:");
console.log("   • Class type parameters: class MyClass<T> { ... }");
console.log("   • Type constraints: class Repository<T extends HasId> { ... }");
console.log("   • Multiple type parameters: class KeyValue<K, V> { ... }");
console.log("   • Inheritance with generics: class Special<T> extends Base<T> { ... }");
console.log("   • Static methods need their own type parameters");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Use meaningful type parameter names");
console.log("   • Add constraints to enable functionality");
console.log("   • Provide default type parameters when helpful");
console.log("   • Document generic classes thoroughly");
console.log("   • Combine with utility types for powerful APIs");
console.log("");
console.log("🚀 REMEMBER:");
console.log("   • Generic classes = Reusable + Type Safe + Powerful");
console.log("   • Perfect for collections, repositories, utilities");
console.log("   • Use constraints to access properties/methods");
console.log("   • Static methods can't use class type parameters");
console.log("   • Generic classes are the backbone of type-safe libraries! 🎯");

export {}; 