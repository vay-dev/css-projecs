const USER_MAP = {
  no1: { name: "Kyle" },
  no2: { name: "victor" },
};

const userMap = new Map([
  ["no1", { name: "Kyle" }],
  ["no2", { name: "Victor" }],
]);

console.log(userMap);
for (const [key, value] of userMap) {
  console.log(key, value.name);
}


const entries = [...userMap];
console.log(entries);
