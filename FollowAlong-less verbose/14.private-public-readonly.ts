// ===== ACCESS MODIFIERS =====

// Public (default) - accessible everywhere
class UserPublic {
    public name: string;        // Explicitly public
    email: string;              // Implicitly public (default)
    
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    public greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

const publicUser = new UserPublic("Alice", "alice@example.com");
console.log(publicUser.name);     // ✅ Works
console.log(publicUser.email);    // ✅ Works
console.log(publicUser.greet());  // ✅ Works

// Private - only accessible within the same class
class UserPrivate {
    private _id: number;           // Private property
    public name: string;
    private _password: string;

    constructor(id: number, name: string, password: string) {
        this._id = id;
        this.name = name;
        this._password = password;
    }

    private encryptPassword(): string {
        return `encrypted_${this._password}`;
    }

    public getId(): number {
        return this._id;  // Can access private from within class
    }

    public changePassword(newPassword: string): void {
        this._password = newPassword;
        console.log("Password changed:", this.encryptPassword());
    }
}

const privateUser = new UserPrivate(1, "Bob", "secret123");
console.log(privateUser.name);              // ✅ Works - public
console.log(privateUser.getId());           // ✅ Works - public method
// console.log(privateUser._id);            // ❌ Error - private
// console.log(privateUser._password);      // ❌ Error - private

privateUser.changePassword("newSecret");

// Readonly - can only be set during initialization
class UserReadonly {
    readonly id: number;
    readonly email: string;
    name: string;                    // Can be changed

    constructor(id: number, email: string, name: string) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    updateName(newName: string): void {
        this.name = newName;         // ✅ Works - not readonly
        // this.id = 999;            // ❌ Error - readonly
        // this.email = "new@email"; // ❌ Error - readonly
    }

    getInfo(): string {
        return `${this.name} (ID: ${this.id}) - ${this.email}`;
    }
}

const readonlyUser = new UserReadonly(1, "charlie@example.com", "Charlie");
console.log(readonlyUser.getInfo());
readonlyUser.updateName("Charles");
console.log(readonlyUser.getInfo());

// Combining modifiers
class BankAccount {
    private readonly _accountNumber: string;  // Private and readonly
    private _balance: number;
    public readonly customerName: string;     // Public and readonly

    constructor(accountNumber: string, customerName: string, initialBalance: number = 0) {
        this._accountNumber = accountNumber;
        this.customerName = customerName;
        this._balance = initialBalance;
    }

    public getBalance(): number {
        return this._balance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this._balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this._balance}`);
        }
    }

    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this._balance}`);
            return true;
        }
        console.log("Insufficient funds");
        return false;
    }

    private calculateInterest(): number {
        return this._balance * 0.02; // 2% interest
    }

    public addInterest(): void {
        const interest = this.calculateInterest();
        this._balance += interest;
        console.log(`Added $${interest} interest. New balance: $${this._balance}`);
    }

    public getAccountInfo(): string {
        return `Account: ${this._accountNumber}, Customer: ${this.customerName}`;
    }
}

const account = new BankAccount("123456789", "David Smith", 1000);
console.log(account.getAccountInfo());
console.log("Balance:", account.getBalance());

account.deposit(500);
account.withdraw(200);
account.addInterest();

// console.log(account._accountNumber);  // ❌ Error - private
// console.log(account._balance);        // ❌ Error - private
console.log(account.customerName);       // ✅ Works - public readonly

// Constructor parameter properties (shorthand)
class UserShorthand {
    constructor(
        private readonly _id: number,
        public name: string,
        private _email: string,
        readonly createdAt: Date = new Date()
    ) {
        // Properties are automatically created and assigned
    }

    public getId(): number {
        return this._id;
    }

    public getEmail(): string {
        return this._email;
    }

    public setEmail(newEmail: string): void {
        this._email = newEmail;
    }
}

const shorthandUser = new UserShorthand(1, "Eve", "eve@example.com");
console.log(shorthandUser.name);         // ✅ Public
console.log(shorthandUser.getId());      // ✅ Via public method
console.log(shorthandUser.createdAt);    // ✅ Readonly public

export {};