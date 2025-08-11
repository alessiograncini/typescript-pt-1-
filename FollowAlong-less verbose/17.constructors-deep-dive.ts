// Constructors: initialization and object creation patterns

// Basic constructor
class BasicUser {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

// Constructor with validation
class ValidatedUser {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        if (!name || !email.includes("@")) {
            throw new Error("Invalid input");
        }
        this.name = name;
        this.email = email;
    }
}

// Parameter properties shorthand
class ShorthandUser {
    constructor(
        public name: string,
        public email: string,
        private age: number,
        readonly id: number = Math.random()
    ) {
        console.log(`User created: ${name}`);
    }

    getAge(): number {
        return this.age;
    }
}

// Constructor overloading
class FlexibleUser {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string);
    constructor(name: string, email: string, age: number);
    constructor(name: string, email: string, age?: number) {
        this.name = name;
        this.email = email;
        this.age = age ?? 18;
    }
}

// Options pattern
interface UserOptions {
    name: string;
    email: string;
    age?: number;
    isActive?: boolean;
}

class ConfigurableUser {
    constructor(private options: UserOptions) {
        if (!options.name || !options.email) {
            throw new Error("Name and email required");
        }
    }

    getInfo() {
        return {
            name: this.options.name,
            email: this.options.email,
            age: this.options.age ?? 18,
            isActive: this.options.isActive ?? true
        };
    }
}

// Inheritance with super()
class Animal {
    constructor(protected name: string, protected species: string) {
        console.log(`Animal created: ${name}`);
    }

    getInfo(): string {
        return `${this.name} is a ${this.species}`;
    }
}

class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name, "Dog"); // Must call super() first
        console.log(`Dog created: ${name} (${breed})`);
    }

    getBreed(): string {
        return this.breed;
    }
}

// Static factory methods
class UserFactory {
    constructor(
        public readonly id: number,
        public name: string,
        public role: string
    ) {}

    static createAdmin(name: string): UserFactory {
        return new UserFactory(Date.now(), name, "admin");
    }

    static createUser(name: string): UserFactory {
        return new UserFactory(Date.now(), name, "user");
    }
}

// Usage examples
const basicUser = new BasicUser("John", "john@example.com");
const shorthandUser = new ShorthandUser("Jane", "jane@example.com", 25);
const configurableUser = new ConfigurableUser({
    name: "Alice",
    email: "alice@example.com",
    age: 30
});

const dog = new Dog("Buddy", "Golden Retriever");
const admin = UserFactory.createAdmin("Admin User");

console.log(basicUser.name);
console.log(shorthandUser.getAge());
console.log(configurableUser.getInfo());
console.log(dog.getInfo());
console.log(admin.role);

// Summary: constructors initialize object state and enable various creation patterns

export {};