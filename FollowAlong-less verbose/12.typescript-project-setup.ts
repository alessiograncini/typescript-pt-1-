// ===== TYPESCRIPT PROJECT SETUP =====

// TypeScript compilation: .ts files → tsc → .js files

console.log("=== Basic TypeScript Project ===");

// Example: Simple module structure
export interface User {
    id: number;
    name: string;
    email: string;
}

export class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
        console.log(`User ${user.name} added`);
    }

    getUser(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): User[] {
        return [...this.users];
    }
}

// Example usage
const userService = new UserService();

const user1: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

const user2: User = {
    id: 2,
    name: "Bob", 
    email: "bob@example.com"
};

userService.addUser(user1);
userService.addUser(user2);

console.log("All users:", userService.getAllUsers());
console.log("User 1:", userService.getUser(1));

// Example: Configuration types
export interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

export interface AppConfig {
    env: "development" | "production" | "test";
    port: number;
    database: DatabaseConfig;
    features: {
        logging: boolean;
        analytics: boolean;
    };
}

const config: AppConfig = {
    env: "development",
    port: 3000,
    database: {
        host: "localhost",
        port: 5432,
        database: "myapp",
        username: "admin",
        password: "secret"
    },
    features: {
        logging: true,
        analytics: false
    }
};

console.log("App config:", config);

// Example: Module exports
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function validateEmail(email: string): boolean {
    return email.includes("@") && email.includes(".");
}

export const API_BASE_URL = "https://api.example.com";

// Testing utilities
console.log("Today:", formatDate(new Date()));
console.log("Valid email:", validateEmail("test@example.com"));
console.log("API URL:", API_BASE_URL);

/*
Common tsconfig.json settings:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
*/

export {};