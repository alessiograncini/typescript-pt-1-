// ===== PROTECTED MODIFIER IN TYPESCRIPT =====
// Protected allows access within the class and its subclasses, but not from outside

// ===== WHAT IS PROTECTED? =====
console.log("=== Understanding Protected Modifier ===");

/*
ACCESS MODIFIERS COMPARISON:

🔓 PUBLIC:
   • Accessible everywhere
   • Default modifier
   • Can be used by anyone

🔒 PRIVATE:
   • Only accessible within the same class
   • Cannot be accessed from subclasses
   • Completely hidden from outside

🔐 PROTECTED:
   • Accessible within the class AND its subclasses
   • Not accessible from outside the class hierarchy
   • Perfect for sharing data with child classes

WHEN TO USE PROTECTED:
• Data that subclasses need access to
• Methods that subclasses might want to override
• Internal APIs for class hierarchies
• Shared functionality between parent and child
*/

// ===== BASIC PROTECTED EXAMPLE =====
console.log("\n=== Basic Protected Example ===");

class Vehicle {
    public brand: string;           // Anyone can access
    protected engine: string;       // Only Vehicle and its subclasses
    private serialNumber: string;   // Only Vehicle class

    constructor(brand: string, engine: string, serialNumber: string) {
        this.brand = brand;
        this.engine = engine;
        this.serialNumber = serialNumber;
    }

    // Protected method - available to subclasses
    protected startEngine(): string {
        return `${this.engine} engine starting...`;
    }

    // Private method - only this class
    private generateReport(): string {
        return `Vehicle Report: ${this.brand}, Engine: ${this.engine}, SN: ${this.serialNumber}`;
    }

    // Public method that uses protected and private
    public start(): string {
        const engineStatus = this.startEngine();  // ✅ Can call protected method
        console.log(this.generateReport());       // ✅ Can call private method
        return `${this.brand} is ready to go! ${engineStatus}`;
    }
}

// Subclass can access protected members
class Car extends Vehicle {
    private doors: number;

    constructor(brand: string, engine: string, serialNumber: string, doors: number) {
        super(brand, engine, serialNumber);
        this.doors = doors;
    }

    // Can access protected properties from parent
    public getEngineInfo(): string {
        return `This car has a ${this.engine} engine`;  // ✅ Protected accessible
    }

    // Can call protected methods from parent
    public performStartup(): string {
        const engineStatus = this.startEngine();  // ✅ Protected method accessible
        return `Car startup: ${engineStatus}`;
    }

    // Can override protected methods
    protected startEngine(): string {
        return `${this.engine} car engine purring...`;  // Override parent's protected method
    }

    // Cannot access private members from parent
    public getDetails(): string {
        // return this.serialNumber;  // ❌ Error: private property not accessible
        return `${this.brand} car with ${this.doors} doors and ${this.engine} engine`;
    }
}

const car = new Car("Toyota", "V6", "SN123456", 4);

// ✅ Public access works
console.log(car.brand);              // "Toyota"
console.log(car.start());            // Public method
console.log(car.getEngineInfo());    // "This car has a V6 engine"
console.log(car.performStartup());   // Uses overridden protected method

// ❌ Protected and private access doesn't work from outside
// console.log(car.engine);          // Error: protected property
// console.log(car.startEngine());   // Error: protected method
// console.log(car.serialNumber);    // Error: private property

// ===== REAL-WORLD EXAMPLE: USER SYSTEM =====
console.log("\n=== Real-World Example: User System ===");

class User {
    public name: string;
    public email: string;
    protected userId: number;           // Subclasses need this
    protected permissions: string[];    // Subclasses need this
    private password: string;           // Only User class

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.userId = Math.floor(Math.random() * 10000);
        this.permissions = ["read"];
        this.password = password;
    }

    // Protected methods for subclasses
    protected addPermission(permission: string): void {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
            console.log(`Permission '${permission}' added to user ${this.name}`);
        }
    }

    protected removePermission(permission: string): void {
        this.permissions = this.permissions.filter(p => p !== permission);
        console.log(`Permission '${permission}' removed from user ${this.name}`);
    }

    protected hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
    }

    // Protected method to get internal ID
    protected getInternalId(): number {
        return this.userId;
    }

    // Public methods
    public getDisplayInfo(): string {
        return `${this.name} (${this.email})`;
    }

    public validatePassword(inputPassword: string): boolean {
        return this.password === inputPassword;  // Private password accessible in same class
    }
}

// Admin extends User with additional privileges
class Admin extends User {
    private adminLevel: number;

    constructor(name: string, email: string, password: string, adminLevel: number) {
        super(name, email, password);
        this.adminLevel = adminLevel;
        
        // Can use protected methods from parent
        this.addPermission("write");     // ✅ Protected method accessible
        this.addPermission("delete");    // ✅ Protected method accessible
        this.addPermission("admin");     // ✅ Protected method accessible
    }

    // Admin-specific method using protected data
    public promoteUser(targetUser: User): boolean {
        // Can access protected properties
        console.log(`Admin ${this.name} (ID: ${this.userId}) promoting user...`);
        
        // Can use protected methods
        if (this.hasPermission("admin")) {  // ✅ Protected method accessible
            console.log("Admin has permission to promote users");
            return true;
        }
        
        console.log("Admin lacks permission to promote users");
        return false;
    }

    public getAdminInfo(): string {
        // Can access protected properties from parent
        return `Admin: ${this.name}, ID: ${this.userId}, Level: ${this.adminLevel}, Permissions: ${this.permissions.join(", ")}`;
    }

    public managePermissions(action: "add" | "remove", permission: string): void {
        if (action === "add") {
            this.addPermission(permission);      // ✅ Protected method accessible
        } else {
            this.removePermission(permission);   // ✅ Protected method accessible
        }
    }

    // Override protected method with admin-specific logic
    protected addPermission(permission: string): void {
        console.log(`Admin adding permission: ${permission}`);
        super.addPermission(permission);  // Call parent's protected method
        console.log(`Admin ${this.name} now has enhanced permissions`);
    }
}

// Moderator extends User with limited additional privileges
class Moderator extends User {
    private moderatedSections: string[];

    constructor(name: string, email: string, password: string, sections: string[]) {
        super(name, email, password);
        this.moderatedSections = sections;
        
        // Add moderator permissions using protected method
        this.addPermission("moderate");  // ✅ Protected method accessible
    }

    public moderateContent(section: string): boolean {
        // Use protected data and methods
        if (this.moderatedSections.includes(section) && this.hasPermission("moderate")) {
            console.log(`Moderator ${this.name} (ID: ${this.userId}) moderating ${section}`);
            return true;
        }
        
        console.log(`Moderator ${this.name} cannot moderate ${section}`);
        return false;
    }

    public getModeratorInfo(): string {
        // Access protected properties from parent
        return `Moderator: ${this.name}, ID: ${this.userId}, Sections: ${this.moderatedSections.join(", ")}`;
    }
}

// Usage examples
const regularUser = new User("John Doe", "john@example.com", "password123");
const admin = new Admin("Alice Admin", "alice@example.com", "adminpass", 5);
const moderator = new Moderator("Bob Mod", "bob@example.com", "modpass", ["forum", "comments"]);

console.log(regularUser.getDisplayInfo());
console.log(admin.getAdminInfo());
console.log(moderator.getModeratorInfo());

// Admin using protected methods
admin.promoteUser(regularUser);
admin.managePermissions("add", "superuser");

// Moderator using protected methods
moderator.moderateContent("forum");
moderator.moderateContent("news");  // Should fail

// ❌ Cannot access protected members from outside
// console.log(admin.userId);        // Error: protected property
// admin.addPermission("test");      // Error: protected method
// console.log(moderator.permissions); // Error: protected property

// ===== PROTECTED WITH READONLY =====
console.log("\n=== Protected with Readonly ===");

class DatabaseEntity {
    protected readonly id: number;        // Protected readonly
    protected readonly createdAt: Date;   // Protected readonly
    protected updatedAt: Date;            // Protected mutable
    private readonly connectionString: string; // Private readonly

    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.connectionString = "db://localhost:5432";
    }

    // Protected method for subclasses
    protected updateTimestamp(): void {
        this.updatedAt = new Date();
        console.log(`Entity ${this.id} updated at ${this.updatedAt.toISOString()}`);
    }

    protected getEntityId(): number {
        return this.id;  // ✅ Can access protected readonly
    }
}

class Article extends DatabaseEntity {
    private title: string;
    private content: string;

    constructor(id: number, title: string, content: string) {
        super(id);
        this.title = title;
        this.content = content;
    }

    public updateContent(newContent: string): void {
        this.content = newContent;
        this.updateTimestamp();  // ✅ Can call protected method
        console.log(`Article ${this.id} content updated`);  // ✅ Can access protected readonly
    }

    public getArticleInfo(): string {
        // Can access protected properties from parent
        return `Article ${this.id}: ${this.title} (Created: ${this.createdAt.toDateString()}, Updated: ${this.updatedAt.toDateString()})`;
    }

    public getId(): number {
        return this.getEntityId();  // ✅ Can call protected method
    }

    // Cannot modify protected readonly
    public tryToChangeId(): void {
        // this.id = 999;  // ❌ Error: Cannot assign to 'id' because it is readonly
        console.log(`Article ID ${this.id} cannot be changed`);
    }
}

const article = new Article(1, "TypeScript Guide", "Learning TypeScript...");
article.updateContent("Updated TypeScript content");
console.log(article.getArticleInfo());
console.log(`Article ID: ${article.getId()}`);
article.tryToChangeId();

// ❌ Cannot access protected members from outside
// console.log(article.id);         // Error: protected property
// article.updateTimestamp();       // Error: protected method

// ===== PROTECTED STATIC MEMBERS =====
console.log("\n=== Protected Static Members ===");

class Shape {
    protected static nextId: number = 1;
    protected readonly id: number;
    protected name: string;

    constructor(name: string) {
        this.id = Shape.nextId++;
        this.name = name;
    }

    // Protected static method
    protected static generateId(): number {
        return Shape.nextId++;
    }

    // Protected instance method
    protected getShapeInfo(): string {
        return `${this.name} (ID: ${this.id})`;
    }

    public display(): string {
        return this.getShapeInfo();
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super("Circle");
        this.radius = radius;
    }

    // Can access protected static members
    public static createMultipleCircles(radii: number[]): Circle[] {
        return radii.map(radius => {
            const circle = new Circle(radius);
            console.log(`Created circle with ID ${Shape.nextId - 1}`);  // ✅ Protected static accessible
            return circle;
        });
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getDetails(): string {
        // Can use protected instance methods
        const baseInfo = this.getShapeInfo();  // ✅ Protected method accessible
        return `${baseInfo}, Radius: ${this.radius}, Area: ${this.getArea().toFixed(2)}`;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getDetails(): string {
        const baseInfo = this.getShapeInfo();  // ✅ Protected method accessible
        return `${baseInfo}, Dimensions: ${this.width}x${this.height}, Area: ${this.getArea()}`;
    }
}

// Usage
const circles = Circle.createMultipleCircles([5, 10, 15]);
const rectangle = new Rectangle(10, 20);

circles.forEach(circle => console.log(circle.getDetails()));
console.log(rectangle.getDetails());

// ❌ Cannot access protected static members from outside
// console.log(Shape.nextId);        // Error: protected static property
// Shape.generateId();               // Error: protected static method

// ===== PROTECTED CONSTRUCTORS =====
console.log("\n=== Protected Constructors ===");

// Base class with protected constructor - cannot be instantiated directly
class BaseLogger {
    protected logLevel: string;
    protected logHistory: string[] = [];

    // Protected constructor - only subclasses can call this
    protected constructor(logLevel: string) {
        this.logLevel = logLevel;
        console.log(`Logger initialized with level: ${logLevel}`);
    }

    protected addToHistory(message: string): void {
        this.logHistory.push(`[${new Date().toISOString()}] ${message}`);
    }

    protected formatMessage(level: string, message: string): string {
        return `[${level.toUpperCase()}] ${message}`;
    }

    public getHistory(): string[] {
        return [...this.logHistory];
    }
}

// Concrete implementation
class FileLogger extends BaseLogger {
    private fileName: string;

    constructor(fileName: string, logLevel: string = "info") {
        super(logLevel);  // ✅ Can call protected constructor
        this.fileName = fileName;
    }

    public log(level: string, message: string): void {
        const formattedMessage = this.formatMessage(level, message);  // ✅ Protected method
        this.addToHistory(formattedMessage);  // ✅ Protected method
        console.log(`Writing to ${this.fileName}: ${formattedMessage}`);
    }

    public getLoggerInfo(): string {
        return `FileLogger: ${this.fileName}, Level: ${this.logLevel}, History: ${this.logHistory.length} entries`;
    }
}

class ConsoleLogger extends BaseLogger {
    private useColors: boolean;

    constructor(useColors: boolean = true, logLevel: string = "debug") {
        super(logLevel);  // ✅ Can call protected constructor
        this.useColors = useColors;
    }

    public log(level: string, message: string): void {
        const formattedMessage = this.formatMessage(level, message);  // ✅ Protected method
        this.addToHistory(formattedMessage);  // ✅ Protected method
        
        if (this.useColors) {
            console.log(`🎨 ${formattedMessage}`);
        } else {
            console.log(formattedMessage);
        }
    }

    public getLoggerInfo(): string {
        return `ConsoleLogger: Colors ${this.useColors ? "enabled" : "disabled"}, Level: ${this.logLevel}`;
    }
}

// Usage
const fileLogger = new FileLogger("app.log", "error");
const consoleLogger = new ConsoleLogger(true, "debug");

fileLogger.log("error", "Database connection failed");
consoleLogger.log("info", "User logged in");

console.log(fileLogger.getLoggerInfo());
console.log(consoleLogger.getLoggerInfo());

// ❌ Cannot instantiate base class directly
// const baseLogger = new BaseLogger("info");  // Error: protected constructor

// ===== WHEN TO USE PROTECTED =====
console.log("\n=== When to Use Protected ===");

/*
✅ USE PROTECTED WHEN:

1. 🏗️  BUILDING CLASS HIERARCHIES
   • Parent class has data/methods that subclasses need
   • Creating template/base classes for inheritance
   • Implementing abstract base classes

2. 🔧 SHARING INTERNAL APIS
   • Methods that subclasses might need to override
   • Utility methods for the class family
   • Internal state that subclasses need access to

3. 🎯 CONTROLLED EXTENSION
   • You want to allow inheritance but control access
   • Providing hooks for subclasses to customize behavior
   • Creating extensible frameworks

4. 📊 COMMON DATA/BEHAVIOR
   • Shared properties across related classes
   • Common validation or processing logic
   • Shared configuration or state

❌ DON'T USE PROTECTED WHEN:

1. 🔒 DATA SHOULD BE PRIVATE
   • Implementation details that shouldn't be exposed
   • Sensitive data that only the class should access
   • Internal state that subclasses don't need

2. 🌍 DATA SHOULD BE PUBLIC
   • Information that external code needs
   • Simple properties without logic
   • Public APIs for the class

3. 🚫 NO INHERITANCE PLANNED
   • Simple classes that won't be extended
   • Final implementations
   • Utility classes
*/

// ===== SUMMARY =====
console.log("\n=== Protected Modifier Summary ===");
console.log("🔐 PROTECTED MODIFIER:");
console.log("   • Accessible within the class AND its subclasses");
console.log("   • NOT accessible from outside the class hierarchy");
console.log("   • Perfect middle ground between private and public");
console.log("");
console.log("✅ COMMON USE CASES:");
console.log("   • Base class properties that subclasses need");
console.log("   • Methods that subclasses might override");
console.log("   • Shared functionality in class hierarchies");
console.log("   • Internal APIs for related classes");
console.log("   • Template/abstract base class implementation");
console.log("");
console.log("🎯 BENEFITS:");
console.log("   • Enables controlled inheritance");
console.log("   • Shares code between related classes");
console.log("   • Maintains encapsulation from outside world");
console.log("   • Allows subclass customization");
console.log("   • Provides clean internal APIs");
console.log("");
console.log("⚖️ REMEMBER:");
console.log("   • Use public for external APIs");
console.log("   • Use private for internal implementation");
console.log("   • Use protected for class family sharing");
console.log("   • Protected enables inheritance while maintaining encapsulation");

export {}; 