const axios = require("axios");

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "error"];

async function Log(stack, level, packageName, message) {
  if (!VALID_STACKS.includes(stack)) {
    console.error("Invalid stack:", stack);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.error("Invalid level:", level);
    return;
  }

  try {
    const response = await axios.post(LOG_API_URL, {
      stack,
      level,
      package: packageName,
      message,
    });

    console.log("✅ Log sent:", response.data);
  } catch (error) {
    console.error("❌ Failed to send log:", error.message);
  }
}

module.exports = { Log };
