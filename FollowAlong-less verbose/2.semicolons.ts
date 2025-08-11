let withSemicolon = "Hello";
let withoutSemicolon = "World"

function demo() {
    console.log("Works")
}

const obj = { name: "Alice", age: 30 }
const arr = [1, 2, 3]

const dangerous1 = [1, 2, 3];
[4, 5, 6]

const func = (() => "result")();
(() => "another")()

function returnObject() {
    return {
        name: "John"
    }
}

interface User {
    name: string
    age: number
}

type Status = "loading" | "success"

export {};