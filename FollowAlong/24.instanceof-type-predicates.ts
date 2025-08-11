// ===== INSTANCEOF AND TYPE PREDICATES =====
// Mastering instance-based type narrowing and custom type predicates

// ===== WHAT IS INSTANCEOF? =====
console.log("=== What Is instanceof? ===");

/*
INSTANCEOF is a JavaScript operator that checks if an object is an instance of a specific class/constructor.
In TypeScript, it becomes a POWERFUL TYPE NARROWING TOOL for objects and classes.

🎯 SYNTAX: objectVariable instanceof ConstructorFunction

🔧 HOW INSTANCEOF WORKS FOR TYPE NARROWING:
• Checks if an object was created by a specific constructor
• Works with classes, built-in objects (Date, Array, Error, etc.)
• TypeScript narrows the type based on constructor validation
• Safer than property checking for class hierarchies

❌ WITHOUT INSTANCEOF (Unsafe):
function processValue(value: Date | string) {
    if (value.getTime) {  // 🚨 Error! getTime might not exist on string
        return value.getTime();
    }
    return value.length;
}

✅ WITH INSTANCEOF (Safe):
function processValue(value: Date | string) {
    if (value instanceof Date) {  // ✅ Safe check - TypeScript narrows to Date
        return value.getTime();
    }
    // TypeScript knows value must be string here
    return value.length;
}

INSTANCEOF is your SAFETY NET for object and class type narrowing!
*/

// ===== BASIC INSTANCEOF USAGE =====
console.log("\n=== Basic instanceof Usage ===");

// Basic class hierarchy
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    speak(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    breed: string;
    
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    
    bark(): string {
        return `${this.name} barks loudly!`;
    }
    
    fetch(): string {
        return `${this.name} fetches the ball`;
    }
}

class Cat extends Animal {
    lives: number = 9;
    
    constructor(name: string) {
        super(name);
    }
    
    meow(): string {
        return `${this.name} meows softly`;
    }
    
    climb(): string {
        return `${this.name} climbs the tree`;
    }
}

class Bird extends Animal {
    canFly: boolean;
    
    constructor(name: string, canFly: boolean = true) {
        super(name);
        this.canFly = canFly;
    }
    
    chirp(): string {
        return `${this.name} chirps melodiously`;
    }
    
    fly(): string {
        return this.canFly ? `${this.name} soars through the sky` : `${this.name} cannot fly`;
    }
}

// Function using instanceof for type narrowing
function handleAnimal(animal: Animal): string {
    console.log(`Handling animal: ${animal.name}`);
    
    // Check for specific animal types
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog
        console.log(`🐕 Dog detected: ${animal.name} (${animal.breed})`);
        return `${animal.bark()} ${animal.fetch()}`;
    }
    
    if (animal instanceof Cat) {
        // TypeScript knows animal is Cat
        console.log(`🐱 Cat detected: ${animal.name} (${animal.lives} lives)`);
        return `${animal.meow()} ${animal.climb()}`;
    }
    
    if (animal instanceof Bird) {
        // TypeScript knows animal is Bird
        console.log(`🐦 Bird detected: ${animal.name} (flies: ${animal.canFly})`);
        return `${animal.chirp()} ${animal.fly()}`;
    }
    
    // Fallback to base Animal
    console.log(`🔤 Generic animal: ${animal.name}`);
    return animal.speak();
}

// Testing basic instanceof usage
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");
const bird = new Bird("Tweety", true);
const penguin = new Bird("Pingu", false);

console.log(handleAnimal(dog));
console.log(handleAnimal(cat));
console.log(handleAnimal(bird));
console.log(handleAnimal(penguin));

// ===== BUILT-IN OBJECTS INSTANCEOF =====
console.log("\n=== Built-in Objects instanceof ===");

// Function to handle various built-in types
function processBuiltInType(value: Date | Array<any> | Error | RegExp | string | number): string {
    console.log(`Processing value: ${value}`);
    
    if (value instanceof Date) {
        // TypeScript knows value is Date
        const isValid = !isNaN(value.getTime());
        console.log(`📅 Date object: ${value.toISOString()} (valid: ${isValid})`);
        return `Date: ${isValid ? value.toDateString() : 'Invalid Date'}`;
    }
    
    if (value instanceof Array) {
        // TypeScript knows value is Array<any>
        console.log(`📊 Array with ${value.length} items: [${value.slice(0, 3).join(', ')}${value.length > 3 ? '...' : ''}]`);
        return `Array: ${value.length} items`;
    }
    
    if (value instanceof Error) {
        // TypeScript knows value is Error
        console.log(`❌ Error object: ${value.message} (${value.name})`);
        return `Error: ${value.name} - ${value.message}`;
    }
    
    if (value instanceof RegExp) {
        // TypeScript knows value is RegExp
        console.log(`🔍 RegExp pattern: ${value.source} (flags: ${value.flags})`);
        return `RegExp: /${value.source}/${value.flags}`;
    }
    
    // TypeScript knows value is string | number
    if (typeof value === 'string') {
        console.log(`📝 String: "${value}" (length: ${value.length})`);
        return `String: "${value}"`;
    } else {
        console.log(`🔢 Number: ${value} (type: ${Number.isInteger(value) ? 'integer' : 'float'})`);
        return `Number: ${value}`;
    }
}

// Testing built-in instanceof
const testDate = new Date();
const testArray = [1, 2, 3, 4, 5];
const testError = new Error("Something went wrong");
const testRegex = /[a-z]+/gi;
const testString = "Hello World";
const testNumber = 42.5;

console.log(processBuiltInType(testDate));
console.log(processBuiltInType(testArray));
console.log(processBuiltInType(testError));
console.log(processBuiltInType(testRegex));
console.log(processBuiltInType(testString));
console.log(processBuiltInType(testNumber));

// ===== CUSTOM ERROR CLASSES =====
console.log("\n=== Custom Error Classes ===");

// Custom error hierarchy
class AppError extends Error {
    code: string;
    timestamp: Date;
    
    constructor(message: string, code: string) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.timestamp = new Date();
    }
    
    getErrorInfo(): string {
        return `${this.code}: ${this.message} at ${this.timestamp.toISOString()}`;
    }
}

class ValidationError extends AppError {
    field: string;
    value: any;
    
    constructor(field: string, value: any, message: string = "Validation failed") {
        super(message, "VALIDATION_ERROR");
        this.name = "ValidationError";
        this.field = field;
        this.value = value;
    }
    
    getValidationDetails(): string {
        return `Field '${this.field}' with value '${this.value}' failed validation: ${this.message}`;
    }
}

class NetworkError extends AppError {
    statusCode: number;
    url: string;
    
    constructor(url: string, statusCode: number, message: string = "Network request failed") {
        super(message, "NETWORK_ERROR");
        this.name = "NetworkError";
        this.statusCode = statusCode;
        this.url = url;
    }
    
    getNetworkDetails(): string {
        return `${this.statusCode} error for ${this.url}: ${this.message}`;
    }
}

class DatabaseError extends AppError {
    query: string;
    table?: string;
    
    constructor(query: string, message: string = "Database operation failed", table?: string) {
        super(message, "DATABASE_ERROR");
        this.name = "DatabaseError";
        this.query = query;
        this.table = table;
    }
    
    getDatabaseDetails(): string {
        const tableInfo = this.table ? ` on table '${this.table}'` : '';
        return `Database error${tableInfo}: ${this.message} (Query: ${this.query})`;
    }
}

// Function to handle different error types
function handleError(error: Error): { type: string; details: string; shouldRetry: boolean } {
    console.log(`Handling error: ${error.name}`);
    
    if (error instanceof ValidationError) {
        // TypeScript knows error is ValidationError
        console.log(`🔍 Validation Error: ${error.getValidationDetails()}`);
        return {
            type: "validation",
            details: error.getValidationDetails(),
            shouldRetry: false // Don't retry validation errors
        };
    }
    
    if (error instanceof NetworkError) {
        // TypeScript knows error is NetworkError
        console.log(`🌐 Network Error: ${error.getNetworkDetails()}`);
        return {
            type: "network",
            details: error.getNetworkDetails(),
            shouldRetry: error.statusCode >= 500 // Retry server errors
        };
    }
    
    if (error instanceof DatabaseError) {
        // TypeScript knows error is DatabaseError
        console.log(`🗄️ Database Error: ${error.getDatabaseDetails()}`);
        return {
            type: "database",
            details: error.getDatabaseDetails(),
            shouldRetry: true // Usually retry database errors
        };
    }
    
    if (error instanceof AppError) {
        // TypeScript knows error is AppError (but not a specific subclass)
        console.log(`⚠️ App Error: ${error.getErrorInfo()}`);
        return {
            type: "app",
            details: error.getErrorInfo(),
            shouldRetry: false // Generic app errors typically shouldn't retry
        };
    }
    
    // TypeScript knows error is base Error
    console.log(`❌ Generic Error: ${error.message}`);
    return {
        type: "unknown",
        details: error.message,
        shouldRetry: false // Unknown errors shouldn't retry
    };
}

// Testing custom error handling
const validationError = new ValidationError("email", "invalid-email", "Email format is invalid");
const networkError = new NetworkError("https://api.example.com/users", 500, "Internal server error");
const databaseError = new DatabaseError("SELECT * FROM users", "Connection timeout", "users");
const appError = new AppError("Feature not available", "FEATURE_DISABLED");
const genericError = new Error("Unknown error occurred");

console.log(handleError(validationError));
console.log(handleError(networkError));
console.log(handleError(databaseError));
console.log(handleError(appError));
console.log(handleError(genericError));

// ===== TYPE PREDICATES =====
console.log("\n=== Type Predicates ===");

/*
TYPE PREDICATES are custom functions that help TypeScript narrow types.
They use the 'is' keyword to tell TypeScript about type relationships.

🎯 SYNTAX: function isType(value: unknown): value is SpecificType

🔧 WHY USE TYPE PREDICATES?
• Create custom type checking logic
• Work with complex type validation
• Handle union types that instanceof can't solve
• Provide reusable type checking functions
• Enable type narrowing in complex scenarios
*/

// Basic type predicates
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
}

// Advanced type predicates for interfaces
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
}

interface Order {
    id: number;
    userId: number;
    productIds: number[];
    total: number;
}

// Type predicate for User
function isUser(value: unknown): value is User {
    return isObject(value) &&
           typeof value.id === 'number' &&
           typeof value.name === 'string' &&
           typeof value.email === 'string';
}

// Type predicate for Product
function isProduct(value: unknown): value is Product {
    return isObject(value) &&
           typeof value.id === 'number' &&
           typeof value.title === 'string' &&
           typeof value.price === 'number';
}

// Type predicate for Order
function isOrder(value: unknown): value is Order {
    return isObject(value) &&
           typeof value.id === 'number' &&
           typeof value.userId === 'number' &&
           isArray<number>(value.productIds) &&
           value.productIds.every(id => typeof id === 'number') &&
           typeof value.total === 'number';
}

// Generic type predicate factory
function hasRequiredProperties<T extends Record<string, any>>(
    value: unknown,
    properties: { [K in keyof T]: (val: unknown) => val is T[K] }
): value is T {
    if (!isObject(value)) {
        return false;
    }
    
    return Object.entries(properties).every(([key, validator]) => {
        return key in value && validator(value[key]);
    });
}

// Using the generic type predicate factory
const userValidator = {
    id: isNumber,
    name: isString,
    email: isString
};

function isValidUser(value: unknown): value is User {
    return hasRequiredProperties<User>(value, userValidator);
}

// Function using type predicates
function processUnknownData(data: unknown): string {
    console.log("Processing unknown data...");
    
    if (isUser(data)) {
        // TypeScript knows data is User
        console.log(`👤 User: ${data.name} (${data.email})`);
        return `User: ${data.name}`;
    }
    
    if (isProduct(data)) {
        // TypeScript knows data is Product
        console.log(`🛒 Product: ${data.title} - $${data.price}`);
        return `Product: ${data.title}`;
    }
    
    if (isOrder(data)) {
        // TypeScript knows data is Order
        console.log(`📦 Order: ${data.id} for user ${data.userId} (${data.productIds.length} items, $${data.total})`);
        return `Order: ${data.id}`;
    }
    
    if (isString(data)) {
        // TypeScript knows data is string
        console.log(`📝 String: "${data}"`);
        return `String: ${data}`;
    }
    
    if (isNumber(data)) {
        // TypeScript knows data is number
        console.log(`🔢 Number: ${data}`);
        return `Number: ${data}`;
    }
    
    if (isArray(data)) {
        // TypeScript knows data is unknown[]
        console.log(`📊 Array with ${data.length} items`);
        return `Array: ${data.length} items`;
    }
    
    console.log(`❓ Unknown data type: ${typeof data}`);
    return `Unknown: ${typeof data}`;
}

// Testing type predicates
const userData = { id: 1, name: "Alice", email: "alice@example.com" };
const productData = { id: 2, title: "TypeScript Guide", price: 29.99 };
const orderData = { id: 3, userId: 1, productIds: [2, 5, 8], total: 89.97 };
const stringData = "Hello World";
const numberData = 42;
const arrayData = [1, 2, 3];
const invalidData = { invalid: "structure" };

console.log(processUnknownData(userData));
console.log(processUnknownData(productData));
console.log(processUnknownData(orderData));
console.log(processUnknownData(stringData));
console.log(processUnknownData(numberData));
console.log(processUnknownData(arrayData));
console.log(processUnknownData(invalidData));

// ===== COMBINING INSTANCEOF AND TYPE PREDICATES =====
console.log("\n=== Combining instanceof and Type Predicates ===");

// Complex hierarchy with interfaces and classes
interface Drawable {
    draw(): string;
}

interface Colorable {
    color: string;
    setColor(color: string): void;
}

class Shape implements Drawable {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    draw(): string {
        return `Drawing ${this.name}`;
    }
    
    getInfo(): string {
        return `Shape: ${this.name}`;
    }
}

class ColoredShape extends Shape implements Colorable {
    color: string;
    
    constructor(name: string, color: string = "black") {
        super(name);
        this.color = color;
    }
    
    setColor(color: string): void {
        this.color = color;
        console.log(`${this.name} color changed to ${color}`);
    }
    
    draw(): string {
        return `Drawing ${this.color} ${this.name}`;
    }
    
    getInfo(): string {
        return `Colored Shape: ${this.color} ${this.name}`;
    }
}

class Circle extends ColoredShape {
    radius: number;
    
    constructor(radius: number, color: string = "black") {
        super("circle", color);
        this.radius = radius;
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    draw(): string {
        return `Drawing ${this.color} circle with radius ${this.radius}`;
    }
}

class Rectangle extends ColoredShape {
    width: number;
    height: number;
    
    constructor(width: number, height: number, color: string = "black") {
        super("rectangle", color);
        this.width = width;
        this.height = height;
    }
    
    getArea(): number {
        return this.width * this.height;
    }
    
    draw(): string {
        return `Drawing ${this.color} rectangle ${this.width}x${this.height}`;
    }
}

// Type predicate for Drawable
function isDrawable(value: unknown): value is Drawable {
    return isObject(value) && isFunction((value as any).draw);
}

// Type predicate for Colorable
function isColorable(value: unknown): value is Colorable {
    return isObject(value) &&
           typeof (value as any).color === 'string' &&
           isFunction((value as any).setColor);
}

// Type predicate for objects with area
function hasArea(value: unknown): value is { getArea(): number } {
    return isObject(value) && isFunction((value as any).getArea);
}

// Function combining instanceof and type predicates
function processShape(shape: unknown): string {
    console.log("Processing shape...");
    
    // Check class hierarchy with instanceof
    if (shape instanceof Circle) {
        // TypeScript knows shape is Circle
        console.log(`🔵 Circle: radius ${shape.radius}, area ${shape.getArea().toFixed(2)}`);
        return `${shape.draw()} (Area: ${shape.getArea().toFixed(2)})`;
    }
    
    if (shape instanceof Rectangle) {
        // TypeScript knows shape is Rectangle
        console.log(`▭ Rectangle: ${shape.width}x${shape.height}, area ${shape.getArea()}`);
        return `${shape.draw()} (Area: ${shape.getArea()})`;
    }
    
    if (shape instanceof ColoredShape) {
        // TypeScript knows shape is ColoredShape
        console.log(`🎨 Colored Shape: ${shape.color} ${shape.name}`);
        return shape.draw();
    }
    
    if (shape instanceof Shape) {
        // TypeScript knows shape is Shape
        console.log(`📐 Basic Shape: ${shape.name}`);
        return shape.draw();
    }
    
    // Check interface compliance with type predicates
    if (isDrawable(shape) && isColorable(shape)) {
        // TypeScript knows shape implements both interfaces
        console.log(`🎨📐 Drawable and Colorable object: ${shape.color}`);
        return `${shape.draw()} (Color: ${shape.color})`;
    }
    
    if (isDrawable(shape)) {
        // TypeScript knows shape implements Drawable
        console.log(`📐 Drawable object`);
        return shape.draw();
    }
    
    console.log(`❓ Unknown shape type`);
    return "Unknown shape";
}

// Testing combined approach
const circle = new Circle(5, "red");
const rectangle = new Rectangle(4, 6, "blue");
const coloredShape = new ColoredShape("triangle", "green");
const basicShape = new Shape("polygon");

// Custom object implementing interfaces
const customDrawable = {
    color: "purple",
    draw: () => "Drawing custom purple object",
    setColor: (newColor: string) => { console.log(`Color changed to ${newColor}`); }
};

console.log(processShape(circle));
console.log(processShape(rectangle));
console.log(processShape(coloredShape));
console.log(processShape(basicShape));
console.log(processShape(customDrawable));

// ===== PERFORMANCE CONSIDERATIONS =====
console.log("\n=== Performance Considerations ===");

// Performance comparison: instanceof vs type predicates
interface PerformanceTest {
    id: number;
    data: string;
}

class PerformanceTestClass {
    constructor(public id: number, public data: string) {}
}

// Type predicate approach
function isPerformanceTest(value: unknown): value is PerformanceTest {
    return isObject(value) &&
           typeof (value as any).id === 'number' &&
           typeof (value as any).data === 'string';
}

// Performance test function
function measureTypeCheckingPerformance() {
    const testData: (PerformanceTestClass | PerformanceTest | unknown)[] = [];
    
    // Generate test data
    for (let i = 0; i < 1000; i++) {
        testData.push(new PerformanceTestClass(i, `data${i}`));
        testData.push({ id: i, data: `data${i}` });
        testData.push(`string${i}`);
    }
    
    console.log(`Testing with ${testData.length} items...`);
    
    // Test instanceof performance
    const instanceofStart = performance.now();
    let instanceofCount = 0;
    
    for (const item of testData) {
        if (item instanceof PerformanceTestClass) {
            instanceofCount++;
        }
    }
    
    const instanceofEnd = performance.now();
    const instanceofTime = instanceofEnd - instanceofStart;
    
    // Test type predicate performance
    const predicateStart = performance.now();
    let predicateCount = 0;
    
    for (const item of testData) {
        if (isPerformanceTest(item)) {
            predicateCount++;
        }
    }
    
    const predicateEnd = performance.now();
    const predicateTime = predicateEnd - predicateStart;
    
    console.log(`instanceof: Found ${instanceofCount} instances in ${instanceofTime.toFixed(3)}ms`);
    console.log(`Type predicate: Found ${predicateCount} instances in ${predicateTime.toFixed(3)}ms`);
    console.log(`Performance ratio: instanceof is ${(predicateTime / instanceofTime).toFixed(2)}x faster`);
}

measureTypeCheckingPerformance();

// ===== BEST PRACTICES =====
console.log("\n=== instanceof and Type Predicates Best Practices ===");

/*
✅ INSTANCEOF BEST PRACTICES:

1. 🏗️  USE FOR CLASS HIERARCHIES
   ✅ if (obj instanceof MyClass) { ... }
   ❌ if (typeof obj === 'object' && obj.constructor === MyClass) { ... }

2. 🔧  USE FOR BUILT-IN OBJECTS
   ✅ if (value instanceof Date) { ... }
   ✅ if (value instanceof Array) { ... }
   ✅ if (error instanceof Error) { ... }

3. 🎯  COMBINE WITH INHERITANCE
   ✅ Check specific subclasses before parent classes
   if (animal instanceof Dog) { ... }
   else if (animal instanceof Animal) { ... }

4. ⚡  PREFER FOR PERFORMANCE
   ✅ instanceof is faster than custom type checking
   ❌ Don't overuse when simple typeof suffices

✅ TYPE PREDICATE BEST PRACTICES:

1. 🛡️  USE FOR INTERFACE VALIDATION
   ✅ function isUser(obj: unknown): obj is User { ... }
   ❌ Using instanceof for interfaces (impossible)

2. 🔍  VALIDATE ALL REQUIRED PROPERTIES
   ✅ Check typeof for each property
   ✅ Use recursive validation for nested objects
   ❌ Assume property existence without checking

3. 📝  MAKE THEM REUSABLE
   ✅ Create generic type predicate factories
   ✅ Compose simple predicates into complex ones

4. 🚀  OPTIMIZE FOR COMMON CASES
   ✅ Check most likely types first
   ✅ Use early returns for performance

❌ COMMON MISTAKES:

1. Using instanceof with Primitives:
   ❌ if (str instanceof String) { ... }  // Use typeof for primitives
   ✅ if (typeof str === 'string') { ... }

2. Not Handling Null/Undefined:
   ❌ if (obj instanceof MyClass) { ... }  // obj might be null
   ✅ if (obj && obj instanceof MyClass) { ... }

3. Incomplete Type Predicates:
   ❌ function isUser(obj: any): obj is User { return obj.name; }
   ✅ function isUser(obj: unknown): obj is User { 
       return isObject(obj) && typeof obj.name === 'string' && typeof obj.id === 'number';
   }

4. Wrong Order in Class Hierarchies:
   ❌ if (animal instanceof Animal) { ... } // Check parent first
      else if (animal instanceof Dog) { ... } // Unreachable!
   ✅ if (animal instanceof Dog) { ... } // Check child first
      else if (animal instanceof Animal) { ... }

5. Performance Anti-patterns:
   ❌ Complex type predicates in hot loops
   ✅ Cache type checking results when possible
*/

// Example demonstrating best practices
class Vehicle {
    constructor(public brand: string, public year: number) {}
    
    getAge(): number {
        return new Date().getFullYear() - this.year;
    }
}

class ElectricVehicle extends Vehicle {
    constructor(brand: string, year: number, public batteryCapacity: number) {
        super(brand, year);
    }
    
    getRange(): number {
        return this.batteryCapacity * 3; // Simplified calculation
    }
}

class Tesla extends ElectricVehicle {
    constructor(year: number, batteryCapacity: number, public model: string) {
        super("Tesla", year, batteryCapacity);
    }
    
    enableAutopilot(): string {
        return `${this.model} autopilot enabled`;
    }
}

// Interface for additional features
interface SelfDriving {
    autopilotVersion: string;
    enableAutopilot(): string;
}

// Type predicate for SelfDriving
function isSelfDriving(vehicle: unknown): vehicle is SelfDriving {
    return isObject(vehicle) &&
           typeof (vehicle as any).autopilotVersion === 'string' &&
           isFunction((vehicle as any).enableAutopilot);
}

// Optimized vehicle processing function
function processVehicleOptimized(vehicle: Vehicle | unknown): string {
    // Step 1: Validate input
    if (!vehicle || !(vehicle instanceof Vehicle)) {
        return "Invalid vehicle";
    }
    
    // Step 2: Check most specific types first (performance optimization)
    if (vehicle instanceof Tesla) {
        // TypeScript knows vehicle is Tesla
        console.log(`🚗 Tesla ${vehicle.model} (${vehicle.year}) - ${vehicle.batteryCapacity}kWh`);
        const features = [
            vehicle.enableAutopilot(),
            `Range: ${vehicle.getRange()} miles`,
            `Age: ${vehicle.getAge()} years`
        ];
        return `Tesla ${vehicle.model}: ${features.join(', ')}`;
    }
    
    if (vehicle instanceof ElectricVehicle) {
        // TypeScript knows vehicle is ElectricVehicle
        console.log(`⚡ Electric ${vehicle.brand} (${vehicle.year}) - ${vehicle.batteryCapacity}kWh`);
        return `Electric ${vehicle.brand}: Range ${vehicle.getRange()} miles, Age ${vehicle.getAge()} years`;
    }
    
    // Step 3: Check for interface implementation
    if (isSelfDriving(vehicle)) {
        // TypeScript knows vehicle implements SelfDriving
        console.log(`🤖 Self-driving vehicle: ${vehicle.autopilotVersion}`);
        return `Self-driving ${vehicle.brand}: ${vehicle.enableAutopilot()}`;
    }
    
    // Step 4: Fallback to base class
    console.log(`🚙 Standard vehicle: ${vehicle.brand} (${vehicle.year})`);
    return `${vehicle.brand} vehicle, Age: ${vehicle.getAge()} years`;
}

// Testing optimized approach
const tesla = new Tesla(2023, 100, "Model S");
const electricVehicle = new ElectricVehicle("Nissan", 2022, 60);
const regularVehicle = new Vehicle("Toyota", 2020);

// Custom self-driving vehicle
const customSelfDriving: Vehicle & SelfDriving = {
    brand: "Custom",
    year: 2024,
    autopilotVersion: "v2.0",
    getAge: function() { return new Date().getFullYear() - this.year; },
    enableAutopilot: function() { return `${this.brand} autopilot ${this.autopilotVersion} activated`; }
};

console.log(processVehicleOptimized(tesla));
console.log(processVehicleOptimized(electricVehicle));
console.log(processVehicleOptimized(regularVehicle));
console.log(processVehicleOptimized(customSelfDriving));

// ===== SUMMARY =====
console.log("\n=== instanceof and Type Predicates Summary ===");
console.log("🏗️ INSTANCEOF ENABLES:");
console.log("   • Class and constructor-based type narrowing");
console.log("   • Built-in object type checking (Date, Array, Error)");
console.log("   • Inheritance hierarchy validation");
console.log("   • Fast and reliable object type identification");
console.log("");
console.log("🛡️ TYPE PREDICATES ENABLE:");
console.log("   • Custom type validation logic");
console.log("   • Interface implementation checking");
console.log("   • Complex object shape validation");
console.log("   • Reusable type checking functions");
console.log("");
console.log("🎯 KEY TECHNIQUES:");
console.log("   • instanceof for classes: obj instanceof MyClass");
console.log("   • Type predicates: function isType(val: unknown): val is Type");
console.log("   • Combining both for comprehensive type checking");
console.log("   • Generic type predicate factories for reusability");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Use instanceof for classes, type predicates for interfaces");
console.log("   • Check specific types before general types");
console.log("   • Validate all required properties in type predicates");
console.log("   • Consider performance implications in hot code paths");
console.log("   • Handle null/undefined cases appropriately");
console.log("");
console.log("🚀 REMEMBER:");
console.log("   • instanceof = Fast class/object checking");
console.log("   • Type predicates = Custom validation logic");
console.log("   • Together they provide complete type narrowing coverage");
console.log("   • Essential for robust TypeScript applications! 🎯");

export {}; 