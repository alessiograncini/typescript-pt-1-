// ===== INTERFACES IN TYPESCRIPT =====
// Interfaces define the shape of objects and contracts for classes

// ===== BASIC INTERFACE =====
interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
}

const alessio: User = { 
    dbId: 22, 
    email: "h@h.com", 
    userId: 2211 
};

hitesh.email = "h@hc.com"; // ✅ Can modify
// hitesh.dbId = 33; // ❌ Error - readonly property

console.log(`User: ${hitesh.email}, ID: ${hitesh.userId}`);

// ===== INTERFACE WITH METHODS =====
interface User2 {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    startTrail(): string;
}

const hitesh2: User2 = { 
    dbId: 22, 
    email: "h@h.com", 
    userId: 2211,
    startTrail: () => {
        return "trail started";
    }
};

console.log(hitesh2.startTrail()); // "trail started"

// ===== INTERFACE VS TYPE =====
console.log("\n=== Interface vs Type ===");

// ===== INTERFACE APPROACH =====
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

const bear1 = getBear();
console.log(bear1.name);
console.log(bear1.honey);

function getBear(): Bear {
    return { name: "Winnie", honey: true };
}

// ===== TYPE APPROACH =====
type AnimalType = {
    name: string;
};

type BearType = AnimalType & {
    honey: boolean;
};

const bear2 = getBearType();
console.log(bear2.name);
console.log(bear2.honey);

function getBearType(): BearType {
    return { name: "Paddington", honey: true };
}

// ===== REOPENING INTERFACES =====
console.log("\n=== Interface Reopening (Declaration Merging) ===");

// First declaration
interface Window {
    title: string;
}

// Second declaration - MERGES with the first!
interface Window {
    version: number;
}

// Third declaration - MERGES again!
interface Window {
    close(): void;
}

// Now Window has ALL properties
const myWindow: Window = {
    title: "My App",
    version: 1.0,
    close() {
        console.log("Window closed");
    }
};

console.log(`Window: ${myWindow.title} v${myWindow.version}`);
myWindow.close();

// ===== TYPES CANNOT BE REOPENED =====
type WindowType = {
    title: string;
};

// ❌ This would cause an error:
// type WindowType = {
//     version: number;
// }; // Error: Duplicate identifier 'WindowType'

// ===== EXTENDING INTERFACES =====
console.log("\n=== Interface Inheritance ===");

// Base interface
interface Shape {
    color: string;
    area(): number;
}

// Extending single interface
interface Circle extends Shape {
    radius: number;
}

// Extending multiple interfaces
interface Drawable {
    draw(): void;
}

interface Movable {
    move(x: number, y: number): void;
}

interface Rectangle extends Shape, Drawable, Movable {
    width: number;
    height: number;
}

// Implementation
const circle: Circle = {
    color: "red",
    radius: 5,
    area() {
        return Math.PI * this.radius ** 2;
    }
};

const rectangle: Rectangle = {
    color: "blue",
    width: 10,
    height: 20,
    area() {
        return this.width * this.height;
    },
    draw() {
        console.log(`Drawing ${this.color} rectangle`);
    },
    move(x: number, y: number) {
        console.log(`Moving rectangle to (${x}, ${y})`);
    }
};

console.log(`Circle area: ${circle.area()}`);
console.log(`Rectangle area: ${rectangle.area()}`);
rectangle.draw();
rectangle.move(5, 10);

// ===== INTERFACE VS TYPE: EXTENDING COMPARISON =====
console.log("\n=== Extending: Interface vs Type ===");

// Interface extending interface
interface BaseInterface {
    id: number;
    name: string;
}

interface ExtendedInterface extends BaseInterface {
    email: string;
}

// Type extending type (using intersection)
type BaseType = {
    id: number;
    name: string;
};

type ExtendedType = BaseType & {
    email: string;
};

// Interface extending type
interface InterfaceFromType extends BaseType {
    phone: string;
}

// Type extending interface (using intersection)
type TypeFromInterface = BaseInterface & {
    address: string;
};

// All work similarly
const user1: ExtendedInterface = { id: 1, name: "John", email: "john@example.com" };
const user2: ExtendedType = { id: 2, name: "Jane", email: "jane@example.com" };
const user3: InterfaceFromType = { id: 3, name: "Bob", phone: "123-456-7890" };
const user4: TypeFromInterface = { id: 4, name: "Alice", address: "123 Main St" };

// ===== FUNCTION INTERFACES =====
console.log("\n=== Function Interfaces ===");

// Interface for function signature
interface SearchFunction {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunction = function(source: string, subString: string): boolean {
    return source.search(subString) > -1;
};

// Interface with callable and properties
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number) {
        return `Started at ${start}`;
    } as Counter;
    
    counter.interval = 123;
    counter.reset = function() {
        console.log("Counter reset");
    };
    
    return counter;
}

const myCounter = getCounter();
console.log(myCounter(10)); // "Started at 10"
console.log(`Interval: ${myCounter.interval}`); // 123
myCounter.reset(); // "Counter reset"

// ===== INDEX SIGNATURES =====
console.log("\n=== Index Signatures ===");

// String index signature
interface StringDictionary {
    [key: string]: string;
}

const dict: StringDictionary = {
    name: "John",
    city: "New York",
    country: "USA"
};

// Number index signature
interface NumberArray {
    [index: number]: string;
}

const names: NumberArray = ["Alice", "Bob", "Charlie"];
console.log(names[0]); // "Alice"

// Mixed index signatures
interface MixedDictionary {
    [key: string]: string | number;
    length: number; // Must be compatible with string index type
}

// ===== CLASS IMPLEMENTING INTERFACES =====
console.log("\n=== Classes Implementing Interfaces ===");

interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

// Class implementing single interface
class Bird implements Flyable {
    fly(): void {
        console.log("Bird is flying");
    }
}

// Class implementing multiple interfaces
class Duck implements Flyable, Swimmable {
    fly(): void {
        console.log("Duck is flying");
    }
    
    swim(): void {
        console.log("Duck is swimming");
    }
}

const bird = new Bird();
const duck = new Duck();

bird.fly();
duck.fly();
duck.swim();

// ===== DETAILED INTERFACE IMPLEMENTATION EXAMPLE =====
console.log("\n=== Detailed Interface Implementation ===");

// Define interfaces for different capabilities
interface Drivable {
    speed: number;
    drive(): string;
    stop(): string;
}

interface Trackable {
    readonly id: string;
    location: { x: number; y: number };
    getLocation(): string;
}

interface Maintainable {
    lastMaintenance: Date;
    performMaintenance(): void;
    needsMaintenance(): boolean;
}

// Class implementing single interface
class Bicycle implements Drivable {
    speed: number = 0;

    drive(): string {
        this.speed = 15;
        return `Bicycle pedaling at ${this.speed} km/h`;
    }

    stop(): string {
        this.speed = 0;
        return "Bicycle stopped";
    }
}

// Class implementing multiple interfaces
class SmartCar implements Drivable, Trackable, Maintainable {
    speed: number = 0;
    readonly id: string;
    location: { x: number; y: number };
    lastMaintenance: Date;

    constructor(id: string) {
        this.id = id;
        this.location = { x: 0, y: 0 };
        this.lastMaintenance = new Date();
    }

    // Implementing Drivable interface
    drive(): string {
        this.speed = 60;
        this.location.x += 10;
        return `Smart car ${this.id} driving at ${this.speed} km/h`;
    }

    stop(): string {
        this.speed = 0;
        return `Smart car ${this.id} stopped`;
    }

    // Implementing Trackable interface
    getLocation(): string {
        return `Car ${this.id} is at (${this.location.x}, ${this.location.y})`;
    }

    // Implementing Maintainable interface
    performMaintenance(): void {
        this.lastMaintenance = new Date();
        console.log(`Maintenance performed on car ${this.id}`);
    }

    needsMaintenance(): boolean {
        const daysSinceLastMaintenance = 
            (Date.now() - this.lastMaintenance.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceLastMaintenance > 30;
    }

    // Additional methods specific to SmartCar
    getFullStatus(): string {
        return `${this.getLocation()}, Speed: ${this.speed} km/h, Needs maintenance: ${this.needsMaintenance()}`;
    }
}

// Usage examples
const bicycle = new Bicycle();
const smartCar = new SmartCar("CAR001");

console.log(bicycle.drive());
console.log(bicycle.stop());

console.log(smartCar.drive());
console.log(smartCar.getLocation());
console.log(smartCar.getFullStatus());

if (smartCar.needsMaintenance()) {
    smartCar.performMaintenance();
}

// ===== INTERFACE WITH CONSTRUCTOR SIGNATURE =====
console.log("\n=== Interface with Constructor Signature ===");

// Interface for class constructor
interface Constructable {
    new(name: string): { name: string; greet(): string };
}

// Classes that match the constructor interface
class Person {
    constructor(public name: string) {}
    
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

class Robot {
    constructor(public name: string) {}
    
    greet(): string {
        return `Beep boop, I'm ${this.name}`;
    }
}

// Function that works with any class matching the interface
function createAndGreet(ctor: Constructable, name: string): string {
    const instance = new ctor(name);
    return instance.greet();
}

console.log(createAndGreet(Person, "Alice"));  // "Hello, I'm Alice"
console.log(createAndGreet(Robot, "R2D2"));    // "Beep boop, I'm R2D2"

// ===== IMPLEMENTING INTERFACE WITH INHERITANCE =====
console.log("\n=== Interface Implementation with Inheritance ===");

// Base interface
interface Vehicle {
    brand: string;
    model: string;
    start(): string;
}

// Extended interface
interface ElectricVehicle extends Vehicle {
    batteryLevel: number;
    charge(): string;
}

// Base class implementing basic interface
class BasicCar implements Vehicle {
    constructor(
        public brand: string,
        public model: string
    ) {}

    start(): string {
        return `${this.brand} ${this.model} engine started`;
    }
}

// Derived class implementing extended interface
class Tesla extends BasicCar implements ElectricVehicle {
    batteryLevel: number = 100;

    constructor(model: string) {
        super("Tesla", model);
    }

    start(): string {
        return `${this.brand} ${this.model} silently started (Battery: ${this.batteryLevel}%)`;
    }

    charge(): string {
        this.batteryLevel = 100;
        return `${this.brand} ${this.model} fully charged`;
    }

    // Additional Tesla-specific methods
    enableAutopilot(): string {
        return `${this.brand} ${this.model} autopilot enabled`;
    }
}

const basicCar = new BasicCar("Toyota", "Corolla");
const tesla = new Tesla("Model 3");

console.log(basicCar.start());
console.log(tesla.start());
console.log(tesla.charge());
console.log(tesla.enableAutopilot());

// ===== REAL-WORLD EXAMPLE: PAYMENT SYSTEM =====
console.log("\n=== Real-World Example: Payment System ===");

// Payment interface
interface PaymentProcessor {
    readonly providerId: string;
    processPayment(amount: number, currency: string): Promise<PaymentResult>;
    refund(transactionId: string, amount: number): Promise<RefundResult>;
}

// Supporting interfaces
interface PaymentResult {
    success: boolean;
    transactionId: string;
    message: string;
}

interface RefundResult {
    success: boolean;
    refundId: string;
    message: string;
}

// Credit Card payment implementation
class CreditCardProcessor implements PaymentProcessor {
    readonly providerId: string = "CREDIT_CARD";

    async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        // Simulate API call
        console.log(`Processing credit card payment: ${amount} ${currency}`);
        
        return {
            success: true,
            transactionId: `CC_${Date.now()}`,
            message: `Credit card payment of ${amount} ${currency} processed successfully`
        };
    }

    async refund(transactionId: string, amount: number): Promise<RefundResult> {
        console.log(`Processing credit card refund: ${amount} for transaction ${transactionId}`);
        
        return {
            success: true,
            refundId: `REF_${Date.now()}`,
            message: `Refund of ${amount} processed successfully`
        };
    }
}

// PayPal payment implementation
class PayPalProcessor implements PaymentProcessor {
    readonly providerId: string = "PAYPAL";

    async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        console.log(`Processing PayPal payment: ${amount} ${currency}`);
        
        return {
            success: true,
            transactionId: `PP_${Date.now()}`,
            message: `PayPal payment of ${amount} ${currency} processed successfully`
        };
    }

    async refund(transactionId: string, amount: number): Promise<RefundResult> {
        console.log(`Processing PayPal refund: ${amount} for transaction ${transactionId}`);
        
        return {
            success: true,
            refundId: `PP_REF_${Date.now()}`,
            message: `PayPal refund of ${amount} processed successfully`
        };
    }
}

// Payment service that works with any payment processor
class PaymentService {
    private processors: Map<string, PaymentProcessor> = new Map();

    addProcessor(processor: PaymentProcessor): void {
        this.processors.set(processor.providerId, processor);
        console.log(`Added payment processor: ${processor.providerId}`);
    }

    async processPayment(
        providerId: string, 
        amount: number, 
        currency: string
    ): Promise<PaymentResult> {
        const processor = this.processors.get(providerId);
        
        if (!processor) {
            return {
                success: false,
                transactionId: "",
                message: `Payment processor ${providerId} not found`
            };
        }

        return await processor.processPayment(amount, currency);
    }
}

// Usage example
async function demonstratePaymentSystem() {
    const paymentService = new PaymentService();
    
    // Add different payment processors
    paymentService.addProcessor(new CreditCardProcessor());
    paymentService.addProcessor(new PayPalProcessor());
    
    // Process payments with different providers
    const ccResult = await paymentService.processPayment("CREDIT_CARD", 99.99, "USD");
    const ppResult = await paymentService.processPayment("PAYPAL", 149.99, "EUR");
    
    console.log("Credit Card Result:", ccResult);
    console.log("PayPal Result:", ppResult);
}

// Run the demonstration
demonstratePaymentSystem();

// ===== GENERIC INTERFACES =====
console.log("\n=== Generic Interfaces ===");

interface Repository<T> {
    getById(id: number): T | null;
    save(entity: T): void;
    delete(id: number): void;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

class ProductRepository implements Repository<Product> {
    private products: Product[] = [];

    getById(id: number): Product | null {
        return this.products.find(p => p.id === id) || null;
    }

    save(product: Product): void {
        this.products.push(product);
        console.log(`Saved product: ${product.name}`);
    }

    delete(id: number): void {
        this.products = this.products.filter(p => p.id !== id);
        console.log(`Deleted product with id: ${id}`);
    }
}

const productRepo = new ProductRepository();
productRepo.save({ id: 1, name: "Laptop", price: 999 });
productRepo.save({ id: 2, name: "Mouse", price: 25 });

// ===== CONDITIONAL INTERFACES =====
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface UserProfile {
    id: number;
    name: string;
    email: string;
}

const userResponse: ApiResponse<UserProfile> = {
    data: { id: 1, name: "John", email: "john@example.com" },
    status: 200,
    message: "Success"
};

const usersResponse: ApiResponse<UserProfile[]> = {
    data: [
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" }
    ],
    status: 200,
    message: "Success"
};

// ===== WHEN TO USE INTERFACE VS TYPE =====
console.log("\n=== When to Use Interface vs Type ===");

console.log("✅ USE INTERFACE when:");
console.log("  • Defining object shapes");
console.log("  • You might extend/implement them");
console.log("  • You need declaration merging");
console.log("  • Creating public APIs");
console.log("  • Working with classes");

console.log("\n✅ USE TYPE when:");
console.log("  • Creating unions/intersections");
console.log("  • Computed properties");
console.log("  • Complex type operations");
console.log("  • Primitive aliases");
console.log("  • Function types");

// ===== PRACTICAL EXAMPLES =====
console.log("\n=== Real-World Examples ===");

// 1. Database Entity
interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface UserEntity extends BaseEntity {
    username: string;
    email: string;
    isActive: boolean;
}

interface PostEntity extends BaseEntity {
    title: string;
    content: string;
    authorId: number;
    tags: string[];
}

// 2. Event System
interface EventListener<T = any> {
    (event: T): void;
}

interface EventEmitter {
    on<T>(event: string, listener: EventListener<T>): void;
    emit<T>(event: string, data: T): void;
    off(event: string, listener: EventListener): void;
}

// 3. HTTP Client
interface HttpHeaders {
    [key: string]: string;
}

interface HttpRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HttpHeaders;
    body?: any;
}

interface HttpResponse<T = any> {
    status: number;
    statusText: string;
    headers: HttpHeaders;
    data: T;
}

// ===== INTERFACE MERGING IN PRACTICE =====
console.log("\n=== Practical Interface Merging ===");

// Extending built-in types (like adding to Window, Document, etc.)
declare global {
    interface Window {
        myCustomProperty: string;
        myCustomMethod(): void;
    }
}

// This would work in a browser environment:
// window.myCustomProperty = "Hello World";
// window.myCustomMethod = () => console.log("Custom method");

// Module augmentation example
interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
}

// Implementation would be:
// Array.prototype.first = function() { return this[0]; };
// Array.prototype.last = function() { return this[this.length - 1]; };

console.log("Interfaces provide powerful contracts and extensibility! 🔧");

export {}; 