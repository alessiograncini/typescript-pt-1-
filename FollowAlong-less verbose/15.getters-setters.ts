// ===== GETTERS AND SETTERS =====

// Basic getters and setters
class User {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    // Getter - access like a property
    get name(): string {
        return this._name;
    }

    // Setter - assign like a property with validation
    set name(newName: string) {
        if (newName.length > 0) {
            this._name = newName;
        } else {
            throw new Error("Name cannot be empty");
        }
    }

    get age(): number {
        return this._age;
    }

    set age(newAge: number) {
        if (newAge > 0 && newAge < 120) {
            this._age = newAge;
        } else {
            throw new Error("Age must be between 1 and 119");
        }
    }
}

const user = new User("Alice", 25);
console.log(user.name);   // Uses getter
console.log(user.age);    // Uses getter

user.name = "Alice Johnson"; // Uses setter
user.age = 30;              // Uses setter

console.log(`Updated: ${user.name}, age ${user.age}`);

// Advanced example with computed properties
class Circle {
    private _radius: number;

    constructor(radius: number) {
        this._radius = radius;
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        if (value > 0) {
            this._radius = value;
        } else {
            throw new Error("Radius must be positive");
        }
    }

    // Computed properties using getters
    get area(): number {
        return Math.PI * this._radius * this._radius;
    }

    get circumference(): number {
        return 2 * Math.PI * this._radius;
    }

    get diameter(): number {
        return this._radius * 2;
    }
}

const circle = new Circle(5);
console.log(`Radius: ${circle.radius}`);
console.log(`Area: ${circle.area.toFixed(2)}`);
console.log(`Circumference: ${circle.circumference.toFixed(2)}`);

circle.radius = 10;
console.log(`New area: ${circle.area.toFixed(2)}`);

// Email validation example
class Contact {
    private _email: string;

    constructor(email: string) {
        this._email = email;
    }

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

    private isValidEmail(email: string): boolean {
        return email.includes("@") && email.includes(".");
    }

    get displayEmail(): string {
        return `Email: ${this._email}`;
    }
}

const contact = new Contact("john@example.com");
console.log(contact.displayEmail);

contact.email = "john.doe@company.com";
console.log(contact.displayEmail);

export {};