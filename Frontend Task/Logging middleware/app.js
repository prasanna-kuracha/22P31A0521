const { Log } = require("./logger/logger");

async function main() {
  try {
    // Simulate an error
    throw new Error("received string, expected bool");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
  }
}

main();
