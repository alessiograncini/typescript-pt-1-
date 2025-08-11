// ===== THE 'IN' OPERATOR FOR TYPE NARROWING =====
// Mastering property-based type narrowing in TypeScript

// ===== WHAT IS THE 'IN' OPERATOR? =====
console.log("=== What Is the 'in' Operator? ===");

/*
The 'IN' OPERATOR is a JavaScript operator that checks if a property exists in an object.
In TypeScript, it becomes a POWERFUL TYPE NARROWING TOOL.

🎯 SYNTAX: 'propertyName' in objectVariable

🔧 HOW IT WORKS FOR TYPE NARROWING:
• Checks if a property exists on an object
• TypeScript narrows the type based on property presence
• Works with interfaces, types, and object shapes
• Safer than direct property access (no runtime errors)

❌ WITHOUT 'IN' OPERATOR (Dangerous):
function getArea(shape: Square | Circle) {
    if (shape.size) {  // 🚨 Error! 'size' might not exist on Circle
        return shape.size * shape.size;
    }
    return Math.PI * shape.radius * shape.radius;  // 🚨 Error! 'radius' might not exist
}

✅ WITH 'IN' OPERATOR (Safe):
function getArea(shape: Square | Circle) {
    if ('size' in shape) {  // ✅ Safe check - TypeScript narrows to Square
        return shape.size * shape.size;
    }
    // TypeScript knows shape must be Circle here
    return Math.PI * shape.radius * shape.radius;
}

The 'in' operator is your SAFETY NET for property-based type narrowing!
*/

// ===== BASIC 'IN' OPERATOR USAGE =====
console.log("\n=== Basic 'in' Operator Usage ===");

interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

// Basic property checking with 'in' operator
function calculateArea(shape: Shape): number {
    console.log(`Calculating area for shape: ${shape.kind}`);
    
    if ('size' in shape) {
        // TypeScript knows shape is Square (only Square has 'size')
        console.log(`📐 Square with size: ${shape.size}`);
        return shape.size * shape.size;
    }
    
    if ('width' in shape && 'height' in shape) {
        // TypeScript knows shape is Rectangle (only Rectangle has both width and height)
        console.log(`📐 Rectangle: ${shape.width} x ${shape.height}`);
        return shape.width * shape.height;
    }
    
    if ('radius' in shape) {
        // TypeScript knows shape is Circle (only Circle has 'radius')
        console.log(`📐 Circle with radius: ${shape.radius}`);
        return Math.PI * shape.radius * shape.radius;
    }
    
    // This should never happen with proper type definitions
    throw new Error("Unknown shape type");
}

// Testing basic 'in' operator usage
const square: Square = { kind: "square", size: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(`Square area: ${calculateArea(square)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);

// ===== COMPLEX INTERFACE DISCRIMINATION =====
console.log("\n=== Complex Interface Discrimination ===");

interface User {
    id: number;
    name: string;
    email: string;
}

interface AdminUser extends User {
    permissions: string[];
    adminLevel: number;
}

interface PremiumUser extends User {
    subscriptionType: "monthly" | "yearly";
    features: string[];
}

interface GuestUser {
    sessionId: string;
    tempName: string;
}

type AnyUser = User | AdminUser | PremiumUser | GuestUser;

function processUser(user: AnyUser): string {
    console.log(`Processing user type...`);
    
    // Check for admin-specific properties
    if ('permissions' in user && 'adminLevel' in user) {
        // TypeScript knows user is AdminUser
        console.log(`👑 Admin user: ${user.name} (Level ${user.adminLevel})`);
        console.log(`👑 Permissions: ${user.permissions.join(", ")}`);
        return `Admin ${user.name} with ${user.permissions.length} permissions`;
    }
    
    // Check for premium-specific properties
    if ('subscriptionType' in user && 'features' in user) {
        // TypeScript knows user is PremiumUser
        console.log(`💎 Premium user: ${user.name} (${user.subscriptionType})`);
        console.log(`💎 Features: ${user.features.join(", ")}`);
        return `Premium user ${user.name} with ${user.features.length} features`;
    }
    
    // Check for guest-specific properties
    if ('sessionId' in user && 'tempName' in user) {
        // TypeScript knows user is GuestUser
        console.log(`👤 Guest user: ${user.tempName} (Session: ${user.sessionId})`);
        return `Guest ${user.tempName}`;
    }
    
    // Must be regular User (has id, name, email but no special properties)
    if ('id' in user && 'name' in user && 'email' in user) {
        // TypeScript knows user is User
        console.log(`👤 Regular user: ${user.name} (${user.email})`);
        return `User ${user.name}`;
    }
    
    throw new Error("Unknown user type");
}

// Testing complex interface discrimination
const adminUser: AdminUser = {
    id: 1,
    name: "Alice Admin",
    email: "alice@admin.com",
    permissions: ["read", "write", "delete", "manage"],
    adminLevel: 5
};

const premiumUser: PremiumUser = {
    id: 2,
    name: "Bob Premium",
    email: "bob@premium.com",
    subscriptionType: "yearly",
    features: ["advanced-analytics", "priority-support", "custom-themes"]
};

const guestUser: GuestUser = {
    sessionId: "sess_123456",
    tempName: "Guest_789"
};

const regularUser: User = {
    id: 3,
    name: "Charlie Regular",
    email: "charlie@regular.com"
};

console.log(processUser(adminUser));
console.log(processUser(premiumUser));
console.log(processUser(guestUser));
console.log(processUser(regularUser));

// ===== ARRAY AND OBJECT PROPERTY CHECKING =====
console.log("\n=== Array and Object Property Checking ===");

interface ApiResponse {
    status: number;
    message: string;
}

interface DataResponse extends ApiResponse {
    data: any[];
}

interface ErrorResponse extends ApiResponse {
    error: string;
    code: string;
}

interface PaginatedResponse extends DataResponse {
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

type Response = ApiResponse | DataResponse | ErrorResponse | PaginatedResponse;

function handleResponse(response: Response): string {
    console.log(`Handling response with status: ${response.status}`);
    
    // Check for error response
    if ('error' in response && 'code' in response) {
        // TypeScript knows response is ErrorResponse
        console.log(`❌ Error Response: ${response.error} (Code: ${response.code})`);
        return `Error ${response.status}: ${response.error}`;
    }
    
    // Check for paginated response (has both data and pagination)
    if ('data' in response && 'pagination' in response) {
        // TypeScript knows response is PaginatedResponse
        const { page, limit, total } = response.pagination;
        console.log(`📄 Paginated Response: ${response.data.length} items (Page ${page}/${Math.ceil(total / limit)})`);
        return `Page ${page}: ${response.data.length} of ${total} items`;
    }
    
    // Check for data response (has data but no pagination)
    if ('data' in response) {
        // TypeScript knows response is DataResponse
        console.log(`📊 Data Response: ${response.data.length} items`);
        return `Data: ${response.data.length} items`;
    }
    
    // Must be basic ApiResponse
    console.log(`📝 Basic Response: ${response.message}`);
    return `Status ${response.status}: ${response.message}`;
}

// Testing array and object property checking
const errorResponse: ErrorResponse = {
    status: 404,
    message: "Not Found",
    error: "Resource does not exist",
    code: "RESOURCE_NOT_FOUND"
};

const dataResponse: DataResponse = {
    status: 200,
    message: "Success",
    data: [{ id: 1 }, { id: 2 }, { id: 3 }]
};

const paginatedResponse: PaginatedResponse = {
    status: 200,
    message: "Success",
    data: [{ id: 1 }, { id: 2 }],
    pagination: { page: 1, limit: 2, total: 10 }
};

const basicResponse: ApiResponse = {
    status: 200,
    message: "Operation completed successfully"
};

console.log(handleResponse(errorResponse));
console.log(handleResponse(dataResponse));
console.log(handleResponse(paginatedResponse));
console.log(handleResponse(basicResponse));

// ===== NESTED PROPERTY CHECKING =====
console.log("\n=== Nested Property Checking ===");

interface BasicConfig {
    name: string;
    version: string;
}

interface DatabaseConfig extends BasicConfig {
    database: {
        host: string;
        port: number;
        credentials?: {
            username: string;
            password: string;
        };
    };
}

interface CacheConfig extends BasicConfig {
    cache: {
        type: "redis" | "memory";
        ttl: number;
        options?: {
            maxKeys: number;
            evictionPolicy: string;
        };
    };
}

interface LoggingConfig extends BasicConfig {
    logging: {
        level: "debug" | "info" | "warn" | "error";
        outputs: ("console" | "file" | "remote")[];
        file?: {
            path: string;
            maxSize: string;
        };
    };
}

type AppConfig = BasicConfig | DatabaseConfig | CacheConfig | LoggingConfig;

function validateConfig(config: AppConfig): { valid: boolean; type: string; details: string } {
    console.log(`Validating config: ${config.name} v${config.version}`);
    
    // Check for database configuration
    if ('database' in config) {
        // TypeScript knows config is DatabaseConfig
        const dbValid = !!config.database.host && config.database.port > 0;
        const hasCredentials = config.database.credentials && 
                             'username' in config.database.credentials &&
                             'password' in config.database.credentials;
        
        console.log(`🗄️ Database Config: ${config.database.host}:${config.database.port}`);
        console.log(`🗄️ Has credentials: ${!!hasCredentials}`);
        
        return {
            valid: dbValid,
            type: "database",
            details: `Database at ${config.database.host}:${config.database.port}`
        };
    }
    
    // Check for cache configuration
    if ('cache' in config) {
        // TypeScript knows config is CacheConfig
        const cacheValid = config.cache.type && config.cache.ttl > 0;
        const hasOptions = config.cache.options &&
                          'maxKeys' in config.cache.options &&
                          'evictionPolicy' in config.cache.options;
        
        console.log(`🚀 Cache Config: ${config.cache.type} (TTL: ${config.cache.ttl}s)`);
        console.log(`🚀 Has options: ${!!hasOptions}`);
        
        return {
            valid: cacheValid,
            type: "cache",
            details: `${config.cache.type} cache with ${config.cache.ttl}s TTL`
        };
    }
    
    // Check for logging configuration
    if ('logging' in config) {
        // TypeScript knows config is LoggingConfig
        const loggingValid = config.logging.level && config.logging.outputs.length > 0;
        const hasFileOutput = config.logging.outputs.includes("file") &&
                             config.logging.file &&
                             'path' in config.logging.file;
        
        console.log(`📝 Logging Config: ${config.logging.level} level`);
        console.log(`📝 Outputs: ${config.logging.outputs.join(", ")}`);
        console.log(`📝 File output: ${!!hasFileOutput}`);
        
        return {
            valid: loggingValid,
            type: "logging",
            details: `${config.logging.level} level to ${config.logging.outputs.join(", ")}`
        };
    }
    
    // Basic configuration
    console.log(`⚙️ Basic Config: ${config.name}`);
    return {
        valid: true,
        type: "basic",
        details: `Basic configuration for ${config.name}`
    };
}

// Testing nested property checking
const dbConfig: DatabaseConfig = {
    name: "MyApp",
    version: "1.0.0",
    database: {
        host: "localhost",
        port: 5432,
        credentials: {
            username: "admin",
            password: "secret123"
        }
    }
};

const cacheConfig: CacheConfig = {
    name: "MyApp",
    version: "1.0.0",
    cache: {
        type: "redis",
        ttl: 3600,
        options: {
            maxKeys: 10000,
            evictionPolicy: "lru"
        }
    }
};

const loggingConfig: LoggingConfig = {
    name: "MyApp",
    version: "1.0.0",
    logging: {
        level: "info",
        outputs: ["console", "file"],
        file: {
            path: "/var/log/myapp.log",
            maxSize: "100MB"
        }
    }
};

const basicConfig: BasicConfig = {
    name: "SimpleApp",
    version: "0.1.0"
};

console.log(validateConfig(dbConfig));
console.log(validateConfig(cacheConfig));
console.log(validateConfig(loggingConfig));
console.log(validateConfig(basicConfig));

// ===== DYNAMIC PROPERTY CHECKING =====
console.log("\n=== Dynamic Property Checking ===");

// Function to check for properties dynamically
function hasProperties<T extends object>(obj: T, ...props: string[]): boolean {
    return props.every(prop => prop in obj);
}

// Function to safely access nested properties
function getNestedProperty(obj: any, path: string): any {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    
    return current;
}

// Generic property checker with type narrowing
function checkObjectShape<T extends Record<string, any>>(
    obj: unknown,
    requiredProps: (keyof T)[]
): obj is T {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    
    return requiredProps.every(prop => String(prop) in obj);
}

// Testing dynamic property checking
interface ExpectedUser {
    id: number;
    name: string;
    email: string;
}

interface ExpectedProduct {
    id: number;
    title: string;
    price: number;
}

function processUnknownData(data: unknown): string {
    console.log("Processing unknown data...");
    
    // Check if it's a user object
    if (checkObjectShape<ExpectedUser>(data, ['id', 'name', 'email'])) {
        // TypeScript knows data is ExpectedUser
        console.log(`👤 User detected: ${data.name} (${data.email})`);
        return `User: ${data.name}`;
    }
    
    // Check if it's a product object
    if (checkObjectShape<ExpectedProduct>(data, ['id', 'title', 'price'])) {
        // TypeScript knows data is ExpectedProduct
        console.log(`🛒 Product detected: ${data.title} ($${data.price})`);
        return `Product: ${data.title}`;
    }
    
    // Check if it has certain properties
    if (data && typeof data === 'object') {
        const obj = data as Record<string, any>;
        
        if (hasProperties(obj, 'type', 'payload')) {
            console.log(`📦 Action-like object: ${obj.type}`);
            return `Action: ${obj.type}`;
        }
        
        if (hasProperties(obj, 'message', 'timestamp')) {
            console.log(`📝 Log-like object: ${obj.message}`);
            return `Log: ${obj.message}`;
        }
        
        console.log(`🔍 Generic object with keys: ${Object.keys(obj).join(', ')}`);
        return `Object with ${Object.keys(obj).length} properties`;
    }
    
    console.log(`❓ Unknown data type: ${typeof data}`);
    return `Unknown: ${typeof data}`;
}

// Testing with various data shapes
const userData = { id: 1, name: "Alice", email: "alice@example.com", extra: "ignored" };
const productData = { id: 2, title: "TypeScript Guide", price: 29.99, category: "books" };
const actionData = { type: "USER_LOGIN", payload: { userId: 1 }, timestamp: Date.now() };
const logData = { message: "Operation completed", timestamp: "2024-01-01", level: "info" };
const unknownData = { random: "value", number: 42 };

console.log(processUnknownData(userData));
console.log(processUnknownData(productData));
console.log(processUnknownData(actionData));
console.log(processUnknownData(logData));
console.log(processUnknownData(unknownData));
console.log(processUnknownData("not an object"));

// ===== PERFORMANCE CONSIDERATIONS =====
console.log("\n=== Performance Considerations ===");

// Efficient property checking order (most common first)
interface OptimizedShape {
    type: "circle" | "square" | "rectangle" | "triangle";
}

interface OptimizedCircle extends OptimizedShape {
    type: "circle";
    radius: number;
}

interface OptimizedSquare extends OptimizedShape {
    type: "square";
    size: number;
}

interface OptimizedRectangle extends OptimizedShape {
    type: "rectangle";
    width: number;
    height: number;
}

interface OptimizedTriangle extends OptimizedShape {
    type: "triangle";
    base: number;
    height: number;
}

type OptimizedShapeType = OptimizedCircle | OptimizedSquare | OptimizedRectangle | OptimizedTriangle;

// Optimized version: check discriminator first, then use 'in' for validation
function calculateOptimizedArea(shape: OptimizedShapeType): number {
    // Fast path: use discriminator first
    switch (shape.type) {
        case "circle":
            // Validate expected properties exist
            if ('radius' in shape) {
                return Math.PI * shape.radius * shape.radius;
            }
            break;
            
        case "square":
            if ('size' in shape) {
                return shape.size * shape.size;
            }
            break;
            
        case "rectangle":
            if ('width' in shape && 'height' in shape) {
                return shape.width * shape.height;
            }
            break;
            
        case "triangle":
            if ('base' in shape && 'height' in shape) {
                return 0.5 * shape.base * shape.height;
            }
            break;
    }
    
    throw new Error(`Invalid shape: missing required properties for ${(shape as any).type}`);
}

// Performance timing example
function measurePerformance() {
    const shapes: OptimizedShapeType[] = [
        { type: "circle", radius: 5 },
        { type: "square", size: 4 },
        { type: "rectangle", width: 3, height: 6 },
        { type: "triangle", base: 4, height: 3 }
    ];
    
    console.log("Performance test with optimized shapes:");
    const start = performance.now();
    
    for (let i = 0; i < 1000; i++) {
        shapes.forEach(shape => calculateOptimizedArea(shape));
    }
    
    const end = performance.now();
    console.log(`Processed 4000 shapes in ${(end - start).toFixed(2)}ms`);
    
    // Test results
    shapes.forEach(shape => {
        const area = calculateOptimizedArea(shape);
        console.log(`${shape.type} area: ${area.toFixed(2)}`);
    });
}

measurePerformance();

// ===== BEST PRACTICES =====
console.log("\n=== 'in' Operator Best Practices ===");

/*
✅ 'IN' OPERATOR BEST PRACTICES:

1. 🎯  USE FOR OPTIONAL PROPERTIES
   ✅ if ('optionalProp' in obj) { ... }
   ❌ if (obj.optionalProp !== undefined) { ... }  // Can throw if obj is null

2. 🔍  CHECK UNIQUE PROPERTIES FIRST
   ✅ if ('uniqueProperty' in obj) { ... }  // Property that only one type has
   ❌ if ('commonProperty' in obj) { ... }  // Property shared by multiple types

3. 🚀  COMBINE WITH DISCRIMINATORS FOR PERFORMANCE
   ✅ switch (obj.type) { case "user": if ('email' in obj) { ... } }
   ❌ if ('email' in obj) { ... } // Without discriminator first

4. 📝  USE FOR COMPLEX UNIONS
   ✅ if ('specificMethod' in obj && 'specificProperty' in obj) { ... }
   ❌ Multiple separate if statements

5. 🛡️  VALIDATE AFTER NARROWING
   ✅ if ('prop' in obj && typeof obj.prop === 'string') { ... }
   ❌ if ('prop' in obj) { return obj.prop.toUpperCase(); }  // Might not be string

6. 🔧  USE WITH GENERIC TYPE GUARDS
   ✅ function hasProperty<T, K extends string>(obj: T, prop: K): obj is T & Record<K, unknown>
   
❌ COMMON MISTAKES:

1. Checking Common Properties:
   ❌ if ('id' in obj) { ... }  // Many types might have 'id'
   ✅ if ('specificUniqueProperty' in obj) { ... }

2. Not Validating Property Types:
   ❌ if ('count' in obj) { return obj.count + 1; }  // count might not be number
   ✅ if ('count' in obj && typeof obj.count === 'number') { return obj.count + 1; }

3. Incorrect Order of Checks:
   ❌ if ('a' in obj && 'b' in obj && 'c' in obj) { ... }  // Check most unique first
   ✅ if ('uniqueProperty' in obj && 'a' in obj && 'b' in obj) { ... }

4. Forgetting Null/Undefined Checks:
   ❌ if ('prop' in obj) { ... }  // obj might be null
   ✅ if (obj && 'prop' in obj) { ... }

5. Using for Non-Object Types:
   ❌ if ('length' in str) { ... }  // Use typeof for primitives
   ✅ if (typeof str === 'string') { ... }
*/

// Example demonstrating best practices
interface AdvancedUser {
    type: "user";
    id: number;
    profile: {
        name: string;
        email: string;
        preferences?: {
            theme: string;
            notifications: boolean;
        };
    };
}

interface AdvancedAdmin {
    type: "admin";
    id: number;
    adminData: {
        level: number;
        permissions: string[];
        department?: string;
    };
}

interface AdvancedGuest {
    type: "guest";
    sessionId: string;
    tempData: {
        name?: string;
        actions: string[];
    };
}

type AdvancedUserType = AdvancedUser | AdvancedAdmin | AdvancedGuest;

function processAdvancedUser(user: AdvancedUserType): string {
    // ✅ Best practice: Check discriminator first
    switch (user.type) {
        case "user":
            // ✅ Validate expected structure exists
            if ('profile' in user && user.profile && 'name' in user.profile) {
                const hasPreferences = user.profile.preferences && 
                                     'theme' in user.profile.preferences &&
                                     'notifications' in user.profile.preferences;
                
                console.log(`👤 User: ${user.profile.name} (Preferences: ${!!hasPreferences})`);
                return `User ${user.profile.name}`;
            }
            break;
            
        case "admin":
            if ('adminData' in user && user.adminData && 'level' in user.adminData) {
                const hasDepartment = user.adminData.department && 
                                    typeof user.adminData.department === 'string';
                
                console.log(`👑 Admin Level ${user.adminData.level} (Department: ${hasDepartment ? user.adminData.department : 'None'})`);
                return `Admin Level ${user.adminData.level}`;
            }
            break;
            
        case "guest":
            if ('tempData' in user && user.tempData && 'actions' in user.tempData) {
                const hasName = user.tempData.name && typeof user.tempData.name === 'string';
                
                console.log(`👤 Guest: ${hasName ? user.tempData.name : 'Anonymous'} (${user.tempData.actions.length} actions)`);
                return `Guest ${hasName ? user.tempData.name : user.sessionId}`;
            }
            break;
    }
    
    throw new Error(`Invalid user structure for type: ${user.type}`);
}

// Testing best practices
const advancedUser: AdvancedUser = {
    type: "user",
    id: 1,
    profile: {
        name: "Alice",
        email: "alice@example.com",
        preferences: {
            theme: "dark",
            notifications: true
        }
    }
};

const advancedAdmin: AdvancedAdmin = {
    type: "admin",
    id: 2,
    adminData: {
        level: 5,
        permissions: ["read", "write", "delete"],
        department: "Engineering"
    }
};

const advancedGuest: AdvancedGuest = {
    type: "guest",
    sessionId: "sess_123",
    tempData: {
        name: "TempUser",
        actions: ["view", "click"]
    }
};

console.log(processAdvancedUser(advancedUser));
console.log(processAdvancedUser(advancedAdmin));
console.log(processAdvancedUser(advancedGuest));

// ===== SUMMARY =====
console.log("\n=== 'in' Operator Summary ===");
console.log("🔍 THE 'IN' OPERATOR ENABLES:");
console.log("   • Safe property existence checking");
console.log("   • Type narrowing based on object shape");
console.log("   • Interface discrimination in union types");
console.log("   • Avoiding runtime errors from missing properties");
console.log("");
console.log("🎯 KEY TECHNIQUES:");
console.log("   • Basic property checking: 'property' in object");
console.log("   • Multiple property validation: 'a' in obj && 'b' in obj");
console.log("   • Nested property checking: 'deep.nested.prop' access");
console.log("   • Dynamic property validation with type guards");
console.log("   • Performance optimization with discriminators");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Check unique properties for clear discrimination");
console.log("   • Combine with discriminator properties for performance");
console.log("   • Validate property types after existence check");
console.log("   • Use null/undefined guards before 'in' checks");
console.log("   • Order checks from most specific to most general");
console.log("");
console.log("🚀 REMEMBER:");
console.log("   • 'in' operator = Safe property checking + Type narrowing");
console.log("   • Perfect for complex object unions and interface discrimination");
console.log("   • Prevents runtime errors from accessing missing properties");
console.log("   • Essential tool for robust TypeScript type narrowing! 🎯");

export {}; 