// ===== CLASSES IN TYPESCRIPT =====
// Classes provide a blueprint for creating objects with properties and methods

// ===== WHY DO WE NEED CONSTRUCTORS? =====
console.log("=== Why Constructors Are Essential ===");

/*
CONSTRUCTORS are special methods that:

1. 🏗️  INITIALIZE OBJECTS - Set up initial state when creating instances
2. 🎯  ENSURE REQUIRED DATA - Force you to provide necessary information
3. 🛡️  VALIDATE INPUT - Check that data is correct before creating object
4. 🔧  SETUP LOGIC - Run any initialization code needed
5. 📝  TYPE SAFETY - TypeScript ensures you pass correct parameters

WITHOUT CONSTRUCTOR (Problematic):
let user = {};  // Empty object - no structure, no validation
user.name = "Alice";  // Could forget this
user.age = "twenty"; // Wrong type - runtime error waiting to happen!

WITH CONSTRUCTOR (Safe & Structured):
let user = new User("Alice", "alice@email.com", 25);  // All required data provided
*/

// ===== SIMPLE USER CLASS =====
console.log("=== Simple User Class ===");

class User {
    // Properties (class fields)
    name: string;
    email: string;
    age: number;

    // Constructor - runs when creating new instance
    // 🎯 FORCES you to provide all required data
    // 🛡️ VALIDATES data types at compile time
    // 🏗️ INITIALIZES the object properly
    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
        
        // Constructor can also contain validation logic
        if (age < 0) {
            throw new Error("Age cannot be negative");
        }
        if (!email.includes("@")) {
            throw new Error("Invalid email format");
        }
        
        console.log(`✅ User ${name} created successfully!`);
    }

    // Methods (functions inside class)
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }

    getInfo(): string {
        return `${this.name} (${this.age}) - ${this.email}`;
    }

    // Method with parameters
    updateEmail(newEmail: string): void {
        this.email = newEmail;
        console.log(`Email updated to ${newEmail}`);
    }

    // Method with return value
    isAdult(): boolean {
        return this.age >= 18;
    }
}

// Creating instances (objects) from the class
const user1 = new User("Alice", "alice@example.com", 25);
const user2 = new User("Bob", "bob@example.com", 17);

console.log(user1.greet());          // "Hello, I'm Alice"
console.log(user1.getInfo());        // "Alice (25) - alice@example.com"
console.log(user1.isAdult());        // true

console.log(user2.greet());          // "Hello, I'm Bob"
console.log(user2.isAdult());        // false

user1.updateEmail("alice.new@example.com");

// ===== ACCESS MODIFIERS =====
console.log("\n=== Access Modifiers ===");

class UserWithPrivacy {
    // Public - accessible everywhere (default)
    public name: string;
    
    // Private - only accessible within this class
    private password: string;
    
    // Protected - accessible in this class and subclasses
    protected userId: number;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.userId = Math.random() * 1000;
    }

    // Public method
    public greet(): string {
        return `Hello, ${this.name}!`;
    }

    // Private method - only usable inside this class
    private hashPassword(): string {
        return `***${this.password.slice(-2)}`;
    }

    // Public method that uses private method
    public showSecureInfo(): string {
        return `User: ${this.name}, Password: ${this.hashPassword()}`;
    }

    // Protected method - available to subclasses
    protected getInternalId(): number {
        return this.userId;
    }
}

const secureUser = new UserWithPrivacy("Charlie", "mypassword123");

console.log(secureUser.name);           // ✅ Works - public
console.log(secureUser.greet());        // ✅ Works - public method
console.log(secureUser.showSecureInfo()); // ✅ Works - public method

// console.log(secureUser.password);    // ❌ Error - private
// console.log(secureUser.userId);      // ❌ Error - protected
// secureUser.hashPassword();           // ❌ Error - private method

// ===== READONLY PROPERTIES =====
console.log("\n=== Readonly Properties ===");

class UserWithReadonly {
    readonly id: number;               // Cannot be changed after creation
    readonly createdAt: Date;
    name: string;                      // Can be changed

    constructor(name: string) {
        this.id = Math.floor(Math.random() * 1000);
        this.createdAt = new Date();
        this.name = name;
    }

    updateName(newName: string): void {
        this.name = newName;          // ✅ Works - not readonly
        // this.id = 123;             // ❌ Error - readonly
        // this.createdAt = new Date(); // ❌ Error - readonly
    }
}

const readonlyUser = new UserWithReadonly("David");
console.log(`User ${readonlyUser.name} created with ID ${readonlyUser.id}`);

readonlyUser.updateName("David Smith");  // ✅ Works
// readonlyUser.id = 999;                // ❌ Error - readonly

// ===== CONSTRUCTOR SHORTHAND =====
console.log("\n=== Constructor Shorthand ===");

// Long way (traditional)
class UserLongWay {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

// Short way (TypeScript shorthand)
class UserShortWay {
    constructor(
        public name: string,      // Automatically creates public property
        public email: string,
        private age: number,      // Automatically creates private property
        readonly id: number = Math.random() * 1000  // With default value
    ) {
        // Constructor body can be empty or contain additional logic
        console.log(`Created user: ${name}`);
    }

    getAge(): number {
        return this.age;  // Can access private property inside class
    }
}

const shortUser = new UserShortWay("Eve", "eve@example.com", 30);
console.log(shortUser.name);    // ✅ Works - public
console.log(shortUser.getAge()); // ✅ Works - accessing private via method
// console.log(shortUser.age);  // ❌ Error - private

// ===== CLASS INHERITANCE =====
console.log("\n=== Class Inheritance ===");

// Base class (parent)
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    greet(): string {
        return `Hi, I'm ${this.name}`;
    }

    getDetails(): string {
        return `${this.name} is ${this.age} years old`;
    }
}

// Derived class (child) - extends Person
class Student extends Person {
    constructor(
        name: string,
        age: number,
        public studentId: string,
        public course: string
    ) {
        super(name, age);  // Call parent constructor
    }

    // Override parent method
    greet(): string {
        return `Hi, I'm ${this.name}, a student studying ${this.course}`;
    }

    // New method specific to Student
    study(): string {
        return `${this.name} is studying ${this.course}`;
    }

    // Method that uses parent method
    getFullDetails(): string {
        return `${this.getDetails()} and studies ${this.course}`;
    }
}

// Another derived class
class Teacher extends Person {
    constructor(
        name: string,
        age: number,
        public subject: string,
        public salary: number
    ) {
        super(name, age);
    }

    // Override parent method
    greet(): string {
        return `Hello, I'm ${this.name}, I teach ${this.subject}`;
    }

    teach(): string {
        return `${this.name} is teaching ${this.subject}`;
    }
}

// Using inheritance
const student = new Student("Frank", 20, "S123", "Computer Science");
const teacher = new Teacher("Ms. Garcia", 35, "Mathematics", 50000);

console.log(student.greet());           // Student's version
console.log(student.study());
console.log(student.getFullDetails()); // Uses both parent and child

console.log(teacher.greet());           // Teacher's version
console.log(teacher.teach());
console.log(teacher.getDetails());      // Inherited from Person

// ===== STATIC METHODS AND PROPERTIES =====
console.log("\n=== Static Methods and Properties ===");

class UserManager {
    private static userCount: number = 0;
    static readonly maxUsers: number = 100;

    constructor(
        public name: string,
        public email: string
    ) {
        UserManager.userCount++;
        console.log(`User created. Total users: ${UserManager.userCount}`);
    }

    // Static method - called on class, not instance
    static getTotalUsers(): number {
        return UserManager.userCount;
    }

    static canCreateUser(): boolean {
        return UserManager.userCount < UserManager.maxUsers;
    }

    // Static method to create user with validation
    static createUser(name: string, email: string): UserManager | null {
        if (UserManager.canCreateUser()) {
            return new UserManager(name, email);
        } else {
            console.log("Cannot create user: limit reached");
            return null;
        }
    }

    // Instance method
    delete(): void {
        UserManager.userCount--;
        console.log(`User ${this.name} deleted. Remaining: ${UserManager.userCount}`);
    }
}

// Using static methods (called on class, not instance)
console.log(`Max users allowed: ${UserManager.maxUsers}`);
console.log(`Current users: ${UserManager.getTotalUsers()}`);

const mgr1 = UserManager.createUser("Helen", "helen@example.com");
const mgr2 = UserManager.createUser("Ivan", "ivan@example.com");

console.log(`Total users now: ${UserManager.getTotalUsers()}`);

if (mgr1) {
    mgr1.delete();
}

// ===== GETTERS AND SETTERS =====
console.log("\n=== Getters and Setters ===");

class UserWithGetSet {
    private _email: string;
    private _age: number;

    constructor(
        public name: string,
        email: string,
        age: number
    ) {
        this._email = email;
        this._age = age;
    }

    // Getter - access like a property
    get email(): string {
        return this._email;
    }

    // Setter - set like a property with validation
    set email(newEmail: string) {
        if (newEmail.includes("@")) {
            this._email = newEmail;
        } else {
            throw new Error("Invalid email format");
        }
    }

    get age(): number {
        return this._age;
    }

    set age(newAge: number) {
        if (newAge >= 0 && newAge <= 120) {
            this._age = newAge;
        } else {
            throw new Error("Age must be between 0 and 120");
        }
    }

    // Computed property using getter
    get isAdult(): boolean {
        return this._age >= 18;
    }

    get summary(): string {
        return `${this.name} (${this._age}) - ${this._email}`;
    }
}

const getSetUser = new UserWithGetSet("Jake", "jake@example.com", 25);

// Using getters (no parentheses - like properties)
console.log(getSetUser.email);     // "jake@example.com"
console.log(getSetUser.age);       // 25
console.log(getSetUser.isAdult);   // true
console.log(getSetUser.summary);   // Computed property

// Using setters (no parentheses - like properties)
getSetUser.email = "jake.new@example.com";  // ✅ Valid email
getSetUser.age = 30;                         // ✅ Valid age

console.log(getSetUser.summary);   // Updated values

// Error examples (commented to prevent runtime errors)
// getSetUser.email = "invalid-email";  // ❌ Error: Invalid email format
// getSetUser.age = -5;                 // ❌ Error: Age must be between 0 and 120

// ===== ABSTRACT CLASSES =====
console.log("\n=== Abstract Classes ===");

// Abstract class - cannot be instantiated directly
abstract class Animal {
    constructor(public name: string) {}

    // Concrete method - has implementation
    sleep(): string {
        return `${this.name} is sleeping`;
    }

    // Abstract method - must be implemented by subclasses
    abstract makeSound(): string;
    abstract move(): string;
}

// Concrete class that extends abstract class
class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }

    // Must implement abstract methods
    makeSound(): string {
        return `${this.name} barks: Woof!`;
    }

    move(): string {
        return `${this.name} runs on four legs`;
    }

    // Can add own methods
    wagTail(): string {
        return `${this.name} wags tail happily`;
    }
}

class Bird extends Animal {
    constructor(name: string, public canFly: boolean) {
        super(name);
    }

    makeSound(): string {
        return `${this.name} chirps: Tweet!`;
    }

    move(): string {
        return this.canFly ? 
            `${this.name} flies in the sky` : 
            `${this.name} hops on the ground`;
    }
}

// Cannot create Animal directly
// const animal = new Animal("Generic"); // ❌ Error: Cannot instantiate abstract class

// Can create concrete implementations
const dog = new Dog("Buddy", "Golden Retriever");
const bird = new Bird("Tweety", true);

console.log(dog.makeSound());    // "Buddy barks: Woof!"
console.log(dog.move());         // "Buddy runs on four legs"
console.log(dog.sleep());        // "Buddy is sleeping" (inherited)
console.log(dog.wagTail());      // "Buddy wags tail happily" (own method)

console.log(bird.makeSound());   // "Tweety chirps: Tweet!"
console.log(bird.move());        // "Tweety flies in the sky"

// ===== IMPLEMENTING INTERFACES =====
console.log("\n=== Classes Implementing Interfaces ===");

// Interfaces define contracts
interface Flyable {
    fly(): string;
}

interface Swimmable {
    swim(): string;
}

// Class implementing multiple interfaces
class Duck extends Animal implements Flyable, Swimmable {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return `${this.name} quacks: Quack!`;
    }

    move(): string {
        return `${this.name} waddles around`;
    }

    // Implementing Flyable interface
    fly(): string {
        return `${this.name} flies over the pond`;
    }

    // Implementing Swimmable interface
    swim(): string {
        return `${this.name} swims gracefully`;
    }
}

const duck = new Duck("Donald");
console.log(duck.makeSound());   // From Animal
console.log(duck.fly());         // From Flyable interface
console.log(duck.swim());        // From Swimmable interface

// ===== REAL-WORLD USER CLASS EXAMPLE =====
console.log("\n=== Complete User Class Example ===");

interface UserRole {
    name: string;
    permissions: string[];
}

class CompleteUser {
    private static nextId: number = 1;
    private _isActive: boolean = true;

    constructor(
        public readonly id: number = CompleteUser.nextId++,
        public name: string,
        private _email: string,
        private _role: UserRole,
        public readonly createdAt: Date = new Date()
    ) {}

    // Getters and setters
    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        if (this.isValidEmail(newEmail)) {
            this._email = newEmail;
        } else {
            throw new Error("Invalid email format");
        }
    }

    get role(): UserRole {
        return { ...this._role }; // Return copy to prevent modification
    }

    get isActive(): boolean {
        return this._isActive;
    }

    // Methods
    private isValidEmail(email: string): boolean {
        return email.includes("@") && email.includes(".");
    }

    updateRole(newRole: UserRole): void {
        this._role = newRole;
        console.log(`${this.name}'s role updated to ${newRole.name}`);
    }

    hasPermission(permission: string): boolean {
        return this._role.permissions.includes(permission);
    }

    activate(): void {
        this._isActive = true;
        console.log(`${this.name} has been activated`);
    }

    deactivate(): void {
        this._isActive = false;
        console.log(`${this.name} has been deactivated`);
    }

    getProfile(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role.name,
            isActive: this.isActive,
            createdAt: this.createdAt
        };
    }

    // Static methods
    static createAdmin(name: string, email: string): CompleteUser {
        const adminRole: UserRole = {
            name: "Admin",
            permissions: ["read", "write", "delete", "manage"]
        };
        return new CompleteUser(undefined, name, email, adminRole);
    }

    static createUser(name: string, email: string): CompleteUser {
        const userRole: UserRole = {
            name: "User",
            permissions: ["read"]
        };
        return new CompleteUser(undefined, name, email, userRole);
    }
}

// Using the complete user class
const admin = CompleteUser.createAdmin("Admin User", "admin@company.com");
const regularUser = CompleteUser.createUser("John Doe", "john@company.com");

console.log("Admin profile:", admin.getProfile());
console.log("User profile:", regularUser.getProfile());

console.log(`Admin can delete: ${admin.hasPermission("delete")}`);   // true
console.log(`User can delete: ${regularUser.hasPermission("delete")}`); // false

regularUser.deactivate();
console.log(`User is active: ${regularUser.isActive}`); // false

// ===== CLASS SUMMARY =====
console.log("\n=== Classes Summary ===");
console.log("✅ Classes are blueprints for creating objects");
console.log("✅ Constructor runs when creating new instances");
console.log("✅ Access modifiers: public, private, protected");
console.log("✅ readonly properties cannot be changed after creation");
console.log("✅ Constructor shorthand saves typing");
console.log("✅ Inheritance with extends keyword");
console.log("✅ Static methods/properties belong to class, not instances");
console.log("✅ Getters/setters provide controlled access to properties");
console.log("✅ Abstract classes define contracts for subclasses");
console.log("✅ Classes can implement interfaces");
console.log("✅ Classes provide structure and encapsulation");

export {}; 