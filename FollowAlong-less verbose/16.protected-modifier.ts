// Protected modifier: accessible within class and subclasses

class Vehicle {
    public brand: string;
    protected engine: string;
    private serialNumber: string;

    constructor(brand: string, engine: string, serialNumber: string) {
        this.brand = brand;
        this.engine = engine;
        this.serialNumber = serialNumber;
    }

    protected startEngine(): string {
        return `${this.engine} engine starting...`;
    }

    private generateReport(): string {
        return `Vehicle Report: ${this.brand}, Engine: ${this.engine}, SN: ${this.serialNumber}`;
    }

    public start(): string {
        const engineStatus = this.startEngine();
        console.log(this.generateReport());
        return `${this.brand} is ready to go! ${engineStatus}`;
    }
}

class Car extends Vehicle {
    private doors: number;

    constructor(brand: string, engine: string, serialNumber: string, doors: number) {
        super(brand, engine, serialNumber);
        this.doors = doors;
    }

    public getEngineInfo(): string {
        return `This car has a ${this.engine} engine`; // Can access protected
    }

    public performStartup(): string {
        const engineStatus = this.startEngine(); // Can call protected method
        return `Car startup: ${engineStatus}`;
    }

    protected startEngine(): string {
        return `${this.engine} car engine purring...`;
    }

    public getDetails(): string {
        return `${this.brand} car with ${this.doors} doors and ${this.engine} engine`;
    }
}

const car = new Car("Toyota", "V6", "SN123456", 4);
console.log(car.brand);
console.log(car.start());
console.log(car.getEngineInfo());
console.log(car.performStartup());

// User system example

class User {
    public name: string;
    public email: string;
    protected userId: number;
    protected permissions: string[];
    private password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.userId = Math.floor(Math.random() * 10000);
        this.permissions = ["read"];
        this.password = password;
    }

    protected addPermission(permission: string): void {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }

    protected hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
    }

    public getDisplayInfo(): string {
        return `${this.name} (${this.email})`;
    }

    public validatePassword(inputPassword: string): boolean {
        return this.password === inputPassword;
    }
}

class Admin extends User {
    private adminLevel: number;

    constructor(name: string, email: string, password: string, adminLevel: number) {
        super(name, email, password);
        this.adminLevel = adminLevel;
        this.addPermission("write");
        this.addPermission("delete");
        this.addPermission("admin");
    }

    public promoteUser(targetUser: User): boolean {
        if (this.hasPermission("admin")) {
            return true;
        }
        return false;
    }

    public getAdminInfo(): string {
        return `Admin: ${this.name}, ID: ${this.userId}, Level: ${this.adminLevel}`;
    }
}

const regularUser = new User("John Doe", "john@example.com", "password123");
const admin = new Admin("Alice Admin", "alice@example.com", "adminpass", 5);

console.log(regularUser.getDisplayInfo());
console.log(admin.getAdminInfo());
console.log(admin.promoteUser(regularUser));

// Protected with readonly example
class DatabaseEntity {
    protected readonly id: number;
    protected readonly createdAt: Date;

    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date();
    }

    protected getEntityId(): number {
        return this.id;
    }
}

class Article extends DatabaseEntity {
    private title: string;

    constructor(id: number, title: string) {
        super(id);
        this.title = title;
    }

    public getArticleInfo(): string {
        return `Article ${this.id}: ${this.title} (Created: ${this.createdAt.toDateString()})`;
    }
}

const article = new Article(1, "TypeScript Guide");
console.log(article.getArticleInfo());

// Summary: protected allows subclass access but not external access

export {}; 