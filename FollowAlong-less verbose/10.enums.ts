// ===== ENUMS =====

// Numeric enums (default)
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);  // 1

// Numeric enums with custom values
enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log(StatusCode.Success);    // 200
console.log(StatusCode.NotFound);   // 404

// String enums
enum Status {
    Loading = "loading",
    Success = "success",
    Error = "error"
}

let currentStatus = Status.Loading;
console.log(currentStatus); // "loading"

// Mixed enums
enum Response {
    No = 0,
    Yes = 1,
    Maybe = "maybe"
}

// Enums in functions
function handleStatus(status: Status): string {
    switch (status) {
        case Status.Loading:
            return "Loading...";
        case Status.Success:
            return "Done!";
        case Status.Error:
            return "Failed!";
        default:
            return "Unknown";
    }
}

// Const enums (compile-time optimization)
const enum Colors {
    Red = "red",
    Green = "green", 
    Blue = "blue"
}

let favoriteColor = Colors.Blue;

// Testing
console.log(handleStatus(Status.Success)); // "Done!"
console.log("Favorite color:", favoriteColor);

export {};