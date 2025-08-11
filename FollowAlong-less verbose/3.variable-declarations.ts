var oldWay = "Function scoped";
let modernWay = "Block scoped";
const constant = "Cannot reassign";

const obj = { name: "John" };
obj.name = "Jane";

const arr = [1, 2, 3];
arr.push(4);

{
    let blockScoped = "Only here";
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}

export {};