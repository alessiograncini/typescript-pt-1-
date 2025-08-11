// ===== GENERICS WITH ARRAYS AND ARROW FUNCTIONS =====
// Understanding the tricky syntax and best practices

// ===== THE TRICKY PARTS =====
console.log("=== The Tricky Parts of Generics with Arrays and Arrow Functions ===");

/*
🚨 WHY GENERICS + ARRAYS + ARROWS ARE TRICKY:

1. 🔀  CONFUSING SYNTAX - Multiple angle brackets and symbols
2. 📝  JSX CONFLICTS - <T> looks like JSX tags in .tsx files
3. 🎯  TYPE INFERENCE ISSUES - TypeScript sometimes can't figure out types
4. 🔧  CONSTRAINT SYNTAX - extends keyword gets complex with arrows
5. ⚡  READABILITY - Hard to parse visually

EXAMPLES OF CONFUSING CODE:
❌ const func = <T>(arr: T[]) => arr[0];                    // Looks like JSX!
❌ const func = <T extends string[]>(arr: T) => arr.length; // What does this do?
❌ const func = <T,>(arr: T[]) => arr.map(x => x);          // Why the comma?

Let's break down ALL the tricky cases and make them crystal clear! 🎯
*/

// ===== BASIC GENERIC ARROW FUNCTIONS WITH ARRAYS =====
console.log("\n=== Basic Generic Arrow Functions with Arrays ===");

// ✅ CLEAR WAY: Regular function (easy to read)
function getFirstItemFunction<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[0] : undefined;
}

// 🤔 TRICKY WAY: Arrow function (confusing syntax)
const getFirstItemArrow = <T>(array: T[]): T | undefined => {
    return array.length > 0 ? array[0] : undefined;
};

// 🚨 PROBLEM IN JSX FILES: This looks like JSX tag!
// const getFirstItemArrow = <T>(array: T[]) => array[0];  // Looks like <T> tag!

// ✅ SOLUTION: Add comma to disambiguate from JSX
const getFirstItemArrowJSX = <T,>(array: T[]): T | undefined => {
    return array.length > 0 ? array[0] : undefined;
};

// Testing all three approaches
const numbers = [1, 2, 3, 4, 5];
const strings = ["hello", "world", "typescript"];
const booleans = [true, false, true];

console.log("Function approach:", getFirstItemFunction(numbers));      // 1
console.log("Arrow approach:", getFirstItemArrow(strings));            // "hello"
console.log("JSX-safe approach:", getFirstItemArrowJSX(booleans));     // true

// ===== GENERIC ARROW FUNCTIONS: SIMPLE TO COMPLEX =====
console.log("\n=== Generic Arrow Functions: Simple to Complex ===");

// 1️⃣ SIMPLE: One type parameter
const identity = <T>(value: T): T => value;

// 2️⃣ SIMPLE WITH ARRAY: One type, array input
const getLastItem = <T>(array: T[]): T | undefined => {
    return array.length > 0 ? array[array.length - 1] : undefined;
};

// 3️⃣ MULTIPLE TYPE PARAMETERS: Two types
const combineTwoArrays = <T, U>(arr1: T[], arr2: U[]): (T | U)[] => {
    return [...arr1, ...arr2];
};

// 4️⃣ WITH CONSTRAINTS: Type must extend something
const getArrayLength = <T extends readonly unknown[]>(array: T): number => {
    return array.length;
};

// 5️⃣ COMPLEX CONSTRAINTS: Multiple constraints
const processArrayOfObjects = <T extends { id: number }>(
    array: T[]
): T | undefined => {
    return array.find(item => item.id > 0);
};

// 6️⃣ VERY COMPLEX: Conditional return types
const processArray = <T>(
    array: T[]
): T extends string ? string[] : T extends number ? number[] : T[] => {
    return array as any; // Simplified for demo
};

// Testing the complexity levels
console.log("Identity:", identity(42));
console.log("Last item:", getLastItem(["a", "b", "c"]));
console.log("Combined arrays:", combineTwoArrays([1, 2], ["a", "b"]));
console.log("Array length:", getArrayLength([1, 2, 3, 4]));

const objectsArray = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
console.log("Processed objects:", processArrayOfObjects(objectsArray));

// ===== JSX DISAMBIGUATION TECHNIQUES =====
console.log("\n=== JSX Disambiguation Techniques ===");

/*
🚨 THE JSX PROBLEM:
In .tsx files, <T> looks like a JSX element opening tag!
TypeScript can't tell if you mean a generic or JSX.

❌ PROBLEMATIC:
const func = <T>(param: T) => param;  // Looks like <T> JSX tag!

✅ SOLUTIONS:
*/

// SOLUTION 1: Add trailing comma
const solution1 = <T,>(param: T): T => param;

// SOLUTION 2: Add constraint (even empty one)
const solution2 = <T extends unknown>(param: T): T => param;

// SOLUTION 3: Add default type
const solution3 = <T = unknown>(param: T): T => param;

// SOLUTION 4: Use multiple type parameters (automatic disambiguation)
const solution4 = <T, U = T>(param: T): T => param;

// SOLUTION 5: Use regular function instead
function solution5<T>(param: T): T {
    return param;
}

// All solutions work the same way
console.log("Solution 1:", solution1("test"));
console.log("Solution 2:", solution2(123));
console.log("Solution 3:", solution3(true));
console.log("Solution 4:", solution4([1, 2, 3]));
console.log("Solution 5:", solution5({ name: "Alice" }));

// ===== ARRAY MANIPULATION WITH GENERICS =====
console.log("\n=== Array Manipulation with Generics ===");

// 🔧 COMMON ARRAY OPERATIONS WITH GENERIC ARROWS

// Map operation - transform array elements
const mapArray = <T, U>(array: T[], transform: (item: T) => U): U[] => {
    return array.map(transform);
};

// Filter operation - keep elements that match predicate
const filterArray = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
    return array.filter(predicate);
};

// Reduce operation - accumulate array into single value
const reduceArray = <T, U>(
    array: T[],
    reducer: (acc: U, current: T) => U,
    initialValue: U
): U => {
    return array.reduce(reducer, initialValue);
};

// Find operation - get first matching element
const findInArray = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
    return array.find(predicate);
};

// Chunk operation - split array into smaller arrays
const chunkArray = <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

// Flatten operation - flatten nested arrays
const flattenArray = <T>(array: T[][]): T[] => {
    return array.flat();
};

// Usage examples
const numbersArray = [1, 2, 3, 4, 5];
const stringsArray = ["hello", "world", "typescript", "generics"];

// Map: numbers to strings
const numberStrings = mapArray(numbersArray, num => `Number: ${num}`);
console.log("Mapped numbers:", numberStrings);

// Filter: only even numbers
const evenNumbers = filterArray(numbersArray, num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Reduce: sum all numbers
const sum = reduceArray(numbersArray, (acc, num) => acc + num, 0);
console.log("Sum:", sum);

// Find: first number > 3
const bigNumber = findInArray(numbersArray, num => num > 3);
console.log("First big number:", bigNumber);

// Chunk: split into groups of 2
const chunkedNumbers = chunkArray(numbersArray, 2);
console.log("Chunked numbers:", chunkedNumbers);

// Flatten: nested arrays
const nestedArrays = [[1, 2], [3, 4], [5]];
const flattened = flattenArray(nestedArrays);
console.log("Flattened:", flattened);

// ===== COMPLEX GENERIC ARRAY PATTERNS =====
console.log("\n=== Complex Generic Array Patterns ===");

// 🚀 ADVANCED PATTERNS WITH ARRAYS AND GENERICS

// Pattern 1: Array transformation with type safety
const transformArrayWithIndex = <T, U>(
    array: T[],
    transformer: (item: T, index: number, array: T[]) => U
): U[] => {
    return array.map(transformer);
};

// Pattern 2: Array grouping by key
const groupArrayBy = <T, K extends string | number | symbol>(
    array: T[],
    keySelector: (item: T) => K
): Record<K, T[]> => {
    return array.reduce((groups, item) => {
        const key = keySelector(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {} as Record<K, T[]>);
};

// Pattern 3: Array sorting with multiple keys
const sortArrayBy = <T>(
    array: T[],
    ...selectors: ((item: T) => string | number)[]
): T[] => {
    return [...array].sort((a, b) => {
        for (const selector of selectors) {
            const aVal = selector(a);
            const bVal = selector(b);
            if (aVal < bVal) return -1;
            if (aVal > bVal) return 1;
        }
        return 0;
    });
};

// Pattern 4: Array unique values with custom equality
const uniqueArray = <T>(
    array: T[],
    equalityCheck?: (a: T, b: T) => boolean
): T[] => {
    if (!equalityCheck) {
        return [...new Set(array)]; // Simple unique for primitives
    }
    
    return array.filter((item, index) => {
        return !array.slice(0, index).some(prevItem => equalityCheck(item, prevItem));
    });
};

// Pattern 5: Array intersection and difference
const arrayIntersection = <T>(array1: T[], array2: T[]): T[] => {
    return array1.filter(item => array2.includes(item));
};

const arrayDifference = <T>(array1: T[], array2: T[]): T[] => {
    return array1.filter(item => !array2.includes(item));
};

// Testing complex patterns
interface User {
    id: number;
    name: string;
    age: number;
    department: string;
}

const users: User[] = [
    { id: 1, name: "Alice", age: 25, department: "Engineering" },
    { id: 2, name: "Bob", age: 30, department: "Marketing" },
    { id: 3, name: "Charlie", age: 25, department: "Engineering" },
    { id: 4, name: "Diana", age: 28, department: "Marketing" }
];

// Transform with index
const usersWithIndex = transformArrayWithIndex(users, (user, index) => ({
    ...user,
    displayName: `${index + 1}. ${user.name}`
}));
console.log("Users with index:", usersWithIndex);

// Group by department
const usersByDepartment = groupArrayBy(users, user => user.department);
console.log("Users by department:", usersByDepartment);

// Sort by age, then name
const sortedUsers = sortArrayBy(users, user => user.age, user => user.name);
console.log("Sorted users:", sortedUsers);

// Unique ages
const uniqueAges = uniqueArray(users.map(u => u.age));
console.log("Unique ages:", uniqueAges);

// Array operations
const engineeringUsers = users.filter(u => u.department === "Engineering");
const marketingUsers = users.filter(u => u.department === "Marketing");
const commonAges = arrayIntersection(
    engineeringUsers.map(u => u.age),
    marketingUsers.map(u => u.age)
);
console.log("Common ages between departments:", commonAges);

// ===== ASYNC ARRAY OPERATIONS WITH GENERICS =====
console.log("\n=== Async Array Operations with Generics ===");

// 🔄 ASYNCHRONOUS ARRAY PROCESSING

// Async map - process all items in parallel
const asyncMap = async <T, U>(
    array: T[],
    asyncTransform: (item: T) => Promise<U>
): Promise<U[]> => {
    return Promise.all(array.map(asyncTransform));
};

// Async filter - filter with async predicate
const asyncFilter = async <T>(
    array: T[],
    asyncPredicate: (item: T) => Promise<boolean>
): Promise<T[]> => {
    const results = await Promise.all(
        array.map(async (item) => ({
            item,
            keep: await asyncPredicate(item)
        }))
    );
    return results.filter(result => result.keep).map(result => result.item);
};

// Async reduce - accumulate with async operation
const asyncReduce = async <T, U>(
    array: T[],
    asyncReducer: (acc: U, current: T) => Promise<U>,
    initialValue: U
): Promise<U> => {
    let accumulator = initialValue;
    for (const item of array) {
        accumulator = await asyncReducer(accumulator, item);
    }
    return accumulator;
};

// Sequential async map - process items one by one
const sequentialAsyncMap = async <T, U>(
    array: T[],
    asyncTransform: (item: T) => Promise<U>
): Promise<U[]> => {
    const results: U[] = [];
    for (const item of array) {
        results.push(await asyncTransform(item));
    }
    return results;
};

// Simulated async operations
const simulateApiCall = async (id: number): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
    return `API-Response-${id}`;
};

const simulateValidation = async (value: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return value.length > 5;
};

// Demo async operations
async function demonstrateAsyncArrays() {
    const ids = [1, 2, 3, 4, 5];
    
    // Parallel async map
    console.log("Starting parallel async map...");
    const apiResponses = await asyncMap(ids, simulateApiCall);
    console.log("API responses:", apiResponses);
    
    // Async filter
    console.log("Starting async filter...");
    const validResponses = await asyncFilter(apiResponses, simulateValidation);
    console.log("Valid responses:", validResponses);
    
    // Async reduce
    console.log("Starting async reduce...");
    const concatenated = await asyncReduce(
        validResponses,
        async (acc, current) => {
            await new Promise(resolve => setTimeout(resolve, 10));
            return acc + " | " + current;
        },
        "Results:"
    );
    console.log("Concatenated result:", concatenated);
    
    // Sequential processing
    console.log("Starting sequential async map...");
    const sequentialResults = await sequentialAsyncMap(
        [1, 2, 3],
        async (id) => {
            console.log(`Processing ${id}...`);
            return await simulateApiCall(id);
        }
    );
    console.log("Sequential results:", sequentialResults);
}

demonstrateAsyncArrays();

// ===== FUNCTIONAL PROGRAMMING WITH GENERIC ARRAYS =====
console.log("\n=== Functional Programming with Generic Arrays ===");

// 🔗 FUNCTIONAL COMPOSITION WITH GENERICS

// Pipe function - compose operations left to right
const pipe = <T>(initial: T) => ({
    map: <U>(fn: (value: T) => U) => pipe(fn(initial)),
    filter: (predicate: (value: T) => boolean) => 
        pipe(predicate(initial) ? initial : null as any),
    tap: (sideEffect: (value: T) => void) => {
        sideEffect(initial);
        return pipe(initial);
    },
    value: () => initial
});

// Array pipe operations
const arrayPipe = <T>(array: T[]) => ({
    map: <U>(transform: (item: T) => U) => arrayPipe(array.map(transform)),
    filter: (predicate: (item: T) => boolean) => arrayPipe(array.filter(predicate)),
    reduce: <U>(reducer: (acc: U, current: T) => U, initial: U): U => 
        array.reduce(reducer, initial),
    sort: (compareFn?: (a: T, b: T) => number) => arrayPipe([...array].sort(compareFn)),
    take: (count: number) => arrayPipe(array.slice(0, count)),
    skip: (count: number) => arrayPipe(array.slice(count)),
    tap: (sideEffect: (array: T[]) => void) => {
        sideEffect(array);
        return arrayPipe(array);
    },
    value: () => array
});

// Curried functions for better composition
const curry2 = <T, U, R>(fn: (a: T, b: U) => R) => 
    (a: T) => (b: U) => fn(a, b);

const curry3 = <T, U, V, R>(fn: (a: T, b: U, c: V) => R) => 
    (a: T) => (b: U) => (c: V) => fn(a, b, c);

// Curried array operations
const add = curry2((a: number, b: number) => a + b);
const multiply = curry2((a: number, b: number) => a * b);
const isGreaterThan = curry2((threshold: number, value: number) => value > threshold);

// Functional pipeline example
const testNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const functionalResult = arrayPipe(testNumbers)
    .filter(isGreaterThan(3))           // Keep numbers > 3
    .map(multiply(2))                   // Multiply by 2
    .map(add(1))                        // Add 1
    .take(3)                            // Take first 3
    .tap(arr => console.log("Intermediate result:", arr))
    .sort((a, b) => b - a)              // Sort descending
    .value();

console.log("Final functional result:", functionalResult);

// ===== BEST PRACTICES AND COMMON PITFALLS =====
console.log("\n=== Best Practices and Common Pitfalls ===");

/*
✅ BEST PRACTICES FOR GENERICS + ARRAYS + ARROWS:

1. 🎯  USE TRAILING COMMA IN JSX FILES
   const func = <T,>(array: T[]) => ...

2. 📝  PREFER MEANINGFUL TYPE NAMES
   ❌ const func = <T, U, V>(...)
   ✅ const func = <TInput, TOutput, TKey>(...)

3. 🔧  ADD CONSTRAINTS WHEN ACCESSING PROPERTIES
   ❌ const func = <T>(arr: T[]) => arr[0].length  // Error!
   ✅ const func = <T extends { length: number }>(arr: T[]) => arr[0].length

4. ⚡  LET TYPESCRIPT INFER WHEN POSSIBLE
   ❌ const nums = mapArray<number, string>(numbers, n => String(n))
   ✅ const nums = mapArray(numbers, n => String(n))  // TS infers types

5. 🛡️  USE READONLY FOR IMMUTABLE OPERATIONS
   const func = <T>(array: readonly T[]): T[] => [...array]

6. 📚  DOCUMENT COMPLEX GENERIC FUNCTIONS
   /**
    * Maps array elements with access to index and original array
    * @param array - The input array
    * @param transformer - Function that transforms each element
    * @returns New array with transformed elements
    */

/*
❌ COMMON PITFALLS:

1. JSX Confusion:
   ❌ const func = <T>(arr: T[]) => ...     // Looks like JSX!
   ✅ const func = <T,>(arr: T[]) => ...    // Clear it's generic

2. Over-constraining:
   ❌ const func = <T extends string | number>(arr: T[]) => ...
   ✅ const func = <T>(arr: T[]) => ...     // Let caller decide

3. Under-constraining:
   ❌ const func = <T>(arr: T[]) => arr[0].toUpperCase()  // Error if T isn't string!
   ✅ const func = <T extends string>(arr: T[]) => arr[0].toUpperCase()

4. Type Assertion Abuse:
   ❌ const func = <T>(arr: any[]) => arr as T[]
   ✅ const func = <T>(arr: T[]) => arr

5. Ignoring Return Types:
   ❌ const func = <T>(arr: T[]) => arr.map(x => String(x))  // Returns string[], not T[]
   ✅ const func = <T>(arr: T[]): string[] => arr.map(x => String(x))
*/

// Examples of good practices
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

// ✅ Well-designed generic array function
const processProducts = <TResult>(
    products: readonly Product[],
    processor: (product: Product) => TResult
): TResult[] => {
    return products.map(processor);
};

// ✅ Generic array function with constraints
const sortByProperty = <T, K extends keyof T>(
    array: readonly T[],
    property: K,
    direction: 'asc' | 'desc' = 'asc'
): T[] => {
    return [...array].sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// ✅ Generic array function with multiple constraints
const groupAndSort = <T, K extends string | number>(
    array: readonly T[],
    groupBy: (item: T) => K,
    sortBy: (item: T) => string | number
): Record<K, T[]> => {
    const grouped = groupArrayBy([...array], groupBy);
    
    // Sort each group
    Object.keys(grouped).forEach(key => {
        grouped[key as K] = grouped[key as K].sort((a, b) => {
            const aVal = sortBy(a);
            const bVal = sortBy(b);
            return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        });
    });
    
    return grouped;
};

// Usage examples
const products: Product[] = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics" },
    { id: 2, name: "Book", price: 20, category: "Education" },
    { id: 3, name: "Phone", price: 599, category: "Electronics" },
    { id: 4, name: "Pen", price: 2, category: "Education" }
];

const productNames = processProducts(products, p => p.name);
console.log("Product names:", productNames);

const sortedByPrice = sortByProperty(products, "price", "desc");
console.log("Sorted by price:", sortedByPrice);

const groupedProducts = groupAndSort(
    products,
    p => p.category,
    p => p.price
);
console.log("Grouped and sorted:", groupedProducts);

// ===== SUMMARY =====
console.log("\n=== Generics + Arrays + Arrows Summary ===");
console.log("🎯 KEY TAKEAWAYS:");
console.log("   • Use trailing comma <T,> to disambiguate from JSX");
console.log("   • Add constraints when accessing properties: <T extends HasLength>");
console.log("   • Let TypeScript infer types when possible");
console.log("   • Use readonly for immutable operations");
console.log("   • Prefer meaningful type names: <TInput, TOutput>");
console.log("");
console.log("⚡ ADVANCED PATTERNS:");
console.log("   • Async array operations with Promise.all()");
console.log("   • Functional composition with pipe operations");
console.log("   • Complex array transformations with type safety");
console.log("   • Generic repository patterns for data access");
console.log("");
console.log("✅ REMEMBER:");
console.log("   • Generics + Arrays + Arrows = Powerful but tricky syntax");
console.log("   • Focus on readability and type safety");
console.log("   • Use constraints to enable property access");
console.log("   • Document complex generic functions clearly");
console.log("   • Practice makes perfect! 🚀");

export {}; 