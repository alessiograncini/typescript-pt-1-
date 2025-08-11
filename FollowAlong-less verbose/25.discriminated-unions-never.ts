// Discriminated unions and never type: type-safe state management with exhaustiveness checking

// Basic discriminated union
interface LoadingState {
    status: "loading";
    progress: number;
}

interface SuccessState {
    status: "success";
    data: any;
    timestamp: Date;
}

interface ErrorState {
    status: "error";
    error: string;
    code: number;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): string {
    switch (state.status) {
        case "loading":
            return `Loading: ${state.progress}%`;
        
        case "success":
            return `Success: ${JSON.stringify(state.data)}`;
        
        case "error":
            return `Error ${state.code}: ${state.error}`;
        
        default:
            // Exhaustiveness check with never
            const exhaustiveCheck: never = state;
            throw new Error(`Unhandled state: ${exhaustiveCheck}`);
    }
}

const loadingState: LoadingState = { status: "loading", progress: 45 };
const successState: SuccessState = { status: "success", data: { users: [1, 2, 3] }, timestamp: new Date() };
const errorState: ErrorState = { status: "error", error: "Network timeout", code: 408 };

console.log(handleApiState(loadingState));
console.log(handleApiState(successState));
console.log(handleApiState(errorState));

// Shape discriminated union
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

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        
        case "rectangle":
            return shape.width * shape.height;
        
        case "circle":
            return Math.PI * shape.radius * shape.radius;
        
        default:
            const exhaustiveCheck: never = shape;
            throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
    }
}

const square: Square = { kind: "square", size: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(`Square area: ${calculateArea(square)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);
console.log(`Circle area: ${calculateArea(circle).toFixed(2)}`);

// Event system with discriminated unions
interface UserEvent {
    type: "user";
    action: "login" | "logout" | "update";
    userId: number;
    timestamp: Date;
}

interface SystemEvent {
    type: "system";
    level: "info" | "warning" | "error";
    message: string;
    component: string;
}

interface PaymentEvent {
    type: "payment";
    operation: "charge" | "refund";
    amount: number;
    currency: string;
}

type AppEvent = UserEvent | SystemEvent | PaymentEvent;

function processEvent(event: AppEvent): string {
    switch (event.type) {
        case "user":
            switch (event.action) {
                case "login":
                    return `User ${event.userId} logged in`;
                case "logout":
                    return `User ${event.userId} logged out`;
                case "update":
                    return `User ${event.userId} profile updated`;
                default:
                    const userExhaustive: never = event.action;
                    throw new Error(`Unhandled user action: ${userExhaustive}`);
            }
        
        case "system":
            const emoji = event.level === "error" ? "❌" : event.level === "warning" ? "⚠️" : "ℹ️";
            return `${emoji} System ${event.level}: ${event.message}`;
        
        case "payment":
            const operationEmoji = event.operation === "charge" ? "💳" : "💰";
            return `${operationEmoji} Payment ${event.operation}: ${event.amount} ${event.currency}`;
        
        default:
            const exhaustiveCheck: never = event;
            throw new Error(`Unhandled event type: ${exhaustiveCheck}`);
    }
}

const userLogin: UserEvent = {
    type: "user",
    action: "login",
    userId: 123,
    timestamp: new Date()
};

const systemError: SystemEvent = {
    type: "system",
    level: "error",
    message: "Database connection failed",
    component: "auth-service"
};

const paymentCharge: PaymentEvent = {
    type: "payment",
    operation: "charge",
    amount: 99.99,
    currency: "USD"
};

console.log(processEvent(userLogin));
console.log(processEvent(systemError));
console.log(processEvent(paymentCharge));

// Redux-style action patterns
interface LoadUsersAction {
    type: "LOAD_USERS";
    payload: {
        page: number;
        limit: number;
    };
}

interface LoadUsersSuccessAction {
    type: "LOAD_USERS_SUCCESS";
    payload: {
        users: Array<{ id: number; name: string }>;
        total: number;
    };
}

interface LoadUsersErrorAction {
    type: "LOAD_USERS_ERROR";
    payload: {
        error: string;
    };
}

type UserAction = LoadUsersAction | LoadUsersSuccessAction | LoadUsersErrorAction;

interface UserState {
    users: Array<{ id: number; name: string }>;
    loading: boolean;
    error: string | null;
}

function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case "LOAD_USERS":
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case "LOAD_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload.users
            };
        
        case "LOAD_USERS_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        
        default:
            const exhaustiveCheck: never = action;
            throw new Error(`Unhandled action: ${exhaustiveCheck}`);
    }
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

let currentState = initialState;
currentState = userReducer(currentState, {
    type: "LOAD_USERS",
    payload: { page: 1, limit: 10 }
});

console.log("Loading state:", currentState.loading);

currentState = userReducer(currentState, {
    type: "LOAD_USERS_SUCCESS",
    payload: {
        users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
        total: 25
    }
});

console.log("Users loaded:", currentState.users.length);

// Result type pattern
interface Success<T> {
    kind: "success";
    data: T;
}

interface Failure<E> {
    kind: "failure";
    error: E;
}

type Result<T, E = string> = Success<T> | Failure<E>;

const createSuccess = <T>(data: T): Success<T> => ({ kind: "success", data });
const createFailure = <E>(error: E): Failure<E> => ({ kind: "failure", error });

function parseNumber(input: string): Result<number, string> {
    const num = Number(input);
    if (isNaN(num)) {
        return createFailure(`"${input}" is not a valid number`);
    }
    return createSuccess(num);
}

function handleResult<T, E>(result: Result<T, E>): string {
    switch (result.kind) {
        case "success":
            return `Success: ${JSON.stringify(result.data)}`;
        
        case "failure":
            return `Failure: ${result.error}`;
        
        default:
            const exhaustiveCheck: never = result;
            throw new Error(`Unhandled result: ${exhaustiveCheck}`);
    }
}

console.log(handleResult(parseNumber("123")));
console.log(handleResult(parseNumber("invalid")));

// Complex discriminated union with nesting
interface TextContent {
    type: "text";
    content: string;
    formatting: {
        bold: boolean;
        italic: boolean;
    };
}

interface ImageContent {
    type: "image";
    src: string;
    alt: string;
}

interface VideoContent {
    type: "video";
    src: string;
    duration: number;
}

type Content = TextContent | ImageContent | VideoContent;

interface ParagraphBlock {
    blockType: "paragraph";
    content: TextContent[];
}

interface MediaBlock {
    blockType: "media";
    content: ImageContent | VideoContent;
}

type Block = ParagraphBlock | MediaBlock;

function renderContent(content: Content): string {
    switch (content.type) {
        case "text":
            let text = content.content;
            if (content.formatting.bold) text = `**${text}**`;
            if (content.formatting.italic) text = `*${text}*`;
            return text;
        
        case "image":
            return `![${content.alt}](${content.src})`;
        
        case "video":
            return `Video: ${content.src} (${content.duration}s)`;
        
        default:
            const exhaustiveCheck: never = content;
            throw new Error(`Unhandled content type: ${exhaustiveCheck}`);
    }
}

function renderBlock(block: Block): string {
    switch (block.blockType) {
        case "paragraph":
            const textElements = block.content.map(renderContent).join(' ');
            return `<p>${textElements}</p>`;
        
        case "media":
            switch (block.content.type) {
                case "image":
                    return `<img src="${block.content.src}" alt="${block.content.alt}">`;
                case "video":
                    return `<video src="${block.content.src}"></video>`;
                default:
                    const mediaExhaustive: never = block.content;
                    throw new Error(`Unhandled media type: ${mediaExhaustive}`);
            }
        
        default:
            const exhaustiveCheck: never = block;
            throw new Error(`Unhandled block type: ${exhaustiveCheck}`);
    }
}

const textContent: TextContent = {
    type: "text",
    content: "Hello World",
    formatting: { bold: true, italic: false }
};

const imageContent: ImageContent = {
    type: "image",
    src: "image.jpg",
    alt: "Sample image"
};

const paragraphBlock: ParagraphBlock = {
    blockType: "paragraph",
    content: [textContent]
};

const mediaBlock: MediaBlock = {
    blockType: "media",
    content: imageContent
};

console.log(renderContent(textContent));
console.log(renderBlock(paragraphBlock));
console.log(renderBlock(mediaBlock));

// Never type examples
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // This function never returns
    }
}

// Never in exhaustiveness checking ensures compile-time safety
function processMessage(message: { type: "info" } | { type: "warning" }): string {
    switch (message.type) {
        case "info":
            return "Information message";
        case "warning":
            return "Warning message";
        default:
            // If we add a new message type and forget to handle it,
            // TypeScript will error here because message won't be never
            const exhaustiveCheck: never = message;
            throw new Error(`Unhandled message type: ${exhaustiveCheck}`);
    }
}

// Summary: Discriminated unions with never type provide type-safe, exhaustive pattern matching

export {};