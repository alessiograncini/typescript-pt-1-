// ===== ABSTRACT CLASSES IN TYPESCRIPT =====
// Understanding abstract classes: the blueprint for related classes

// ===== WHAT ARE ABSTRACT CLASSES? =====
console.log("=== What Are Abstract Classes? ===");

/*
ABSTRACT CLASSES are classes that:

1. 🚫 CANNOT BE INSTANTIATED directly (no "new AbstractClass()")
2. 🎯 SERVE AS BASE CLASSES for other classes to extend
3. 🔧 CAN HAVE BOTH abstract methods (must implement) AND concrete methods (shared implementation)
4. 💾 CAN HAVE PROPERTIES, constructors, and state
5. 🏗️ PROVIDE PARTIAL IMPLEMENTATION - some methods implemented, some not
6. 📐 DEFINE A CONTRACT that derived classes must follow

Think of abstract classes as "INCOMPLETE BLUEPRINTS" - they have some parts 
built and some parts that subclasses must finish building.
*/

// ===== BASIC ABSTRACT CLASS =====
console.log("\n=== Basic Abstract Class ===");

// Abstract class - cannot be instantiated
abstract class Animal {
    // Concrete properties (all subclasses have these)
    protected name: string;
    protected age: number;
    
    // Concrete constructor (subclasses can use this)
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        console.log(`🐾 Animal base created: ${name}`);
    }
    
    // Concrete method (shared implementation)
    getInfo(): string {
        return `${this.name} is ${this.age} years old`;
    }
    
    // Concrete method with shared logic
    sleep(): string {
        return `${this.name} is sleeping... 😴`;
    }
    
    // Abstract method (subclasses MUST implement)
    abstract makeSound(): string;
    
    // Abstract method (subclasses MUST implement)  
    abstract move(): string;
    
    // Abstract method with parameters
    abstract eat(food: string): string;
}

// ❌ This would cause an error:
// const animal = new Animal("Generic", 5); // Cannot create instance of abstract class

// ===== UNDERSTANDING THE 'SUPER' KEYWORD =====
console.log("\n=== Understanding the 'super' Keyword ===");

/*
🔍 WHAT IS 'super'?

'super' is a KEYWORD that allows you to:

1. 🏗️  CALL THE PARENT CONSTRUCTOR - super(args)
2. 🔧  ACCESS PARENT METHODS - super.methodName()
3. 📞  INVOKE PARENT FUNCTIONALITY from child classes
4. ⚡  EXTEND PARENT BEHAVIOR rather than completely replacing it

🎯 WHY IS 'super' NEEDED?

1. 🚨  TYPESCRIPT REQUIREMENT - You MUST call super() before accessing 'this'
2. 🏗️  PROPER INITIALIZATION - Ensures parent class is properly set up
3. 🔗  INHERITANCE CHAIN - Maintains the object construction chain
4. 💾  SHARED STATE - Parent constructor sets up shared properties/state
5. 🛡️  VALIDATION - Parent constructor may contain important validation logic

❌ WITHOUT super():
class Child extends Parent {
    constructor() {
        this.name = "test";  // ERROR! Cannot access 'this' before calling super()
    }
}

✅ WITH super():
class Child extends Parent {
    constructor() {
        super();             // Call parent constructor first
        this.name = "test";  // Now 'this' is available
    }
}

🔧 SUPER IN METHODS:
class Child extends Parent {
    someMethod(): string {
        const parentResult = super.someMethod();  // Get parent's implementation
        return `${parentResult} + child addition`;  // Extend it
    }
}
*/

// Concrete class extending abstract class
class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, age: number, breed: string) {
        // 🚨 CRITICAL: MUST call super() before accessing 'this'
        super(name, age); // Call abstract class constructor
        
        // ✅ Now we can access 'this' and set derived class properties
        this.breed = breed;
        console.log(`🐕 Dog created: ${name} (${breed})`);
    }
    
    // MUST implement all abstract methods
    makeSound(): string {
        return `${this.name} says: Woof! Woof!`;
    }
    
    move(): string {
        return `${this.name} runs around wagging tail`;
    }
    
    eat(food: string): string {
        return `${this.name} eagerly eats ${food}`;
    }
    
    // Example of EXTENDING parent behavior using super
    getInfo(): string {
        // Get the parent's info first
        const parentInfo = super.getInfo();
        // Extend it with dog-specific information
        return `${parentInfo}, Breed: ${this.breed}`;
    }
    
    // Dog-specific methods
    getBreed(): string {
        return this.breed;
    }
    
    fetch(): string {
        return `${this.name} fetches the ball and brings it back!`;
    }
}

class Cat extends Animal {
    private indoor: boolean;
    
    constructor(name: string, age: number, indoor: boolean = true) {
        super(name, age);
        this.indoor = indoor;
        console.log(`🐱 Cat created: ${name}`);
    }
    
    // MUST implement all abstract methods
    makeSound(): string {
        return `${this.name} says: Meow meow`;
    }
    
    move(): string {
        return `${this.name} gracefully prowls around`;
    }
    
    eat(food: string): string {
        return `${this.name} delicately nibbles on ${food}`;
    }
    
    // Cat-specific methods
    climb(): string {
        return `${this.name} climbs up the curtains`;
    }
    
    isIndoor(): boolean {
        return this.indoor;
    }
}

// Usage
const dog = new Dog("Buddy", 3, "Golden Retriever");
const cat = new Cat("Whiskers", 2, false);

console.log(dog.getInfo());     // Extended version with breed info
console.log(dog.makeSound());   // Implemented in Dog
console.log(dog.move());        // Implemented in Dog
console.log(dog.eat("kibble")); // Implemented in Dog
console.log(dog.fetch());       // Dog-specific method

console.log(cat.getInfo());     // From abstract class
console.log(cat.makeSound());   // Implemented in Cat
console.log(cat.sleep());       // From abstract class
console.log(cat.climb());       // Cat-specific method

// ===== SUPER USAGE PATTERNS =====
console.log("\n=== Super Usage Patterns ===");

// Pattern 1: Constructor Chaining
abstract class SuperVehicle {
    protected brand: string;
    protected year: number;
    protected mileage: number;
    
    constructor(brand: string, year: number) {
        this.brand = brand;
        this.year = year;
        this.mileage = 0;
        console.log(`🚗 Vehicle base initialized: ${brand} ${year}`);
    }
    
    abstract start(): string;
    
    drive(miles: number): string {
        this.mileage += miles;
        return `Drove ${miles} miles. Total mileage: ${this.mileage}`;
    }
    
    getAge(): number {
        return new Date().getFullYear() - this.year;
    }
}

class SportsCar extends SuperVehicle {
    private topSpeed: number;
    
    constructor(brand: string, year: number, topSpeed: number) {
        // 🚨 MUST call super() first
        super(brand, year);  // Initialize parent properties
        
        // ✅ Now initialize child properties
        this.topSpeed = topSpeed;
        console.log(`🏎️ Sports car created with top speed: ${topSpeed} mph`);
    }
    
    start(): string {
        return `${this.brand} sports car roars to life!`;
    }
    
    // Pattern 2: Extending Parent Method Behavior
    drive(miles: number): string {
        // Get parent behavior first
        const baseDriveInfo = super.drive(miles);
        
        // Add sports car specific behavior
        const speedInfo = miles > 100 ? " (drove at high speed!)" : " (cruising speed)";
        return `${baseDriveInfo}${speedInfo}`;
    }
    
    // Pattern 3: Calling Parent Method for Shared Logic
    getFullInfo(): string {
        const age = super.getAge();  // Use parent's age calculation
        return `${this.brand} Sports Car - Age: ${age} years, Top Speed: ${this.topSpeed} mph, Mileage: ${this.mileage}`;
    }
}

// Pattern 4: Multiple Inheritance Levels
class ElectricSportsCar extends SportsCar {
    private batteryCapacity: number;
    
    constructor(brand: string, year: number, topSpeed: number, batteryCapacity: number) {
        // Call parent constructor (which calls grandparent constructor)
        super(brand, year, topSpeed);
        
        this.batteryCapacity = batteryCapacity;
        console.log(`⚡ Electric sports car with ${batteryCapacity}kWh battery`);
    }
    
    start(): string {
        // Get parent's start behavior
        const parentStart = super.start();
        return `${parentStart} (Silent electric power)`;
    }
    
    drive(miles: number): string {
        // Chain through parent -> grandparent
        const parentDriveInfo = super.drive(miles);
        
        // Add electric-specific info
        const batteryUsed = miles * 0.3; // 0.3 kWh per mile
        return `${parentDriveInfo} | Battery used: ${batteryUsed}kWh`;
    }
    
    charge(): string {
        return `Charging ${this.brand} - ${this.batteryCapacity}kWh battery`;
    }
}

// Testing super patterns
const sportsCar = new SportsCar("Ferrari", 2022, 200);
const electricSportsCar = new ElectricSportsCar("Tesla", 2023, 250, 100);

console.log("\n--- Sports Car ---");
console.log(sportsCar.start());
console.log(sportsCar.drive(150));
console.log(sportsCar.getFullInfo());

console.log("\n--- Electric Sports Car ---");
console.log(electricSportsCar.start());
console.log(electricSportsCar.drive(120));
console.log(electricSportsCar.charge());

// ===== SUPER BEST PRACTICES =====
console.log("\n=== Super Best Practices ===");

/*
✅ SUPER BEST PRACTICES:

1. 🚨  ALWAYS call super() FIRST in constructor
2. 🔧  Use super.method() to EXTEND behavior, not replace it
3. 🎯  Call super() even if parent constructor has no parameters
4. 📝  Document when you're extending vs overriding parent behavior
5. ⚡  Chain super calls in deep inheritance hierarchies
6. 🛡️  Validate after super() call, not before

❌ COMMON MISTAKES:

1. Forgetting to call super() in constructor
2. Accessing 'this' before calling super()
3. Not calling super() when parent has important initialization
4. Overriding methods without considering parent behavior
5. Calling super() after setting child properties (can cause issues)

💡 SUPER TIPS:

• super() in constructor = "Initialize my parent first"
• super.method() = "Do what my parent does, then I'll add more"
• super is about EXTENDING, not REPLACING
• Think of super as "stand on the shoulders of giants"
*/

// ===== ABSTRACT CLASSES vs INTERFACES =====
console.log("\n=== Abstract Classes vs Interfaces ===");

/*
🔍 KEY DIFFERENCES:

📐 INTERFACES:
✅ Define CONTRACTS (what methods/properties must exist)
✅ Multiple inheritance (class can implement multiple interfaces)
✅ NO implementation - only signatures
✅ NO constructors, NO state
✅ Can be implemented by any class
✅ Duck typing - if it looks like a duck, it's a duck
✅ Compiled away - no runtime existence

🏗️ ABSTRACT CLASSES:
✅ Provide PARTIAL IMPLEMENTATION (some methods done, some not)
✅ Single inheritance only (class can extend one abstract class)
✅ CAN have implementation, constructors, state
✅ CAN have concrete methods with shared logic
✅ Force related classes to share common behavior
✅ Runtime existence - can use instanceof

🎯 WHEN TO USE EACH:

USE INTERFACES when:
• You want to define a contract that unrelated classes can implement
• You need multiple inheritance
• You only need method signatures
• You want flexibility and loose coupling

USE ABSTRACT CLASSES when:
• You have related classes that share common implementation
• You want to provide some shared methods and force others to be implemented
• You need constructors and shared state
• You want to enforce a family of related classes
*/

// ===== INTERFACE EXAMPLE =====
console.log("\n=== Interface Example ===");

// Interface - just a contract
interface Flyable {
    fly(): string;
    altitude: number;
}

interface Swimmable {
    swim(): string;
    depth: number;
}

// Classes can implement multiple interfaces
class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    constructor(private name: string) {}
    
    fly(): string {
        this.altitude = 100;
        return `${this.name} flies at ${this.altitude} feet`;
    }
    
    swim(): string {
        this.depth = 5;
        return `${this.name} swims ${this.depth} feet underwater`;
    }
}

class Airplane implements Flyable {
    altitude: number = 0;
    
    constructor(private model: string) {}
    
    fly(): string {
        this.altitude = 30000;
        return `${this.model} flies at ${this.altitude} feet`;
    }
}

class Fish implements Swimmable {
    depth: number = 0;
    
    constructor(private species: string) {}
    
    swim(): string {
        this.depth = 20;
        return `${this.species} swims ${this.depth} feet deep`;
    }
}

// Interface usage - very flexible
const duck = new Duck("Donald");
const airplane = new Airplane("Boeing 747");
const fish = new Fish("Salmon");

console.log(duck.fly());      // Duck can fly
console.log(duck.swim());     // Duck can swim
console.log(airplane.fly());  // Airplane can fly
console.log(fish.swim());     // Fish can swim

// ===== ABSTRACT CLASS EXAMPLE =====
console.log("\n=== Abstract Class Example ===");

// Abstract class - shared implementation + contract
abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;
    
    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        console.log(`🚗 Vehicle base created: ${brand} ${model}`);
    }
    
    // Concrete method - shared across all vehicles
    getDetails(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }
    
    // Concrete method - shared logic
    age(): number {
        return new Date().getFullYear() - this.year;
    }
    
    // Abstract methods - each vehicle type implements differently
    abstract start(): string;
    abstract stop(): string;
    abstract getFuelType(): string;
}

class Car extends Vehicle {
    private doors: number;
    
    constructor(brand: string, model: string, year: number, doors: number) {
        super(brand, model, year);
        this.doors = doors;
    }
    
    start(): string {
        return `${this.getDetails()} engine started with key`;
    }
    
    stop(): string {
        return `${this.getDetails()} engine stopped`;
    }
    
    getFuelType(): string {
        return "Gasoline";
    }
    
    getDoors(): number {
        return this.doors;
    }
}

class ElectricCar extends Vehicle {
    private batteryCapacity: number;
    
    constructor(brand: string, model: string, year: number, batteryCapacity: number) {
        super(brand, model, year);
        this.batteryCapacity = batteryCapacity;
    }
    
    start(): string {
        return `${this.getDetails()} started silently with button`;
    }
    
    stop(): string {
        return `${this.getDetails()} stopped silently`;
    }
    
    getFuelType(): string {
        return "Electric";
    }
    
    charge(): string {
        return `${this.getDetails()} is charging ${this.batteryCapacity}kWh battery`;
    }
}

class Motorcycle extends Vehicle {
    private engineSize: number;
    
    constructor(brand: string, model: string, year: number, engineSize: number) {
        super(brand, model, year);
        this.engineSize = engineSize;
    }
    
    start(): string {
        return `${this.getDetails()} roars to life with ${this.engineSize}cc engine`;
    }
    
    stop(): string {
        return `${this.getDetails()} engine stops with a rumble`;
    }
    
    getFuelType(): string {
        return "Gasoline";
    }
    
    wheelie(): string {
        return `${this.getDetails()} does a wheelie!`;
    }
}

// Usage - all vehicles share some behavior, implement others differently
const car = new Car("Toyota", "Camry", 2020, 4);
const tesla = new ElectricCar("Tesla", "Model 3", 2022, 75);
const bike = new Motorcycle("Harley", "Sportster", 2021, 883);

// Shared methods from abstract class
console.log(car.getDetails());
console.log(`Car age: ${car.age()} years`);

// Different implementations of abstract methods
console.log(car.start());
console.log(tesla.start());
console.log(bike.start());

console.log(`Car fuel: ${car.getFuelType()}`);
console.log(`Tesla fuel: ${tesla.getFuelType()}`);
console.log(`Bike fuel: ${bike.getFuelType()}`);

// Specific methods
console.log(tesla.charge());
console.log(bike.wheelie());

// ===== COMBINING ABSTRACT CLASSES AND INTERFACES =====
console.log("\n=== Combining Abstract Classes and Interfaces ===");

// Interface for behavior contracts
interface Trackable {
    getLocation(): { x: number; y: number };
    updateLocation(x: number, y: number): void;
}

interface Maintainable {
    lastMaintenance: Date;
    performMaintenance(): void;
    needsMaintenance(): boolean;
}

// Abstract class for shared implementation
abstract class SmartVehicle {
    protected brand: string;
    protected id: string;
    protected location: { x: number; y: number };
    
    constructor(brand: string, id: string) {
        this.brand = brand;
        this.id = id;
        this.location = { x: 0, y: 0 };
        console.log(`📱 Smart Vehicle created: ${brand} (${id})`);
    }
    
    // Concrete method
    getId(): string {
        return this.id;
    }
    
    // Concrete method  
    getBrand(): string {
        return this.brand;
    }
    
    // Abstract methods
    abstract start(): string;
    abstract getStatus(): string;
}

// Class that extends abstract class AND implements interfaces
class SmartCar extends SmartVehicle implements Trackable, Maintainable {
    lastMaintenance: Date;
    private isRunning: boolean = false;
    
    constructor(brand: string, id: string) {
        super(brand, id);
        this.lastMaintenance = new Date();
    }
    
    // Implement abstract methods
    start(): string {
        this.isRunning = true;
        return `Smart car ${this.id} started`;
    }
    
    getStatus(): string {
        return `${this.brand} ${this.id} - Running: ${this.isRunning}, Location: (${this.location.x}, ${this.location.y})`;
    }
    
    // Implement Trackable interface
    getLocation(): { x: number; y: number } {
        return { ...this.location };
    }
    
    updateLocation(x: number, y: number): void {
        this.location.x = x;
        this.location.y = y;
        console.log(`${this.id} location updated to (${x}, ${y})`);
    }
    
    // Implement Maintainable interface
    performMaintenance(): void {
        this.lastMaintenance = new Date();
        console.log(`Maintenance performed on ${this.id}`);
    }
    
    needsMaintenance(): boolean {
        const daysSince = (Date.now() - this.lastMaintenance.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince > 30;
    }
}

class SmartDrone extends SmartVehicle implements Trackable {
    private altitude: number = 0;
    private isFlying: boolean = false;
    
    constructor(brand: string, id: string) {
        super(brand, id);
    }
    
    // Implement abstract methods
    start(): string {
        this.isFlying = true;
        this.altitude = 100;
        return `Drone ${this.id} taking off to ${this.altitude}ft`;
    }
    
    getStatus(): string {
        return `${this.brand} ${this.id} - Flying: ${this.isFlying}, Altitude: ${this.altitude}ft, Location: (${this.location.x}, ${this.location.y})`;
    }
    
    // Implement Trackable interface
    getLocation(): { x: number; y: number } {
        return { ...this.location };
    }
    
    updateLocation(x: number, y: number): void {
        this.location.x = x;
        this.location.y = y;
        console.log(`Drone ${this.id} moved to (${x}, ${y}) at ${this.altitude}ft`);
    }
    
    // Drone-specific methods
    changeAltitude(newAltitude: number): string {
        this.altitude = newAltitude;
        return `Drone ${this.id} altitude changed to ${this.altitude}ft`;
    }
}

// Usage - combining abstract classes and interfaces
const smartCar = new SmartCar("Tesla", "CAR001");
const drone = new SmartDrone("DJI", "DRONE001");

console.log(smartCar.start());
console.log(smartCar.getStatus());
smartCar.updateLocation(10, 20);
console.log(smartCar.getStatus());

console.log(drone.start());
console.log(drone.changeAltitude(200));
drone.updateLocation(50, 60);
console.log(drone.getStatus());

// ===== REAL-WORLD EXAMPLE: PAYMENT SYSTEM =====
console.log("\n=== Real-World Example: Payment System ===");

// Abstract class for shared payment logic
abstract class PaymentProcessor {
    protected transactionId: string;
    protected amount: number;
    protected currency: string;
    protected timestamp: Date;
    
    constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
        this.transactionId = this.generateTransactionId();
        this.timestamp = new Date();
        console.log(`💳 Payment processor initialized: ${amount} ${currency}`);
    }
    
    // Concrete method - shared validation logic
    protected validateAmount(): boolean {
        if (this.amount <= 0) {
            throw new Error("Amount must be positive");
        }
        if (this.amount > 10000) {
            throw new Error("Amount exceeds limit");
        }
        return true;
    }
    
    // Concrete method - shared transaction ID generation
    private generateTransactionId(): string {
        return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    }
    
    // Concrete method - shared getter
    getTransactionInfo(): object {
        return {
            id: this.transactionId,
            amount: this.amount,
            currency: this.currency,
            timestamp: this.timestamp
        };
    }
    
    // Abstract methods - each payment type implements differently
    abstract processPayment(): Promise<PaymentResult>;
    abstract validatePaymentData(): boolean;
    abstract getProviderName(): string;
}

interface PaymentResult {
    success: boolean;
    message: string;
    transactionId: string;
    providerResponse?: any;
}

// Credit card payment implementation
class CreditCardProcessor extends PaymentProcessor {
    private cardNumber: string;
    private expiryDate: string;
    private cvv: string;
    
    constructor(amount: number, currency: string, cardNumber: string, expiryDate: string, cvv: string) {
        super(amount, currency);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }
    
    validatePaymentData(): boolean {
        // Credit card specific validation
        if (this.cardNumber.length !== 16) {
            throw new Error("Invalid card number length");
        }
        if (this.cvv.length !== 3) {
            throw new Error("Invalid CVV");
        }
        return true;
    }
    
    getProviderName(): string {
        return "Credit Card";
    }
    
    async processPayment(): Promise<PaymentResult> {
        try {
            // Use shared validation
            this.validateAmount();
            this.validatePaymentData();
            
            console.log(`Processing credit card payment: ${this.amount} ${this.currency}`);
            
            // Simulate API call
            await this.simulateApiCall();
            
            return {
                success: true,
                message: `Credit card payment processed successfully`,
                transactionId: this.transactionId,
                providerResponse: { authCode: "AUTH123", last4: this.cardNumber.slice(-4) }
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Payment failed",
                transactionId: this.transactionId
            };
        }
    }
    
    private async simulateApiCall(): Promise<void> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// PayPal payment implementation
class PayPalProcessor extends PaymentProcessor {
    private email: string;
    private paypalToken: string;
    
    constructor(amount: number, currency: string, email: string, paypalToken: string) {
        super(amount, currency);
        this.email = email;
        this.paypalToken = paypalToken;
    }
    
    validatePaymentData(): boolean {
        // PayPal specific validation
        if (!this.email.includes("@")) {
            throw new Error("Invalid PayPal email");
        }
        if (!this.paypalToken) {
            throw new Error("PayPal token required");
        }
        return true;
    }
    
    getProviderName(): string {
        return "PayPal";
    }
    
    async processPayment(): Promise<PaymentResult> {
        try {
            // Use shared validation
            this.validateAmount();
            this.validatePaymentData();
            
            console.log(`Processing PayPal payment: ${this.amount} ${this.currency}`);
            
            // Simulate PayPal API call
            await this.simulatePayPalApi();
            
            return {
                success: true,
                message: `PayPal payment processed successfully`,
                transactionId: this.transactionId,
                providerResponse: { paypalId: "PP_" + this.transactionId, email: this.email }
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "PayPal payment failed",
                transactionId: this.transactionId
            };
        }
    }
    
    private async simulatePayPalApi(): Promise<void> {
        // Simulate PayPal API delay
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

// Bank transfer implementation
class BankTransferProcessor extends PaymentProcessor {
    private bankAccount: string;
    private routingNumber: string;
    
    constructor(amount: number, currency: string, bankAccount: string, routingNumber: string) {
        super(amount, currency);
        this.bankAccount = bankAccount;
        this.routingNumber = routingNumber;
    }
    
    validatePaymentData(): boolean {
        // Bank transfer specific validation
        if (this.bankAccount.length < 8) {
            throw new Error("Invalid bank account number");
        }
        if (this.routingNumber.length !== 9) {
            throw new Error("Invalid routing number");
        }
        return true;
    }
    
    getProviderName(): string {
        return "Bank Transfer";
    }
    
    async processPayment(): Promise<PaymentResult> {
        try {
            // Use shared validation
            this.validateAmount();
            this.validatePaymentData();
            
            console.log(`Processing bank transfer: ${this.amount} ${this.currency}`);
            
            // Simulate bank API call
            await this.simulateBankApi();
            
            return {
                success: true,
                message: `Bank transfer initiated successfully`,
                transactionId: this.transactionId,
                providerResponse: { 
                    bankReference: "BANK_" + this.transactionId, 
                    processingTime: "1-3 business days"
                }
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Bank transfer failed",
                transactionId: this.transactionId
            };
        }
    }
    
    private async simulateBankApi(): Promise<void> {
        // Simulate bank API delay
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

// Usage example
async function demonstratePaymentSystem() {
    const payments: PaymentProcessor[] = [
        new CreditCardProcessor(99.99, "USD", "1234567890123456", "12/25", "123"),
        new PayPalProcessor(149.99, "EUR", "user@example.com", "PP_TOKEN_123"),
        new BankTransferProcessor(500.00, "USD", "12345678901", "123456789")
    ];
    
    for (const payment of payments) {
        console.log(`\n--- Processing ${payment.getProviderName()} Payment ---`);
        console.log("Transaction info:", payment.getTransactionInfo());
        
        const result = await payment.processPayment();
        console.log("Payment result:", result);
    }
}

demonstratePaymentSystem();

// ===== WHEN TO USE ABSTRACT CLASSES vs INTERFACES =====
console.log("\n=== Decision Guide: Abstract Classes vs Interfaces ===");

/*
🎯 USE ABSTRACT CLASSES WHEN:

✅ You have RELATED CLASSES that share common implementation
✅ You want to provide SHARED METHODS and force others to be implemented
✅ You need CONSTRUCTORS and shared state/properties
✅ You want to enforce a FAMILY of related classes
✅ You have DEFAULT BEHAVIOR that subclasses can use or override
✅ You need to share PRIVATE/PROTECTED members

Examples:
• Payment processors (shared validation, different implementations)
• UI components (shared styling, different rendering)
• Game entities (shared position/health, different behaviors)
• Database connections (shared connection logic, different drivers)

🎯 USE INTERFACES WHEN:

✅ You want to define a CONTRACT for unrelated classes
✅ You need MULTIPLE INHERITANCE (implementing multiple interfaces)
✅ You only need METHOD SIGNATURES, not implementation
✅ You want FLEXIBILITY and loose coupling
✅ You're defining SHAPES of objects or function signatures

Examples:
• Serializable objects (toJSON method)
• Event handlers (onClick, onSubmit methods)
• Data shapes (User, Product interfaces)
• Plugin architectures (consistent API across different plugins)

🤝 USE BOTH TOGETHER WHEN:

✅ You have a BASE CLASS with shared implementation
✅ PLUS additional BEHAVIORS that some (but not all) subclasses need
✅ You want BOTH inheritance and composition benefits

Example:
• SmartVehicle abstract class + Trackable/Maintainable interfaces
• MediaPlayer abstract class + Streamable/Downloadable interfaces
*/

// ===== SUMMARY =====
console.log("\n=== Abstract Classes Summary ===");
console.log("🏗️ ABSTRACT CLASSES:");
console.log("   • Blueprint for related classes");
console.log("   • Partial implementation + forced implementation");
console.log("   • Single inheritance");
console.log("   • Can have constructors, state, concrete methods");
console.log("   • Runtime existence (instanceof works)");
console.log("");
console.log("📐 INTERFACES:");
console.log("   • Contract definition only");
console.log("   • No implementation");
console.log("   • Multiple inheritance");
console.log("   • No constructors or state");
console.log("   • Compile-time only (duck typing)");
console.log("");
console.log("🎯 KEY INSIGHT:");
console.log("   • Abstract classes = 'IS-A' relationship with shared code");
console.log("   • Interfaces = 'CAN-DO' relationship with contracts");
console.log("   • Use abstract classes for related families");
console.log("   • Use interfaces for flexible contracts");
console.log("   • Combine both for maximum power! 🚀");

export {}; 