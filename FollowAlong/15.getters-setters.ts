// ===== GETTERS AND SETTERS IN TYPESCRIPT =====
// Getters and setters provide controlled access to object properties

// ===== BASIC GETTER AND SETTER =====
console.log("=== Basic Getters and Setters ===");

class User {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    // GETTER - access like a property (no parentheses)
    get name(): string {
        console.log("Getting name...");
        return this._name;
    }

    // SETTER - set like a property (no parentheses)
    set name(newName: string) {
        console.log(`Setting name to ${newName}...`);
        this._name = newName;
    }

    get age(): number {
        return this._age;
    }

    set age(newAge: number) {
        this._age = newAge;
    }
}

const user = new User("Alice", 25);

// Using getter (looks like property access)
console.log(user.name);     // "Alice" - calls getter
console.log(user.age);      // 25 - calls getter

// Using setter (looks like property assignment)
user.name = "Alice Smith";  // Calls setter
user.age = 26;              // Calls setter

console.log(`Updated: ${user.name}, Age: ${user.age}`);

// ===== WHY USE GETTERS AND SETTERS? =====
console.log("\n=== Why Use Getters and Setters? ===");

/*
GETTERS AND SETTERS provide:

1. 🛡️  VALIDATION - Check values before setting
2. 🔍  LOGGING - Track when properties are accessed/changed
3. 🧮  COMPUTED PROPERTIES - Calculate values on-the-fly
4. 🔒  ENCAPSULATION - Hide internal implementation
5. 🎯  CONTROLLED ACCESS - Decide what can be read/written
6. 🔄  SIDE EFFECTS - Trigger actions when properties change
7. 📊  FORMATTING - Transform data on get/set

WITHOUT GETTERS/SETTERS:
user.age = -5;        // No validation - invalid age!
user.email = "abc";   // No validation - invalid email!

WITH GETTERS/SETTERS:
user.age = -5;        // Setter validates and throws error
user.email = "abc";   // Setter validates and throws error
*/

// ===== VALIDATION WITH SETTERS =====
console.log("\n=== Validation with Setters ===");

class ValidatedUser {
    private _email: string;
    private _age: number;
    private _password: string;

    constructor(email: string, age: number, password: string) {
        // Use setters for validation even in constructor
        this.email = email;
        this.age = age;
        this.password = password;
    }

    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        // Validation logic
        if (!newEmail.includes("@")) {
            throw new Error("Email must contain @");
        }
        if (!newEmail.includes(".")) {
            throw new Error("Email must contain a domain");
        }
        if (newEmail.length < 5) {
            throw new Error("Email too short");
        }
        
        console.log(`Email validated and set to: ${newEmail}`);
        this._email = newEmail;
    }

    get age(): number {
        return this._age;
    }

    set age(newAge: number) {
        // Validation logic
        if (newAge < 0) {
            throw new Error("Age cannot be negative");
        }
        if (newAge > 150) {
            throw new Error("Age cannot be over 150");
        }
        if (!Number.isInteger(newAge)) {
            throw new Error("Age must be a whole number");
        }
        
        console.log(`Age validated and set to: ${newAge}`);
        this._age = newAge;
    }

    get password(): string {
        // Security: don't return actual password
        return "*".repeat(this._password.length);
    }

    set password(newPassword: string) {
        // Password validation
        if (newPassword.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }
        if (!/[A-Z]/.test(newPassword)) {
            throw new Error("Password must contain uppercase letter");
        }
        if (!/[0-9]/.test(newPassword)) {
            throw new Error("Password must contain a number");
        }
        
        console.log("Password validated and set");
        this._password = newPassword;
    }
}

const validatedUser = new ValidatedUser("alice@example.com", 25, "Password123");

// ✅ Valid operations
console.log(`Email: ${validatedUser.email}`);
console.log(`Age: ${validatedUser.age}`);
console.log(`Password: ${validatedUser.password}`); // Shows masked

// Valid changes
validatedUser.email = "alice.smith@company.com";
validatedUser.age = 30;
validatedUser.password = "NewPassword456";

// ❌ These would throw errors (commented to prevent runtime errors)
// validatedUser.age = -5;              // Error: negative age
// validatedUser.age = 200;             // Error: age too high
// validatedUser.email = "invalid";     // Error: no @ or domain
// validatedUser.password = "weak";     // Error: too short, no uppercase/number

// ===== COMPUTED PROPERTIES =====
console.log("\n=== Computed Properties ===");

class UserProfile {
    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    // Basic getters/setters
    get firstName(): string {
        return this._firstName;
    }

    set firstName(newFirstName: string) {
        this._firstName = newFirstName.trim();
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(newLastName: string) {
        this._lastName = newLastName.trim();
    }

    get birthYear(): number {
        return this._birthYear;
    }

    set birthYear(newBirthYear: number) {
        if (newBirthYear < 1900 || newBirthYear > new Date().getFullYear()) {
            throw new Error("Invalid birth year");
        }
        this._birthYear = newBirthYear;
    }

    // COMPUTED PROPERTY - calculated on-the-fly
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    // COMPUTED PROPERTY - no setter (read-only)
    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    // COMPUTED PROPERTY - based on other computed properties
    get displayName(): string {
        return `${this.fullName} (${this.age} years old)`;
    }

    // COMPUTED PROPERTY - formatting
    get initials(): string {
        return `${this._firstName[0]}${this._lastName[0]}`.toUpperCase();
    }

    // COMPUTED PROPERTY - boolean logic
    get isAdult(): boolean {
        return this.age >= 18;
    }

    get isMinor(): boolean {
        return !this.isAdult;
    }

    // COMPUTED PROPERTY - complex calculation
    get yearsUntilRetirement(): number {
        const retirementAge = 65;
        const yearsLeft = retirementAge - this.age;
        return yearsLeft > 0 ? yearsLeft : 0;
    }
}

const profile = new UserProfile("John", "Doe", 1990);

// Access computed properties like regular properties
console.log(`Full name: ${profile.fullName}`);           // "John Doe"
console.log(`Age: ${profile.age}`);                      // Calculated from birth year
console.log(`Display: ${profile.displayName}`);          // "John Doe (33 years old)"
console.log(`Initials: ${profile.initials}`);            // "JD"
console.log(`Is adult: ${profile.isAdult}`);             // true
console.log(`Years to retirement: ${profile.yearsUntilRetirement}`); // Calculated

// Changing base properties updates computed properties
profile.firstName = "Jane";
profile.lastName = "Smith";
console.log(`Updated full name: ${profile.fullName}`);   // "Jane Smith"
console.log(`Updated display: ${profile.displayName}`);  // "Jane Smith (33 years old)"
console.log(`Updated initials: ${profile.initials}`);    // "JS"

// ===== GETTER-ONLY PROPERTIES =====
console.log("\n=== Getter-Only Properties (Read-Only) ===");

class ReadOnlyExample {
    private _createdAt: Date;
    private _id: number;
    private _data: string[];

    constructor(data: string[]) {
        this._createdAt = new Date();
        this._id = Math.floor(Math.random() * 1000);
        this._data = data;
    }

    // Read-only computed properties
    get id(): number {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get createdAtFormatted(): string {
        return this._createdAt.toLocaleDateString();
    }

    get dataCount(): number {
        return this._data.length;
    }

    get isEmpty(): boolean {
        return this._data.length === 0;
    }

    get summary(): string {
        return `ID: ${this._id}, Created: ${this.createdAtFormatted}, Items: ${this.dataCount}`;
    }

    // This has both getter and setter for the array
    get data(): string[] {
        return [...this._data]; // Return copy to prevent direct modification
    }

    set data(newData: string[]) {
        this._data = [...newData]; // Store copy
        console.log(`Data updated. New count: ${this.dataCount}`);
    }
}

const readOnlyExample = new ReadOnlyExample(["item1", "item2", "item3"]);

console.log(`ID: ${readOnlyExample.id}`);                    // Read-only
console.log(`Created: ${readOnlyExample.createdAtFormatted}`); // Read-only computed
console.log(`Count: ${readOnlyExample.dataCount}`);          // Read-only computed
console.log(`Summary: ${readOnlyExample.summary}`);          // Read-only computed

// Can read data
console.log(`Data: ${readOnlyExample.data}`);

// Can set new data array
readOnlyExample.data = ["new1", "new2"];
console.log(`Updated count: ${readOnlyExample.dataCount}`);

// Cannot set read-only properties (would cause errors)
// readOnlyExample.id = 999;           // Error: no setter
// readOnlyExample.createdAt = new Date(); // Error: no setter

// ===== SETTER-ONLY PROPERTIES =====
console.log("\n=== Setter-Only Properties (Write-Only) ===");

class WriteOnlyExample {
    private _hashedPassword: string = "";
    private _logEntries: string[] = [];

    // Write-only property - can set but not get
    set password(newPassword: string) {
        // Hash the password (simplified)
        this._hashedPassword = `hashed_${newPassword}`;
        this._logEntries.push(`Password changed at ${new Date().toISOString()}`);
        console.log("Password has been set and hashed");
    }

    // Write-only property for logging
    set logMessage(message: string) {
        this._logEntries.push(`${new Date().toISOString()}: ${message}`);
        console.log(`Logged: ${message}`);
    }

    // Can read the logs but not individual password
    get logs(): string[] {
        return [...this._logEntries];
    }

    // Can check if password exists but not get it
    get hasPassword(): boolean {
        return this._hashedPassword.length > 0;
    }
}

const writeOnlyExample = new WriteOnlyExample();

// Can set write-only properties
writeOnlyExample.password = "secret123";
writeOnlyExample.logMessage = "User logged in";
writeOnlyExample.logMessage = "User performed action";

// Can read related information
console.log(`Has password: ${writeOnlyExample.hasPassword}`);
console.log(`Logs: ${writeOnlyExample.logs}`);

// Cannot read write-only properties (would cause errors)
// console.log(writeOnlyExample.password);    // Error: no getter
// console.log(writeOnlyExample.logMessage);  // Error: no getter

// ===== SIDE EFFECTS AND NOTIFICATIONS =====
console.log("\n=== Side Effects and Notifications ===");

interface PropertyChangeListener {
    (propertyName: string, oldValue: any, newValue: any): void;
}

class ObservableUser {
    private _name: string;
    private _email: string;
    private listeners: PropertyChangeListener[] = [];

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    // Add listener for property changes
    addListener(listener: PropertyChangeListener): void {
        this.listeners.push(listener);
    }

    // Notify all listeners
    private notifyChange(propertyName: string, oldValue: any, newValue: any): void {
        this.listeners.forEach(listener => {
            listener(propertyName, oldValue, newValue);
        });
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        const oldName = this._name;
        this._name = newName;
        
        // Side effect: notify listeners
        this.notifyChange("name", oldName, newName);
        
        // Side effect: log change
        console.log(`Name changed from "${oldName}" to "${newName}"`);
    }

    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        const oldEmail = this._email;
        
        // Validation
        if (!newEmail.includes("@")) {
            throw new Error("Invalid email");
        }
        
        this._email = newEmail;
        
        // Side effects
        this.notifyChange("email", oldEmail, newEmail);
        console.log(`Email changed from "${oldEmail}" to "${newEmail}"`);
        
        // Additional side effect: could trigger email verification
        console.log("Email verification sent");
    }
}

const observableUser = new ObservableUser("Bob", "bob@example.com");

// Add listener
observableUser.addListener((property, oldValue, newValue) => {
    console.log(`🔔 Property "${property}" changed: ${oldValue} → ${newValue}`);
});

// Changes trigger side effects
observableUser.name = "Robert";
observableUser.email = "robert@newcompany.com";

// ===== REAL-WORLD EXAMPLES =====
console.log("\n=== Real-World Examples ===");

// Example 1: Temperature Converter
class Temperature {
    private _celsius: number;

    constructor(celsius: number) {
        this._celsius = celsius;
    }

    get celsius(): number {
        return this._celsius;
    }

    set celsius(value: number) {
        this._celsius = value;
    }

    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }

    set fahrenheit(value: number) {
        this._celsius = (value - 32) * 5/9;
    }

    get kelvin(): number {
        return this._celsius + 273.15;
    }

    set kelvin(value: number) {
        this._celsius = value - 273.15;
    }

    get description(): string {
        if (this._celsius < 0) return "Freezing";
        if (this._celsius < 10) return "Cold";
        if (this._celsius < 20) return "Cool";
        if (this._celsius < 30) return "Warm";
        return "Hot";
    }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K (${temp.description})`);

// Set in Fahrenheit, automatically converts to Celsius
temp.fahrenheit = 100;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K (${temp.description})`);

// Example 2: Shopping Cart
class ShoppingCart {
    private _items: { name: string; price: number; quantity: number }[] = [];
    private _taxRate: number = 0.08;

    get items(): { name: string; price: number; quantity: number }[] {
        return [...this._items]; // Return copy
    }

    addItem(name: string, price: number, quantity: number = 1): void {
        this._items.push({ name, price, quantity });
    }

    get subtotal(): number {
        return this._items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get tax(): number {
        return this.subtotal * this._taxRate;
    }

    get total(): number {
        return this.subtotal + this.tax;
    }

    get itemCount(): number {
        return this._items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get isEmpty(): boolean {
        return this._items.length === 0;
    }

    get summary(): string {
        return `${this.itemCount} items, Subtotal: $${this.subtotal.toFixed(2)}, Tax: $${this.tax.toFixed(2)}, Total: $${this.total.toFixed(2)}`;
    }

    set taxRate(rate: number) {
        if (rate < 0 || rate > 1) {
            throw new Error("Tax rate must be between 0 and 1");
        }
        this._taxRate = rate;
    }

    get taxRate(): number {
        return this._taxRate;
    }
}

const cart = new ShoppingCart();
cart.addItem("Laptop", 999.99, 1);
cart.addItem("Mouse", 29.99, 2);

console.log(cart.summary);
console.log(`Tax rate: ${(cart.taxRate * 100).toFixed(1)}%`);

// Change tax rate
cart.taxRate = 0.10;
console.log(`Updated with new tax rate: ${cart.summary}`);

// ===== GETTERS AND SETTERS BEST PRACTICES =====
console.log("\n=== Best Practices ===");

class BestPracticesExample {
    private _value: number;
    private _lastAccessed: Date;
    private _changeCount: number = 0;

    constructor(value: number) {
        this._value = value;
        this._lastAccessed = new Date();
    }

    // ✅ Good: Simple getter with minimal logic
    get value(): number {
        this._lastAccessed = new Date(); // Track access
        return this._value;
    }

    // ✅ Good: Setter with validation and side effects
    set value(newValue: number) {
        // Validate
        if (typeof newValue !== 'number' || isNaN(newValue)) {
            throw new Error("Value must be a valid number");
        }
        
        // Only update if actually changed
        if (newValue !== this._value) {
            this._value = newValue;
            this._changeCount++;
            console.log(`Value changed to ${newValue} (change #${this._changeCount})`);
        }
    }

    // ✅ Good: Read-only computed property
    get lastAccessed(): Date {
        return this._lastAccessed;
    }

    // ✅ Good: Read-only statistics
    get changeCount(): number {
        return this._changeCount;
    }

    // ✅ Good: Formatted output
    get valueFormatted(): string {
        return `$${this._value.toFixed(2)}`;
    }

    // ❌ Avoid: Expensive operations in getters
    // get expensiveOperation(): number {
    //     // Don't do heavy calculations every time
    //     return this.someVerySlowCalculation();
    // }

    // ✅ Better: Cache expensive operations
    private _cachedResult?: number;
    private _cacheInvalid: boolean = true;

    get optimizedOperation(): number {
        if (this._cacheInvalid || this._cachedResult === undefined) {
            this._cachedResult = this.someCalculation();
            this._cacheInvalid = false;
        }
        return this._cachedResult;
    }

    private someCalculation(): number {
        // Simulate expensive operation
        return this._value * Math.PI;
    }

    // Invalidate cache when value changes
    private invalidateCache(): void {
        this._cacheInvalid = true;
    }
}

// ===== SUMMARY =====
console.log("\n=== Getters and Setters Summary ===");
console.log("✅ USE GETTERS FOR:");
console.log("   • Computed properties (calculated values)");
console.log("   • Formatted output");
console.log("   • Read-only access to private data");
console.log("   • Logging property access");
console.log("   • Simple transformations");
console.log("");
console.log("✅ USE SETTERS FOR:");
console.log("   • Input validation");
console.log("   • Data transformation on assignment");
console.log("   • Triggering side effects");
console.log("   • Logging property changes");
console.log("   • Controlled updates to private data");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Keep getters fast (no expensive operations)");
console.log("   • Validate in setters, not getters");
console.log("   • Use private backing fields (_property)");
console.log("   • Make computed properties read-only when appropriate");
console.log("   • Cache expensive calculations");
console.log("   • Provide meaningful error messages in setters");
console.log("   • Use getters/setters to maintain invariants");
console.log("");
console.log("🎯 REMEMBER:");
console.log("   • Getters/setters look like properties but act like methods");
console.log("   • They provide controlled access to object state");
console.log("   • They enable data validation and computed properties");
console.log("   • They maintain encapsulation while providing clean APIs");

export {}; 