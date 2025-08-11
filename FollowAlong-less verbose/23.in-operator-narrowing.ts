// 'in' operator: safe property existence checking for type narrowing

// Basic 'in' operator usage
interface Square {
    kind: "square";
    size: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Circle;

function calculateArea(shape: Shape): number {
    if ('size' in shape) {
        // TypeScript knows shape is Square
        return shape.size * shape.size;
    }
    // TypeScript knows shape is Circle
    return Math.PI * shape.radius * shape.radius;
}

const square: Square = { kind: "square", size: 5 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(`Square area: ${calculateArea(square)}`);
console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);

// Complex interface discrimination
interface AdminUser {
    id: number;
    name: string;
    permissions: string[];
    adminLevel: number;
}

interface PremiumUser {
    id: number;
    name: string;
    subscriptionType: "monthly" | "yearly";
    features: string[];
}

interface GuestUser {
    sessionId: string;
    tempName: string;
}

type User = AdminUser | PremiumUser | GuestUser;

function processUser(user: User): string {
    if ('permissions' in user && 'adminLevel' in user) {
        // TypeScript knows user is AdminUser
        return `Admin ${user.name}: Level ${user.adminLevel}, Permissions: ${user.permissions.length}`;
    }
    
    if ('subscriptionType' in user && 'features' in user) {
        // TypeScript knows user is PremiumUser
        return `Premium ${user.name}: ${user.subscriptionType}, Features: ${user.features.length}`;
    }
    
    if ('sessionId' in user && 'tempName' in user) {
        // TypeScript knows user is GuestUser
        return `Guest ${user.tempName} (Session: ${user.sessionId})`;
    }
    
    throw new Error("Unknown user type");
}

const adminUser: AdminUser = {
    id: 1,
    name: "Alice",
    permissions: ["read", "write", "delete"],
    adminLevel: 5
};

const premiumUser: PremiumUser = {
    id: 2,
    name: "Bob",
    subscriptionType: "yearly",
    features: ["analytics", "support", "themes"]
};

const guestUser: GuestUser = {
    sessionId: "sess_123",
    tempName: "Guest_789"
};

console.log(processUser(adminUser));
console.log(processUser(premiumUser));
console.log(processUser(guestUser));

// Nested property checking
interface DatabaseConfig {
    name: string;
    database: {
        host: string;
        port: number;
        credentials?: {
            username: string;
            password: string;
        };
    };
}

interface CacheConfig {
    name: string;
    cache: {
        type: "redis" | "memory";
        ttl: number;
    };
}

type AppConfig = DatabaseConfig | CacheConfig;

function validateConfig(config: AppConfig): string {
    if ('database' in config) {
        // TypeScript knows config is DatabaseConfig
        const hasCredentials = config.database.credentials &&
                              'username' in config.database.credentials;
        return `Database: ${config.database.host}:${config.database.port} (Auth: ${!!hasCredentials})`;
    }
    
    if ('cache' in config) {
        // TypeScript knows config is CacheConfig
        return `Cache: ${config.cache.type} (TTL: ${config.cache.ttl}s)`;
    }
    
    throw new Error("Unknown config type");
}

const dbConfig: DatabaseConfig = {
    name: "MyApp",
    database: {
        host: "localhost",
        port: 5432,
        credentials: {
            username: "admin",
            password: "secret"
        }
    }
};

const cacheConfig: CacheConfig = {
    name: "MyApp",
    cache: {
        type: "redis",
        ttl: 3600
    }
};

console.log(validateConfig(dbConfig));
console.log(validateConfig(cacheConfig));

// Dynamic property checking
function hasProperties<T extends object>(obj: T, ...props: string[]): boolean {
    return props.every(prop => prop in obj);
}

interface ExpectedUser {
    id: number;
    name: string;
    email: string;
}

function checkObjectShape<T extends Record<string, any>>(
    obj: unknown,
    requiredProps: (keyof T)[]
): obj is T {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    
    return requiredProps.every(prop => String(prop) in obj);
}

function processUnknownData(data: unknown): string {
    if (checkObjectShape<ExpectedUser>(data, ['id', 'name', 'email'])) {
        // TypeScript knows data is ExpectedUser
        return `User: ${data.name} (${data.email})`;
    }
    
    if (data && typeof data === 'object') {
        const obj = data as Record<string, any>;
        
        if (hasProperties(obj, 'type', 'payload')) {
            return `Action: ${obj.type}`;
        }
        
        if (hasProperties(obj, 'message', 'timestamp')) {
            return `Log: ${obj.message}`;
        }
        
        return `Object with ${Object.keys(obj).length} properties`;
    }
    
    return `Unknown: ${typeof data}`;
}

const userData = { id: 1, name: "Alice", email: "alice@example.com" };
const actionData = { type: "USER_LOGIN", payload: { userId: 1 } };
const logData = { message: "Operation completed", timestamp: "2024-01-01" };

console.log(processUnknownData(userData));
console.log(processUnknownData(actionData));
console.log(processUnknownData(logData));

// API response discrimination
interface DataResponse {
    status: number;
    data: any[];
}

interface ErrorResponse {
    status: number;
    error: string;
    code: string;
}

interface PaginatedResponse extends DataResponse {
    pagination: {
        page: number;
        total: number;
    };
}

type ApiResponse = DataResponse | ErrorResponse | PaginatedResponse;

function handleResponse(response: ApiResponse): string {
    if ('error' in response && 'code' in response) {
        // TypeScript knows response is ErrorResponse
        return `Error ${response.status}: ${response.error} (${response.code})`;
    }
    
    if ('data' in response && 'pagination' in response) {
        // TypeScript knows response is PaginatedResponse
        return `Page ${response.pagination.page}: ${response.data.length} of ${response.pagination.total} items`;
    }
    
    if ('data' in response) {
        // TypeScript knows response is DataResponse
        return `Data: ${response.data.length} items`;
    }
    
    throw new Error("Unknown response type");
}

const errorResponse: ErrorResponse = {
    status: 404,
    error: "Resource not found",
    code: "NOT_FOUND"
};

const dataResponse: DataResponse = {
    status: 200,
    data: [{ id: 1 }, { id: 2 }]
};

const paginatedResponse: PaginatedResponse = {
    status: 200,
    data: [{ id: 1 }],
    pagination: { page: 1, total: 10 }
};

console.log(handleResponse(errorResponse));
console.log(handleResponse(dataResponse));
console.log(handleResponse(paginatedResponse));

// Performance optimization with discriminators
interface OptimizedCircle {
    type: "circle";
    radius: number;
}

interface OptimizedSquare {
    type: "square";
    size: number;
}

type OptimizedShape = OptimizedCircle | OptimizedSquare;

function calculateOptimizedArea(shape: OptimizedShape): number {
    // Check discriminator first (faster), then validate with 'in'
    switch (shape.type) {
        case "circle":
            if ('radius' in shape) {
                return Math.PI * shape.radius * shape.radius;
            }
            break;
        case "square":
            if ('size' in shape) {
                return shape.size * shape.size;
            }
            break;
    }
    throw new Error("Invalid shape properties");
}

const optimizedCircle: OptimizedCircle = { type: "circle", radius: 4 };
const optimizedSquare: OptimizedSquare = { type: "square", size: 6 };

console.log(`Optimized circle area: ${calculateOptimizedArea(optimizedCircle).toFixed(2)}`);
console.log(`Optimized square area: ${calculateOptimizedArea(optimizedSquare)}`);

// Summary: 'in' operator enables safe property checking and interface discrimination

export {};