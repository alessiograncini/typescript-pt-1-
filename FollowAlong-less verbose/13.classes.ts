// ===== CLASSES IN TYPESCRIPT =====

// Basic class with constructor
class User {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Methods
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }

    getInfo(): string {
        return `${this.name} (${this.age}) - ${this.email}`;
    }

    celebrateBirthday(): void {
        this.age++;
        console.log(`Happy birthday ${this.name}! Now ${this.age}`);
    }
}

// Creating instances
const user1 = new User("Alice", "alice@example.com", 25);
const user2 = new User("Bob", "bob@example.com", 30);

console.log(user1.greet());
console.log(user2.getInfo());

user1.celebrateBirthday();

// Class with optional properties
class Product {
    name: string;
    price: number;
    description?: string;

    constructor(name: string, price: number, description?: string) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    getDisplayPrice(): string {
        return `$${this.price.toFixed(2)}`;
    }

    hasDescription(): boolean {
        return this.description !== undefined;
    }
}

const laptop = new Product("Laptop", 999.99, "Gaming laptop");
const mouse = new Product("Mouse", 29.99);

console.log(`${laptop.name}: ${laptop.getDisplayPrice()}`);
console.log(`Has description: ${laptop.hasDescription()}`);
console.log(`${mouse.name}: ${mouse.getDisplayPrice()}`);

// Class with methods and computed properties
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    isSquare(): boolean {
        return this.width === this.height;
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

const rect = new Rectangle(10, 5);
console.log(`Area: ${rect.getArea()}`);
console.log(`Perimeter: ${rect.getPerimeter()}`);
console.log(`Is square: ${rect.isSquare()}`);

rect.scale(2);
console.log(`After scaling - Area: ${rect.getArea()}`);

// Class inheritance
class Animal {
    name: string;
    species: string;

    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }

    makeSound(): string {
        return `${this.name} makes a sound`;
    }

    introduce(): string {
        return `This is ${this.name}, a ${this.species}`;
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name, "Dog");
        this.breed = breed;
    }

    makeSound(): string {
        return `${this.name} barks!`;
    }

    fetch(): string {
        return `${this.name} fetches the ball`;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.introduce());
console.log(dog.makeSound());
console.log(dog.fetch());

export {};