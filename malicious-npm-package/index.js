// index.js
const metrics = require("helper-metrics");

console.log("App starting...");
console.log("Doing useful work...");
console.log("2 + 2 =", 2 + 2);

// Looks harmless
metrics.record("startup");

console.log("App finished successfully.");
