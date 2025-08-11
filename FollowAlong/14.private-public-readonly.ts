// ===== PRIVATE, PUBLIC, AND READONLY IN TYPESCRIPT =====
// Understanding access modifiers and property modifiers

// ===== PUBLIC MODIFIER =====
console.log("=== Public Modifier ===");

class UserPublic {
    // Public is the DEFAULT - accessible everywhere
    public name: string;        // Explicitly public
    email: string;              // Implicitly public (default)
    public age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Public method (default)
    public greet(): string {
        return `Hello, I'm ${this.name}`;
    }

    // Method without explicit public (still public)
    getInfo(): string {
        return `${this.name} - ${this.email}`;
    }
}

const publicUser = new UserPublic("Alice", "alice@example.com", 25);

// ✅ All of these work - public properties and methods
console.log(publicUser.name);        // "Alice"
console.log(publicUser.email);       // "alice@example.com"
console.log(publicUser.age);         // 25
console.log(publicUser.greet());     // "Hello, I'm Alice"
console.log(publicUser.getInfo());   // "Alice - alice@example.com"

// Can modify public properties directly
publicUser.name = "Alice Smith";
publicUser.age = 26;
console.log(`Updated: ${publicUser.name}, Age: ${publicUser.age}`);

// ===== PRIVATE MODIFIER =====
console.log("\n=== Private Modifier ===");

class UserPrivate {
    public name: string;           // Accessible everywhere
    private password: string;      // Only accessible within this class
    private userId: number;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.userId = Math.random() * 1000;
    }

    // Private method - only usable inside this class
    private hashPassword(): string {
        return `***${this.password.slice(-2)}`;
    }

    private generateToken(): string {
        return `${this.userId}-${Date.now()}`;
    }

    // Public method that uses private properties/methods
    public login(inputPassword: string): boolean {
        // Can access private properties inside the class
        if (inputPassword === this.password) {
            console.log(`Login successful for ${this.name}`);
            console.log(`Token: ${this.generateToken()}`);
            return true;
        } else {
            console.log("Invalid password");
            return false;
        }
    }

    public showSecureInfo(): string {
        // Can call private methods from inside the class
        return `User: ${this.name}, Password: ${this.hashPassword()}`;
    }

    // Public method to change password safely
    public changePassword(oldPassword: string, newPassword: string): boolean {
        if (oldPassword === this.password) {
            this.password = newPassword;
            console.log("Password changed successfully");
            return true;
        } else {
            console.log("Old password incorrect");
            return false;
        }
    }
}

const privateUser = new UserPrivate("Bob", "secretpassword123");

// ✅ These work - public access
console.log(privateUser.name);              // "Bob"
console.log(privateUser.login("secretpassword123")); // true
console.log(privateUser.showSecureInfo());  // Shows masked password

// ❌ These would cause errors - private access
// console.log(privateUser.password);       // Error: Property 'password' is private
// console.log(privateUser.userId);         // Error: Property 'userId' is private
// privateUser.hashPassword();              // Error: Method 'hashPassword' is private
// privateUser.generateToken();             // Error: Method 'generateToken' is private

// Can change password through public method
privateUser.changePassword("secretpassword123", "newsecret456");

// ===== READONLY MODIFIER =====
console.log("\n=== Readonly Modifier ===");

class UserReadonly {
    readonly id: number;           // Cannot be changed after creation
    readonly createdAt: Date;
    readonly version: string = "1.0";  // With default value
    name: string;                  // Can be changed

    constructor(name: string) {
        // Can set readonly properties in constructor
        this.id = Math.floor(Math.random() * 1000);
        this.createdAt = new Date();
        this.name = name;
    }

    updateName(newName: string): void {
        this.name = newName;          // ✅ Works - not readonly
        
        // ❌ These would cause errors - readonly properties
        // this.id = 123;             // Error: Cannot assign to 'id' because it is readonly
        // this.createdAt = new Date(); // Error: Cannot assign to 'createdAt' because it is readonly
        // this.version = "2.0";      // Error: Cannot assign to 'version' because it is readonly
    }
}

const readonlyUser = new UserReadonly("Charlie");
console.log(`User ${readonlyUser.name} created with ID ${readonlyUser.id} at ${readonlyUser.createdAt}`);

readonlyUser.updateName("Charlie Brown");  // ✅ Works
// readonlyUser.id = 999;                  // ❌ Error - readonly
// readonlyUser.createdAt = new Date();    // ❌ Error - readonly

// ===== COMBINING MODIFIERS =====
console.log("\n=== Combining Private/Public with Readonly ===");

class UserCombined {
    // Public readonly - accessible everywhere but immutable
    public readonly id: number;
    public readonly createdAt: Date;
    
    // Private readonly - only accessible within class and immutable
    private readonly secretKey: string;
    private readonly internalVersion: number;
    
    // Regular private (mutable within class)
    private password: string;
    
    // Regular public (mutable everywhere)
    public name: string;

    constructor(name: string, password: string) {
        // Can set readonly properties in constructor
        this.id = Math.floor(Math.random() * 1000);
        this.createdAt = new Date();
        this.secretKey = `secret-${this.id}`;
        this.internalVersion = 1;
        
        // Set regular properties
        this.name = name;
        this.password = password;
    }

    // Can read private readonly properties inside class
    public getSecretHash(): string {
        return `hash-${this.secretKey.slice(-3)}`;
    }

    // Can read private readonly properties for internal logic
    public isLegacyUser(): boolean {
        return this.internalVersion < 2;
    }

    // Can modify private mutable properties
    public changePassword(newPassword: string): void {
        this.password = newPassword;     // ✅ Works - private but not readonly
        // this.secretKey = "new";       // ❌ Error - private readonly
    }

    public getInfo(): object {
        return {
            id: this.id,                 // ✅ Can access public readonly
            name: this.name,             // ✅ Can access public mutable
            createdAt: this.createdAt,   // ✅ Can access public readonly
            version: this.internalVersion // ✅ Can access private readonly inside class
        };
    }
}

const combinedUser = new UserCombined("David", "mypassword");

// ✅ Can access public readonly properties
console.log(`User ID: ${combinedUser.id}`);
console.log(`Created: ${combinedUser.createdAt}`);
console.log(`Name: ${combinedUser.name}`);

// ✅ Can modify public mutable properties
combinedUser.name = "David Wilson";

// ✅ Can call public methods
console.log(combinedUser.getSecretHash());
console.log(combinedUser.isLegacyUser());
console.log(combinedUser.getInfo());

// ❌ Cannot modify public readonly properties
// combinedUser.id = 999;            // Error: readonly
// combinedUser.createdAt = new Date(); // Error: readonly

// ❌ Cannot access private properties (readonly or not)
// console.log(combinedUser.secretKey);     // Error: private
// console.log(combinedUser.internalVersion); // Error: private
// console.log(combinedUser.password);      // Error: private

// ===== CONSTRUCTOR SHORTHAND WITH MODIFIERS =====
console.log("\n=== Constructor Shorthand with All Modifiers ===");

class UserShorthand {
    constructor(
        public readonly id: number,           // Public readonly
        public name: string,                  // Public mutable
        private readonly secretCode: string,  // Private readonly
        private password: string              // Private mutable
    ) {
        // Constructor body can contain additional logic
        console.log(`User ${name} created with ID ${id}`);
    }

    // Can access all properties inside class
    public validatePassword(inputPassword: string): boolean {
        return inputPassword === this.password;
    }

    public getSecretCodeHash(): string {
        return `***${this.secretCode.slice(-2)}`;
    }

    public changePassword(newPassword: string): void {
        this.password = newPassword;          // ✅ Can modify private mutable
        // this.secretCode = "new";           // ❌ Error - private readonly
    }

    public updateName(newName: string): void {
        this.name = newName;                  // ✅ Can modify public mutable
        // this.id = 999;                     // ❌ Error - public readonly
    }
}

const shorthandUser = new UserShorthand(12345, "Emma", "SEC123", "password123");

// ✅ Public access
console.log(`ID: ${shorthandUser.id}`);     // Public readonly
console.log(`Name: ${shorthandUser.name}`); // Public mutable

// ✅ Public methods
console.log(shorthandUser.validatePassword("password123")); // true
console.log(shorthandUser.getSecretCodeHash());

// ✅ Can modify public mutable
shorthandUser.name = "Emma Johnson";
shorthandUser.changePassword("newpassword456");

// ❌ Cannot modify readonly or access private
// shorthandUser.id = 999;           // Error: readonly
// shorthandUser.secretCode;         // Error: private
// shorthandUser.password;           // Error: private

// ===== PROTECTED MODIFIER (QUICK REVIEW) =====
console.log("\n=== Protected Modifier (with Readonly) ===");

class BaseUser {
    protected readonly userId: number;       // Protected readonly
    protected name: string;                  // Protected mutable
    private readonly secretKey: string;      // Private readonly

    constructor(name: string) {
        this.userId = Math.floor(Math.random() * 1000);
        this.name = name;
        this.secretKey = `key-${this.userId}`;
    }

    protected getInternalId(): number {
        return this.userId;  // ✅ Can access protected readonly in same class
    }
}

class ExtendedUser extends BaseUser {
    constructor(name: string, public role: string) {
        super(name);
    }

    public showUserInfo(): string {
        // ✅ Can access protected properties in subclass
        return `User: ${this.name} (ID: ${this.userId}) - Role: ${this.role}`;
    }

    public updateName(newName: string): void {
        this.name = newName;  // ✅ Can modify protected mutable in subclass
        // this.userId = 999;  // ❌ Error - protected readonly
    }

    public getId(): number {
        return this.getInternalId(); // ✅ Can call protected method in subclass
    }
}

const extendedUser = new ExtendedUser("Frank", "Admin");
console.log(extendedUser.showUserInfo());
console.log(`Internal ID: ${extendedUser.getId()}`);

// ❌ Cannot access protected members from outside
// console.log(extendedUser.userId);  // Error: protected
// console.log(extendedUser.name);    // Error: protected

// ===== PRACTICAL EXAMPLES =====
console.log("\n=== Practical Examples ===");

// Example 1: Bank Account
class BankAccount {
    constructor(
        public readonly accountNumber: string,    // Public readonly - can see but not change
        public readonly accountHolder: string,    // Public readonly
        private balance: number,                   // Private - sensitive data
        private readonly bankCode: string         // Private readonly - internal identifier
    ) {}

    public getBalance(): number {
        return this.balance;  // Controlled access to private data
    }

    public deposit(amount: number): boolean {
        if (amount > 0) {
            this.balance += amount;  // Can modify private property inside class
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
            return true;
        }
        return false;
    }

    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;  // Can modify private property inside class
            console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
            return true;
        }
        console.log("Insufficient funds or invalid amount");
        return false;
    }

    public getAccountInfo(): object {
        return {
            accountNumber: this.accountNumber,
            accountHolder: this.accountHolder,
            balance: this.balance,
            bankCode: this.bankCode.slice(-4)  // Show last 4 digits only
        };
    }
}

const account = new BankAccount("ACC123456", "Grace Wilson", 1000, "BANK001");
console.log(`Account: ${account.accountNumber} - ${account.accountHolder}`);
console.log(`Balance: $${account.getBalance()}`);

account.deposit(500);
account.withdraw(200);

// ✅ Can access public readonly
console.log(`Account holder: ${account.accountHolder}`);

// ❌ Cannot modify or access private/readonly incorrectly
// account.balance = 999999;        // Error: private
// account.accountNumber = "HACK";   // Error: readonly
// account.bankCode;                 // Error: private

// Example 2: User Session
class UserSession {
    constructor(
        public readonly sessionId: string,
        public readonly userId: number,
        private readonly createdAt: Date = new Date(),
        private lastActivity: Date = new Date(),
        private isActive: boolean = true
    ) {}

    public updateActivity(): void {
        if (this.isActive) {
            this.lastActivity = new Date();  // Can modify private property
        }
    }

    public terminate(): void {
        this.isActive = false;  // Can modify private property
        console.log(`Session ${this.sessionId} terminated`);
    }

    public isExpired(timeoutMinutes: number = 30): boolean {
        const now = new Date();
        const diffMinutes = (now.getTime() - this.lastActivity.getTime()) / (1000 * 60);
        return diffMinutes > timeoutMinutes || !this.isActive;
    }

    public getSessionInfo(): object {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            createdAt: this.createdAt,
            lastActivity: this.lastActivity,
            isActive: this.isActive,
            isExpired: this.isExpired()
        };
    }
}

const session = new UserSession("sess_abc123", 12345);
console.log("Session created:", session.getSessionInfo());

session.updateActivity();
console.log("After activity update:", session.getSessionInfo());

// ===== SUMMARY =====
console.log("\n=== Access Modifiers Summary ===");
console.log("🔓 PUBLIC:");
console.log("   • Default modifier");
console.log("   • Accessible everywhere");
console.log("   • Can be modified from anywhere");
console.log("");
console.log("🔒 PRIVATE:");
console.log("   • Only accessible within the same class");
console.log("   • Cannot be accessed from outside or subclasses");
console.log("   • Use for sensitive data and internal methods");
console.log("");
console.log("🔐 PROTECTED:");
console.log("   • Accessible within the class and subclasses");
console.log("   • Not accessible from outside the class hierarchy");
console.log("   • Use for data that subclasses need access to");
console.log("");
console.log("🚫 READONLY:");
console.log("   • Can be combined with public, private, or protected");
console.log("   • Can only be set in constructor");
console.log("   • Cannot be modified after object creation");
console.log("   • Use for immutable data like IDs, timestamps");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Use private for sensitive data");
console.log("   • Use readonly for data that shouldn't change");
console.log("   • Combine them: private readonly for internal constants");
console.log("   • Use public methods to provide controlled access");
console.log("   • Default to more restrictive, open up as needed");

export {}; 