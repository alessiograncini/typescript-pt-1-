// ===== ASYNC FUNCTIONS IN TYPESCRIPT =====
// Mastering asynchronous programming with type safety

// ===== WHAT ARE ASYNC FUNCTIONS? =====
console.log("=== What Are Async Functions? ===");

/*
ASYNC FUNCTIONS are functions that handle asynchronous operations using Promises.
In TypeScript, they provide excellent type safety for async code!

🎯 KEY CONCEPTS:
• async/await syntax for cleaner asynchronous code
• Promises and Promise types
• Error handling with try/catch
• Type safety for async operations
• Parallel vs sequential execution

🔧 ASYNC FUNCTION SYNTAX:
async function functionName(): Promise<ReturnType> {
    const result = await someAsyncOperation();
    return result;
}

🚀 WHY USE ASYNC FUNCTIONS?
• Cleaner than Promise.then() chains
• Better error handling
• Type safety with TypeScript
• More readable asynchronous code
• Built-in Promise support
*/

// ===== BASIC ASYNC FUNCTIONS =====
console.log("\n=== Basic Async Functions ===");

// Simple async function that returns a Promise
async function greetAsync(name: string): Promise<string> {
    // Simulate async operation with setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Hello, ${name}! (async)`;
}

// Arrow function version
const greetAsyncArrow = async (name: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Hello, ${name}! (async arrow)`;
};

// Function that doesn't explicitly return Promise (TypeScript infers it)
async function calculateAsync(a: number, b: number) {
    // TypeScript infers return type as Promise<number>
    await new Promise(resolve => setTimeout(resolve, 100));
    return a + b;
}

// Testing basic async functions
async function testBasicAsync() {
    console.log("=== Testing Basic Async Functions ===");
    
    console.log("Starting async operations...");
    
    const greeting1 = await greetAsync("Alice");
    console.log(greeting1);
    
    const greeting2 = await greetAsyncArrow("Bob");
    console.log(greeting2);
    
    const result = await calculateAsync(10, 20);
    console.log(`Calculation result: ${result}`);
    
    console.log("All async operations completed!");
}

// ===== WORKING WITH PROMISES =====
console.log("\n=== Working with Promises ===");

// Function that returns a Promise directly
function fetchUserData(userId: number): Promise<{ id: number; name: string; email: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid user ID"));
            } else {
                resolve({
                    id: userId,
                    name: `User${userId}`,
                    email: `user${userId}@example.com`
                });
            }
        }, 800);
    });
}

// Async function that consumes Promises
async function getUserInfo(userId: number): Promise<string> {
    try {
        const user = await fetchUserData(userId);
        return `User: ${user.name} (${user.email})`;
    } catch (error) {
        return `Error fetching user: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}

// Function with multiple async operations
async function processMultipleUsers(userIds: number[]): Promise<string[]> {
    const results: string[] = [];
    
    for (const id of userIds) {
        try {
            const userInfo = await getUserInfo(id);
            results.push(userInfo);
        } catch (error) {
            results.push(`Failed to process user ${id}`);
        }
    }
    
    return results;
}

// Testing Promise-based functions
async function testPromises() {
    console.log("=== Testing Promise-based Functions ===");
    
    // Single user
    const userInfo = await getUserInfo(1);
    console.log(userInfo);
    
    // Invalid user
    const invalidUser = await getUserInfo(-1);
    console.log(invalidUser);
    
    // Multiple users
    const userResults = await processMultipleUsers([1, 2, -1, 3]);
    userResults.forEach((result, index) => {
        console.log(`User ${index + 1}: ${result}`);
    });
}

// ===== ERROR HANDLING IN ASYNC FUNCTIONS =====
console.log("\n=== Error Handling in Async Functions ===");

// Custom error types
class NetworkError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = "NetworkError";
    }
}

class ValidationError extends Error {
    constructor(message: string, public field: string) {
        super(message);
        this.name = "ValidationError";
    }
}

// Async function with comprehensive error handling
async function fetchWithRetry<T>(
    url: string,
    maxRetries: number = 3
): Promise<{ data: T; status: number }> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} for ${url}`);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Simulate random failures
            if (Math.random() < 0.7 && attempt < maxRetries) {
                throw new NetworkError("Network timeout", 408);
            }
            
            // Success
            const mockData = { message: "Success", timestamp: new Date() } as T;
            return { data: mockData, status: 200 };
            
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error instanceof Error ? error.message : error);
            
            if (attempt === maxRetries) {
                throw error; // Re-throw on final attempt
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    
    throw new Error("Max retries exceeded");
}

// Function with multiple error types
async function validateAndFetch(email: string): Promise<{ user: any; valid: boolean }> {
    try {
        // Validation
        if (!email.includes("@")) {
            throw new ValidationError("Invalid email format", "email");
        }
        
        if (email.length < 5) {
            throw new ValidationError("Email too short", "email");
        }
        
        // Fetch data
        const result = await fetchWithRetry<{ user: string }>("/api/user");
        
        return {
            user: result.data,
            valid: true
        };
        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`Validation error in field '${error.field}': ${error.message}`);
            return { user: null, valid: false };
        }
        
        if (error instanceof NetworkError) {
            console.log(`Network error (${error.statusCode}): ${error.message}`);
            throw error; // Re-throw network errors
        }
        
        console.log("Unknown error:", error);
        throw error;
    }
}

// Testing error handling
async function testErrorHandling() {
    console.log("=== Testing Error Handling ===");
    
    // Valid email
    try {
        const result1 = await validateAndFetch("user@example.com");
        console.log("Valid email result:", result1);
    } catch (error) {
        console.log("Caught error:", error instanceof Error ? error.message : error);
    }
    
    // Invalid email
    try {
        const result2 = await validateAndFetch("invalid");
        console.log("Invalid email result:", result2);
    } catch (error) {
        console.log("Caught error:", error instanceof Error ? error.message : error);
    }
}

// ===== PARALLEL vs SEQUENTIAL EXECUTION =====
console.log("\n=== Parallel vs Sequential Execution ===");

// Simulate async operations
async function fetchData(id: number, delay: number): Promise<{ id: number; data: string }> {
    console.log(`Starting fetch for ID ${id}...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Completed fetch for ID ${id}`);
    return { id, data: `Data for ${id}` };
}

// SEQUENTIAL execution (one after another)
async function sequentialExecution(): Promise<{ totalTime: number; results: any[] }> {
    console.log("=== Sequential Execution ===");
    const startTime = Date.now();
    
    const result1 = await fetchData(1, 1000); // Wait 1 second
    const result2 = await fetchData(2, 1000); // Wait another 1 second
    const result3 = await fetchData(3, 1000); // Wait another 1 second
    
    const totalTime = Date.now() - startTime;
    console.log(`Sequential total time: ${totalTime}ms`);
    
    return { totalTime, results: [result1, result2, result3] };
}

// PARALLEL execution (all at once)
async function parallelExecution(): Promise<{ totalTime: number; results: any[] }> {
    console.log("\n=== Parallel Execution ===");
    const startTime = Date.now();
    
    // Start all operations at the same time
    const promise1 = fetchData(1, 1000);
    const promise2 = fetchData(2, 1000);
    const promise3 = fetchData(3, 1000);
    
    // Wait for all to complete
    const results = await Promise.all([promise1, promise2, promise3]);
    
    const totalTime = Date.now() - startTime;
    console.log(`Parallel total time: ${totalTime}ms`);
    
    return { totalTime, results };
}

// Promise.allSettled for handling mixed success/failure
async function parallelWithSomeFailures(): Promise<PromiseSettledResult<any>[]> {
    console.log("\n=== Parallel with Some Failures ===");
    
    const operations = [
        fetchData(1, 500),
        Promise.reject(new Error("Simulated failure")),
        fetchData(3, 800),
        Promise.reject(new Error("Another failure"))
    ];
    
    const results = await Promise.allSettled(operations);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Operation ${index + 1} succeeded:`, result.value);
        } else {
            console.log(`Operation ${index + 1} failed:`, result.reason.message);
        }
    });
    
    return results;
}

// Testing parallel vs sequential
async function testParallelVsSequential() {
    console.log("=== Testing Parallel vs Sequential ===");
    
    const sequential = await sequentialExecution();
    const parallel = await parallelExecution();
    
    console.log(`\nPerformance comparison:`);
    console.log(`Sequential: ${sequential.totalTime}ms`);
    console.log(`Parallel: ${parallel.totalTime}ms`);
    console.log(`Speedup: ${(sequential.totalTime / parallel.totalTime).toFixed(2)}x faster`);
    
    await parallelWithSomeFailures();
}

// ===== ASYNC GENERATORS AND ITERATORS =====
console.log("\n=== Async Generators and Iterators ===");

// Async generator function
async function* generateNumbers(max: number): AsyncGenerator<number, void, unknown> {
    for (let i = 1; i <= max; i++) {
        console.log(`Generating number ${i}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        yield i;
    }
}

// Async iterator with custom data
async function* fetchPaginatedData(totalPages: number): AsyncGenerator<{ page: number; data: string[] }, void, unknown> {
    for (let page = 1; page <= totalPages; page++) {
        console.log(`Fetching page ${page}...`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = Array.from({ length: 3 }, (_, i) => `Item ${(page - 1) * 3 + i + 1}`);
        
        yield { page, data };
    }
}

// Consuming async generators
async function testAsyncGenerators() {
    console.log("=== Testing Async Generators ===");
    
    // Simple number generator
    console.log("Number generator:");
    for await (const number of generateNumbers(3)) {
        console.log(`Received number: ${number}`);
    }
    
    // Paginated data generator
    console.log("\nPaginated data generator:");
    for await (const pageData of fetchPaginatedData(2)) {
        console.log(`Page ${pageData.page}:`, pageData.data.join(", "));
    }
}

// ===== REAL-WORLD PATTERNS =====
console.log("\n=== Real-World Async Patterns ===");

// API client with type safety
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
}

class ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        console.log(`Making request to: ${url}`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock response based on endpoint
        const mockData = this.getMockData<T>(endpoint);
        
        return {
            data: mockData,
            status: 200,
            message: "Success"
        };
    }
    
    private getMockData<T>(endpoint: string): T {
        if (endpoint.includes('/users')) {
            return { id: 1, name: "John Doe", email: "john@example.com" } as T;
        }
        if (endpoint.includes('/posts')) {
            return { id: 1, title: "Sample Post", content: "This is a sample post", userId: 1 } as T;
        }
        return {} as T;
    }
    
    async getUser(id: number): Promise<User> {
        const response = await this.request<User>(`/users/${id}`);
        return response.data;
    }
    
    async getUserPosts(userId: number): Promise<Post[]> {
        const response = await this.request<Post[]>(`/users/${userId}/posts`);
        return response.data;
    }
    
    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const response = await this.request<User>('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        return response.data;
    }
}

// Service layer with caching
class UserService {
    private cache = new Map<number, User>();
    private apiClient: ApiClient;
    
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    
    async getUser(id: number, useCache: boolean = true): Promise<User> {
        // Check cache first
        if (useCache && this.cache.has(id)) {
            console.log(`Cache hit for user ${id}`);
            return this.cache.get(id)!;
        }
        
        // Fetch from API
        console.log(`Fetching user ${id} from API`);
        const user = await this.apiClient.getUser(id);
        
        // Store in cache
        this.cache.set(id, user);
        
        return user;
    }
    
    async getUserWithPosts(id: number): Promise<{ user: User; posts: Post[] }> {
        // Fetch user and posts in parallel
        const [user, posts] = await Promise.all([
            this.getUser(id),
            this.apiClient.getUserPosts(id)
        ]);
        
        return { user, posts };
    }
    
    async batchGetUsers(ids: number[]): Promise<User[]> {
        // Process in batches of 3 to avoid overwhelming the API
        const batchSize = 3;
        const users: User[] = [];
        
        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);
            console.log(`Processing batch: ${batch.join(', ')}`);
            
            const batchUsers = await Promise.all(
                batch.map(id => this.getUser(id))
            );
            
            users.push(...batchUsers);
        }
        
        return users;
    }
}

// Testing real-world patterns
async function testRealWorldPatterns() {
    console.log("=== Testing Real-World Patterns ===");
    
    const apiClient = new ApiClient("https://api.example.com");
    const userService = new UserService(apiClient);
    
    // Single user with posts
    console.log("Fetching user with posts...");
    const userWithPosts = await userService.getUserWithPosts(1);
    console.log("User with posts:", userWithPosts);
    
    // Batch processing
    console.log("\nBatch processing users...");
    const batchUsers = await userService.batchGetUsers([1, 2, 3, 4, 5]);
    console.log(`Processed ${batchUsers.length} users`);
    
    // Caching demonstration
    console.log("\nTesting caching...");
    await userService.getUser(1); // Should use cache
    await userService.getUser(1, false); // Should bypass cache
}

// ===== ASYNC FUNCTION BEST PRACTICES =====
console.log("\n=== Async Function Best Practices ===");

/*
✅ ASYNC FUNCTION BEST PRACTICES:

1. 🎯 ALWAYS SPECIFY RETURN TYPES
   ✅ async function fetchData(): Promise<Data> { ... }
   ❌ async function fetchData() { ... } // Inference is less clear

2. 🛡️ USE TRY-CATCH FOR ERROR HANDLING
   ✅ try { await operation(); } catch (error) { handle(error); }
   ❌ operation().catch(error => { ... }) // Less readable in async functions

3. ⚡ USE PARALLEL EXECUTION WHEN POSSIBLE
   ✅ await Promise.all([op1(), op2(), op3()])
   ❌ await op1(); await op2(); await op3(); // Unnecessarily slow

4. 🔍 HANDLE BOTH SUCCESS AND FAILURE CASES
   ✅ Use Promise.allSettled() for mixed results
   ✅ Use specific error types for different failures

5. 📝 AVOID ASYNC IN LOOPS (unless sequential is needed)
   ✅ await Promise.all(items.map(async item => await process(item)))
   ❌ for (const item of items) { await process(item); } // Usually slower

6. 🚀 USE PROPER TYPESCRIPT TYPES
   ✅ Promise<User>, Promise<ApiResponse<T>>, AsyncGenerator<T>
   ❌ Promise<any> or untyped promises

❌ COMMON MISTAKES:

1. Forgetting to await:
   ❌ const result = asyncFunction(); // Returns Promise, not the value
   ✅ const result = await asyncFunction();

2. Not handling errors:
   ❌ await riskyOperation(); // Error will crash the function
   ✅ try { await riskyOperation(); } catch (error) { ... }

3. Sequential when parallel is better:
   ❌ const a = await fetch('/a'); const b = await fetch('/b'); // 2 seconds
   ✅ const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]); // 1 second

4. Using async without await:
   ❌ async function test() { return 42; } // Unnecessary async
   ✅ function test(): number { return 42; }

5. Not typing Promise returns:
   ❌ async function getData(): Promise<any> { ... }
   ✅ async function getData(): Promise<UserData> { ... }
*/

// Example of optimized async patterns
class OptimizedAsyncService {
    // ✅ Proper typing and error handling
    async fetchUserData(id: number): Promise<{ user: User; error?: string }> {
        try {
            const user = await this.validateAndFetchUser(id);
            return { user };
        } catch (error) {
            return { 
                user: { id: 0, name: "", email: "" }, 
                error: error instanceof Error ? error.message : 'Unknown error' 
            };
        }
    }
    
    // ✅ Parallel execution with proper error handling
    async fetchMultipleUsers(ids: number[]): Promise<(User | null)[]> {
        const results = await Promise.allSettled(
            ids.map(id => this.validateAndFetchUser(id))
        );
        
        return results.map(result => 
            result.status === 'fulfilled' ? result.value : null
        );
    }
    
    // ✅ Generator for streaming data
    async* streamUsers(batchSize: number = 10): AsyncGenerator<User[], void, unknown> {
        let page = 1;
        let hasMore = true;
        
        while (hasMore) {
            const users = await this.fetchUserBatch(page, batchSize);
            
            if (users.length === 0) {
                hasMore = false;
            } else {
                yield users;
                page++;
            }
        }
    }
    
    private async validateAndFetchUser(id: number): Promise<User> {
        if (id <= 0) {
            throw new ValidationError("User ID must be positive", "id");
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        return { id, name: `User${id}`, email: `user${id}@example.com` };
    }
    
    private async fetchUserBatch(page: number, size: number): Promise<User[]> {
        // Simulate paginated API
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (page > 3) return []; // No more data
        
        return Array.from({ length: size }, (_, i) => ({
            id: (page - 1) * size + i + 1,
            name: `User${(page - 1) * size + i + 1}`,
            email: `user${(page - 1) * size + i + 1}@example.com`
        }));
    }
}

// Testing optimized patterns
async function testOptimizedPatterns() {
    console.log("=== Testing Optimized Async Patterns ===");
    
    const service = new OptimizedAsyncService();
    
    // Error handling
    const result1 = await service.fetchUserData(1);
    const result2 = await service.fetchUserData(-1);
    console.log("Valid user:", result1);
    console.log("Invalid user:", result2);
    
    // Parallel processing
    const multipleUsers = await service.fetchMultipleUsers([1, 2, -1, 3]);
    console.log("Multiple users:", multipleUsers);
    
    // Streaming data
    console.log("Streaming users:");
    for await (const batch of service.streamUsers(2)) {
        console.log(`Batch: ${batch.map(u => u.name).join(', ')}`);
    }
}

// ===== MAIN EXECUTION =====
async function main() {
    console.log("🚀 Starting Async Functions Demo...\n");
    
    try {
        await testBasicAsync();
        await testPromises();
        await testErrorHandling();
        await testParallelVsSequential();
        await testAsyncGenerators();
        await testRealWorldPatterns();
        await testOptimizedPatterns();
        
        console.log("\n✅ All async function demonstrations completed successfully!");
        
    } catch (error) {
        console.error("❌ Demo failed:", error instanceof Error ? error.message : error);
    }
}

// ===== SUMMARY =====
console.log("\n=== Async Functions Summary ===");
console.log("🎯 ASYNC FUNCTIONS ENABLE:");
console.log("   • Clean asynchronous code with async/await");
console.log("   • Type-safe Promise handling");
console.log("   • Proper error handling with try/catch");
console.log("   • Parallel execution for better performance");
console.log("");
console.log("🔧 KEY PATTERNS:");
console.log("   • async function name(): Promise<Type> { ... }");
console.log("   • await for sequential operations");
console.log("   • Promise.all() for parallel operations");
console.log("   • Promise.allSettled() for mixed results");
console.log("   • try/catch for error handling");
console.log("");
console.log("✅ BEST PRACTICES:");
console.log("   • Always specify return types: Promise<T>");
console.log("   • Use parallel execution when possible");
console.log("   • Handle both success and error cases");
console.log("   • Avoid unnecessary async keywords");
console.log("   • Use proper TypeScript typing throughout");
console.log("");
console.log("🚀 REMEMBER:");
console.log("   • async/await = Cleaner than Promise chains");
console.log("   • TypeScript = Excellent async type safety");
console.log("   • Parallel > Sequential for independent operations");
console.log("   • Essential for modern JavaScript/TypeScript! 🎯");

// Run the demo
main();

export {}; 