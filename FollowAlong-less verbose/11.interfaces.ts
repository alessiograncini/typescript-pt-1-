// ===== INTERFACES =====

// Basic interface
interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
}

const hitesh: User = { 
    dbId: 22, 
    email: "h@h.com", 
    userId: 2211 
};

hitesh.email = "h@hc.com"; // Can modify
// hitesh.dbId = 33; // Error - readonly property

// Interface with methods
interface User2 {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    startTrail(): string;
    getCoupon(couponname: string, value: number): number;
}

const hitesh2: User2 = { 
    dbId: 22, 
    email: "h@h.com", 
    userId: 2211,
    startTrail: () => {
        return "trail started";
    },
    getCoupon: (name: "hitesh10", off: 10) => {
        return 10;
    }
};

// Extending interfaces
interface Admin extends User {
    role: "admin" | "ta" | "learner";
}

const admin: Admin = {
    dbId: 33,
    email: "admin@example.com",
    userId: 3344,
    role: "admin"
};

// Multiple inheritance
interface Manager extends User {
    team: string[];
}

interface SuperAdmin extends Admin, Manager {
    permissions: string[];
}

// Interface for functions
interface MathOperation {
    (x: number, y: number): number;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Interface for arrays
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = ["Alice", "Bob"];

// Interface for objects with any string keys
interface LooseObject {
    [key: string]: any;
}

const flexibleObj: LooseObject = {
    name: "John",
    age: 30,
    isActive: true
};

// Testing
console.log(`User: ${hitesh.email}, ID: ${hitesh.userId}`);
console.log(`Admin: ${admin.email}, Role: ${admin.role}`);
console.log("Add:", add(5, 3));
console.log("Array:", myArray);

export {};