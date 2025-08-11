// instanceof and type predicates: class-based and custom type narrowing

// Basic instanceof with class hierarchy
class Animal {
    constructor(protected name: string) {}
    
    speak(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name);
    }
    
    bark(): string {
        return `${this.name} barks!`;
    }
    
    getBreed(): string {
        return this.breed;
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    meow(): string {
        return `${this.name} meows!`;
    }
}

function handleAnimal(animal: Animal): string {
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog
        return `${animal.bark()} Breed: ${animal.getBreed()}`;
    }
    
    if (animal instanceof Cat) {
        // TypeScript knows animal is Cat
        return animal.meow();
    }
    
    // Base Animal
    return animal.speak();
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");
const animal = new Animal("Generic");

console.log(handleAnimal(dog));
console.log(handleAnimal(cat));
console.log(handleAnimal(animal));

// Built-in object instanceof
function processBuiltInType(value: Date | Array<any> | Error | string): string {
    if (value instanceof Date) {
        return `Date: ${value.toISOString()}`;
    }
    
    if (value instanceof Array) {
        return `Array: ${value.length} items`;
    }
    
    if (value instanceof Error) {
        return `Error: ${value.message}`;
    }
    
    // Must be string
    return `String: "${value}"`;
}

const testDate = new Date();
const testArray = [1, 2, 3];
const testError = new Error("Something went wrong");
const testString = "Hello World";

console.log(processBuiltInType(testDate));
console.log(processBuiltInType(testArray));
console.log(processBuiltInType(testError));
console.log(processBuiltInType(testString));

// Custom error hierarchy
class AppError extends Error {
    constructor(message: string, public code: string) {
        super(message);
        this.name = "AppError";
    }
}

class ValidationError extends AppError {
    constructor(field: string, message: string) {
        super(`${field}: ${message}`, "VALIDATION_ERROR");
        this.name = "ValidationError";
    }
}

class NetworkError extends AppError {
    constructor(public statusCode: number, message: string) {
        super(message, "NETWORK_ERROR");
        this.name = "NetworkError";
    }
}

function handleError(error: Error): string {
    if (error instanceof ValidationError) {
        return `Validation Error: ${error.message}`;
    }
    
    if (error instanceof NetworkError) {
        return `Network Error ${error.statusCode}: ${error.message}`;
    }
    
    if (error instanceof AppError) {
        return `App Error [${error.code}]: ${error.message}`;
    }
    
    return `Generic Error: ${error.message}`;
}

const validationError = new ValidationError("email", "Invalid format");
const networkError = new NetworkError(404, "Resource not found");
const appError = new AppError("Feature disabled", "FEATURE_DISABLED");
const genericError = new Error("Unknown error");

console.log(handleError(validationError));
console.log(handleError(networkError));
console.log(handleError(appError));
console.log(handleError(genericError));

// Type predicates
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

// Interface type predicates
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

function isUser(value: unknown): value is User {
    return isObject(value) &&
           typeof (value as any).id === 'number' &&
           typeof (value as any).name === 'string' &&
           typeof (value as any).email === 'string';
}

function isProduct(value: unknown): value is Product {
    return isObject(value) &&
           typeof (value as any).id === 'number' &&
           typeof (value as any).title === 'string' &&
           typeof (value as any).price === 'number';
}

function processUnknownData(data: unknown): string {
    if (isUser(data)) {
        return `User: ${data.name} (${data.email})`;
    }
    
    if (isProduct(data)) {
        return `Product: ${data.title} - $${data.price}`;
    }
    
    if (isString(data)) {
        return `String: "${data}"`;
    }
    
    if (isNumber(data)) {
        return `Number: ${data}`;
    }
    
    if (isArray(data)) {
        return `Array: ${data.length} items`;
    }
    
    return `Unknown: ${typeof data}`;
}

const userData = { id: 1, name: "Alice", email: "alice@example.com" };
const productData = { id: 2, title: "TypeScript Guide", price: 29.99 };
const stringData = "Hello";
const numberData = 42;
const arrayData = [1, 2, 3];

console.log(processUnknownData(userData));
console.log(processUnknownData(productData));
console.log(processUnknownData(stringData));
console.log(processUnknownData(numberData));
console.log(processUnknownData(arrayData));

// Combining instanceof and type predicates
interface Drawable {
    draw(): string;
}

class Shape implements Drawable {
    constructor(protected name: string) {}
    
    draw(): string {
        return `Drawing ${this.name}`;
    }
    
    getInfo(): string {
        return `Shape: ${this.name}`;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super("circle");
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    draw(): string {
        return `Drawing circle with radius ${this.radius}`;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super("rectangle");
    }
    
    getArea(): number {
        return this.width * this.height;
    }
    
    draw(): string {
        return `Drawing rectangle ${this.width}x${this.height}`;
    }
}

// Type predicate for Drawable interface
function isDrawable(value: unknown): value is Drawable {
    return isObject(value) && typeof (value as any).draw === 'function';
}

function processShape(shape: unknown): string {
    if (shape instanceof Circle) {
        return `${shape.draw()} (Area: ${shape.getArea().toFixed(2)})`;
    }
    
    if (shape instanceof Rectangle) {
        return `${shape.draw()} (Area: ${shape.getArea()})`;
    }
    
    if (shape instanceof Shape) {
        return shape.draw();
    }
    
    if (isDrawable(shape)) {
        return `Custom drawable: ${shape.draw()}`;
    }
    
    return "Unknown shape";
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const basicShape = new Shape("triangle");
const customDrawable = {
    draw: () => "Custom shape drawing"
};

console.log(processShape(circle));
console.log(processShape(rectangle));
console.log(processShape(basicShape));
console.log(processShape(customDrawable));

// Generic type predicate factory
function hasRequiredProperties<T extends Record<string, any>>(
    value: unknown,
    properties: { [K in keyof T]: (val: unknown) => val is T[K] }
): value is T {
    if (!isObject(value)) {
        return false;
    }
    
    return Object.entries(properties).every(([key, validator]) => {
        return key in value && validator((value as any)[key]);
    });
}

const userValidator = {
    id: isNumber,
    name: isString,
    email: isString
};

function isValidUser(value: unknown): value is User {
    return hasRequiredProperties<User>(value, userValidator);
}

// Vehicle hierarchy with type predicates
class Vehicle {
    constructor(public brand: string, public year: number) {}
    
    getAge(): number {
        return new Date().getFullYear() - this.year;
    }
}

class Car extends Vehicle {
    constructor(brand: string, year: number, public doors: number) {
        super(brand, year);
    }
}

class Motorcycle extends Vehicle {
    constructor(brand: string, year: number, public cc: number) {
        super(brand, year);
    }
}

// Type predicate for Vehicle-like objects
function isVehicle(value: unknown): value is Vehicle {
    return isObject(value) &&
           typeof (value as any).brand === 'string' &&
           typeof (value as any).year === 'number';
}

function processVehicle(vehicle: unknown): string {
    if (vehicle instanceof Car) {
        return `Car: ${vehicle.brand} (${vehicle.year}) - ${vehicle.doors} doors`;
    }
    
    if (vehicle instanceof Motorcycle) {
        return `Motorcycle: ${vehicle.brand} (${vehicle.year}) - ${vehicle.cc}cc`;
    }
    
    if (vehicle instanceof Vehicle) {
        return `Vehicle: ${vehicle.brand} (${vehicle.year})`;
    }
    
    if (isVehicle(vehicle)) {
        return `Vehicle-like object: ${vehicle.brand}`;
    }
    
    return "Not a vehicle";
}

const car = new Car("Toyota", 2020, 4);
const motorcycle = new Motorcycle("Honda", 2021, 600);
const vehicle = new Vehicle("Generic", 2019);
const vehicleObj = { brand: "Custom", year: 2022 };

console.log(processVehicle(car));
console.log(processVehicle(motorcycle));
console.log(processVehicle(vehicle));
console.log(processVehicle(vehicleObj));

// Summary: instanceof for classes, type predicates for interfaces and custom validation

export {};