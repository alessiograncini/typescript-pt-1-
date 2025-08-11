// ===== ENUMS IN TYPESCRIPT =====
// Enums allow you to define named constants

// ===== NUMERIC ENUMS (DEFAULT) =====
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);  // 1
console.log(Direction.Left);  // 2
console.log(Direction.Right); // 3

// You can also access by value
console.log(Direction[0]); // "Up"
console.log(Direction[1]); // "Down"

// ===== NUMERIC ENUMS WITH CUSTOM VALUES =====
enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log(StatusCode.Success);    // 200
console.log(StatusCode.NotFound);   // 404
console.log(StatusCode[200]);       // "Success"

// ===== AUTO-INCREMENTING FROM CUSTOM START =====
enum Priority {
    Low = 1,    // 1
    Medium,     // 2 (auto-incremented)
    High,       // 3 (auto-incremented)
    Critical    // 4 (auto-incremented)
}

console.log(Priority.Low);      // 1
console.log(Priority.Medium);   // 2
console.log(Priority.High);     // 3
console.log(Priority.Critical); // 4

// ===== STRING ENUMS =====
enum Theme {
    Light = "light",
    Dark = "dark",
    Auto = "auto"
}

enum LogLevel {
    ERROR = "error",
    WARN = "warn", 
    INFO = "info",
    DEBUG = "debug"
}

console.log(Theme.Dark);        // "dark"
console.log(LogLevel.ERROR);    // "error"

// ===== MIXED ENUMS (NOT RECOMMENDED) =====
enum Mixed {
    No = 0,
    Yes = "yes"
}

console.log(Mixed.No);  // 0
console.log(Mixed.Yes); // "yes"

// ===== COMPUTED ENUMS =====
enum FileAccess {
    None,
    Read = 1 << 1,     // 2
    Write = 1 << 2,    // 4
    ReadWrite = Read | Write  // 6
}

console.log(FileAccess.None);      // 0
console.log(FileAccess.Read);      // 2
console.log(FileAccess.Write);     // 4
console.log(FileAccess.ReadWrite); // 6

// ===== CONST ENUMS =====
const enum Colors {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// Const enums are inlined at compile time
let favoriteColor = Colors.Red; // Becomes "red" in compiled JS

// ===== REVERSE MAPPING (NUMERIC ENUMS ONLY) =====
enum Animal {
    Cat,
    Dog,
    Bird
}

console.log(Animal.Cat);    // 0
console.log(Animal[0]);     // "Cat"
console.log(Animal.Dog);    // 1
console.log(Animal[1]);     // "Dog"

// String enums don't have reverse mapping
// console.log(Theme["dark"]); // ❌ Error

// ===== ENUMS IN FUNCTIONS =====
function move(direction: Direction): string {
    switch (direction) {
        case Direction.Up:
            return "Moving up";
        case Direction.Down:
            return "Moving down";
        case Direction.Left:
            return "Moving left";
        case Direction.Right:
            return "Moving right";
        default:
            return "Invalid direction";
    }
}

console.log(move(Direction.Up));    // "Moving up"
console.log(move(Direction.Right)); // "Moving right"

function logMessage(level: LogLevel, message: string): void {
    console.log(`[${level.toUpperCase()}] ${message}`);
}

logMessage(LogLevel.ERROR, "Something went wrong!");
logMessage(LogLevel.INFO, "Application started");

// ===== ENUM VALUES AS OBJECT KEYS =====
const config = {
    [Theme.Light]: {
        background: "#ffffff",
        text: "#000000"
    },
    [Theme.Dark]: {
        background: "#000000", 
        text: "#ffffff"
    }
};

console.log(config[Theme.Dark]); // { background: "#000000", text: "#ffffff" }

// ===== CHECKING ENUM VALUES =====
function isValidDirection(value: any): value is Direction {
    return Object.values(Direction).includes(value);
}

function isValidTheme(value: string): value is Theme {
    return Object.values(Theme).includes(value as Theme);
}

console.log(isValidDirection(0));        // true (Direction.Up)
console.log(isValidDirection(5));        // false
console.log(isValidTheme("dark"));       // true
console.log(isValidTheme("purple"));     // false

// ===== ENUM UTILITIES =====
function getEnumKeys<T extends Record<string, string | number>>(enumObject: T): (keyof T)[] {
    return Object.keys(enumObject) as (keyof T)[];
}

function getEnumValues<T extends Record<string, string | number>>(enumObject: T): (string | number)[] {
    return Object.values(enumObject);
}

console.log("Direction keys:", getEnumKeys(Direction));   // ["Up", "Down", "Left", "Right", "0", "1", "2", "3"]
console.log("Theme values:", getEnumValues(Theme));       // ["light", "dark", "auto"]

// ===== PRACTICAL EXAMPLES =====

// 1. API Response Status
enum ApiStatus {
    LOADING = "loading",
    SUCCESS = "success", 
    ERROR = "error"
}

interface ApiResponse<T> {
    status: ApiStatus;
    data?: T;
    error?: string;
}

function handleApiResponse<T>(response: ApiResponse<T>): void {
    switch (response.status) {
        case ApiStatus.LOADING:
            console.log("Loading...");
            break;
        case ApiStatus.SUCCESS:
            console.log("Data:", response.data);
            break;
        case ApiStatus.ERROR:
            console.log("Error:", response.error);
            break;
    }
}

// 2. User Roles
enum UserRole {
    ADMIN = "admin",
    USER = "user", 
    MODERATOR = "moderator",
    GUEST = "guest"
}

function hasPermission(userRole: UserRole, action: string): boolean {
    switch (userRole) {
        case UserRole.ADMIN:
            return true; // Admin can do everything
        case UserRole.MODERATOR:
            return ["edit", "delete", "view"].includes(action);
        case UserRole.USER:
            return ["view", "create"].includes(action);
        case UserRole.GUEST:
            return action === "view";
        default:
            return false;
    }
}

console.log(hasPermission(UserRole.ADMIN, "delete"));     // true
console.log(hasPermission(UserRole.USER, "delete"));      // false
console.log(hasPermission(UserRole.GUEST, "view"));       // true

// 3. HTTP Methods
enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

function makeRequest(url: string, method: HttpMethod, data?: any): string {
    return `${method} request to ${url}` + (data ? ` with data: ${JSON.stringify(data)}` : "");
}

console.log(makeRequest("/users", HttpMethod.GET));
console.log(makeRequest("/users", HttpMethod.POST, { name: "John" }));

// 4. Game States
enum GameState {
    MENU,
    PLAYING,
    PAUSED,
    GAME_OVER
}

class Game {
    private state: GameState = GameState.MENU;

    start(): void {
        if (this.state === GameState.MENU) {
            this.state = GameState.PLAYING;
            console.log("Game started!");
        }
    }

    pause(): void {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
            console.log("Game paused");
        }
    }

    resume(): void {
        if (this.state === GameState.PAUSED) {
            this.state = GameState.PLAYING;
            console.log("Game resumed");
        }
    }

    getCurrentState(): string {
        return GameState[this.state];
    }
}

// ===== ENUM VS UNION TYPES =====
console.log("\n=== Enum vs Union Types ===");

// Enum approach
enum Size {
    Small = "small",
    Medium = "medium", 
    Large = "large"
}

// Union type approach
type SizeUnion = "small" | "medium" | "large";

// Both work similarly:
function createButton1(size: Size): string {
    return `Button size: ${size}`;
}

function createButton2(size: SizeUnion): string {
    return `Button size: ${size}`;
}

console.log(createButton1(Size.Large));        // Works
console.log(createButton2("large"));           // Works

// ===== WHEN TO USE ENUMS =====
console.log("\n=== When to use Enums ===");
console.log("✅ Related constants that belong together");
console.log("✅ When you need reverse mapping (numeric enums)");
console.log("✅ When values might change but names stay the same");
console.log("✅ Better intellisense and autocompletion");
console.log("❌ Simple boolean flags (use boolean instead)");
console.log("❌ When union types are simpler");

console.log("Enums provide organized constants! 📋");

export {}; 