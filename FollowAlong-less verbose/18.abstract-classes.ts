// Abstract classes: blueprints that cannot be instantiated directly

// Basic abstract class
abstract class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Concrete method (shared implementation)
    getInfo(): string {
        return `${this.name} is an animal`;
    }
    
    // Abstract methods (must be implemented by subclasses)
    abstract makeSound(): string;
    abstract move(): string;
}

// Concrete implementation
class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name); // Must call super() first
    }
    
    makeSound(): string {
        return `${this.name} barks`;
    }
    
    move(): string {
        return `${this.name} runs`;
    }
    
    getInfo(): string {
        const baseInfo = super.getInfo(); // Use parent method
        return `${baseInfo} and is a ${this.breed}`;
    }
}

class Cat extends Animal {
    makeSound(): string {
        return `${this.name} meows`;
    }
    
    move(): string {
        return `${this.name} prowls`;
    }
}

// Abstract class with inheritance hierarchy
abstract class Vehicle {
    constructor(protected brand: string, protected year: number) {}
    
    getAge(): number {
        return new Date().getFullYear() - this.year;
    }
    
    abstract start(): string;
    abstract getFuelType(): string;
}

class Car extends Vehicle {
    constructor(brand: string, year: number, private doors: number) {
        super(brand, year);
    }
    
    start(): string {
        return `${this.brand} car started`;
    }
    
    getFuelType(): string {
        return "Gasoline";
    }
    
    getDoors(): number {
        return this.doors;
    }
}

class ElectricCar extends Vehicle {
    constructor(brand: string, year: number, private batteryCapacity: number) {
        super(brand, year);
    }
    
    start(): string {
        return `${this.brand} electric car started silently`;
    }
    
    getFuelType(): string {
        return "Electric";
    }
    
    charge(): string {
        return `Charging ${this.batteryCapacity}kWh battery`;
    }
}

// Abstract classes vs Interfaces
interface Drawable {
    draw(): string;
}

// Abstract class provides partial implementation
abstract class Shape implements Drawable {
    constructor(protected name: string) {}
    
    // Concrete method
    getInfo(): string {
        return `Shape: ${this.name}`;
    }
    
    // Abstract methods
    abstract draw(): string;
    abstract getArea(): number;
}

class Circle extends Shape {
    constructor(private radius: number) {
        super("circle");
    }
    
    draw(): string {
        return `Drawing a circle with radius ${this.radius}`;
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super("rectangle");
    }
    
    draw(): string {
        return `Drawing a rectangle ${this.width}x${this.height}`;
    }
    
    getArea(): number {
        return this.width * this.height;
    }
}

// Usage examples
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");
const car = new Car("Toyota", 2020, 4);
const tesla = new ElectricCar("Tesla", 2023, 100);
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

console.log(dog.makeSound());
console.log(dog.getInfo());
console.log(cat.makeSound());
console.log(car.start());
console.log(tesla.charge());
console.log(circle.draw());
console.log(`Circle area: ${circle.getArea()}`);
console.log(rectangle.draw());
console.log(`Rectangle area: ${rectangle.getArea()}`);

// Summary: Abstract classes provide partial implementation and force subclasses to implement abstract methods

export {};