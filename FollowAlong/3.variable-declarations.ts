// ===== VARIABLE DECLARATIONS =====
// TypeScript (and modern JavaScript) has three ways to declare variables:

// ===== VAR (OLD WAY - HAS ISSUES) =====
var oldStyle = "This is the old way";
var oldStyle = "Can be redeclared"; // This is allowed but problematic
// var has function scope, not block scope
function varExample() {
    if (true) {
        var functionScoped = "I'm accessible outside this block";
    }
    console.log(functionScoped); // This works! (but it shouldn't logically)
}

// ===== LET (MODERN WAY - BLOCK SCOPED) =====
let modernStyle = "This is the modern way";
// let modernStyle = "Cannot be redeclared"; // This would cause an error
// let has block scope
function letExample() {
    if (true) {
        let blockScoped = "I'm only accessible within this block";
    }
    // console.log(blockScoped); // This would cause an error - blockScoped is not defined
}

// ===== CONST (FOR CONSTANTS - CANNOT BE REASSIGNED) =====
const constant = "This cannot be changed";
// constant = "This would cause an error"; // TypeError: Assignment to constant variable

// However, const objects/arrays can still be mutated:
const mutableObject: { name: string; age?: number } = { name: "John" };
mutableObject.name = "Jane"; // This is allowed
mutableObject.age = 30; // This is allowed

const mutableArray = [1, 2, 3];
mutableArray.push(4); // This is allowed
// mutableArray = [5, 6, 7]; // This would cause an error

// ===== WHY USE LET? =====
// 1. Block scope prevents bugs
{
    let blockVariable = "I only exist in this block";
}
// console.log(blockVariable); // Error: blockVariable is not defined

// 2. Prevents accidental redeclaration
let userName = "Alice";
// let userName = "Bob"; // Error: Identifier 'userName' has already been declared

// 3. Temporal Dead Zone - prevents usage before declaration
// console.log(temporalDeadZone); // Error: Cannot access before initialization
let temporalDeadZone = "Now I'm accessible";

// 4. Loop behavior is more predictable with let
for (let i = 0; i < 3; i++) {
    // Each iteration gets its own 'i' variable
    setTimeout(() => console.log(`let loop: ${i}`), 100); // Prints 0, 1, 2
}

// Compare with var (problematic):
for (var j = 0; j < 3; j++) {
    // All iterations share the same 'j' variable
    setTimeout(() => console.log(`var loop: ${j}`), 100); // Prints 3, 3, 3
}

// ===== BEST PRACTICES =====
// - Use 'const' by default for values that won't be reassigned
// - Use 'let' when you need to reassign the variable
// - Avoid 'var' in modern code

console.log("Variable declarations examples complete!");

export {}; 