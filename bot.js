//

import { env } from "./env.js";
import { Context, Telegraf } from "telegraf";
import fs from "fs";

// Environment Variable
const token = env.token;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

// Custom Context
class CustomContext extends Context {
  constructor(update, telegram, botInfo) {
    const logData = {
      update,
      // telegram,
      // botInfo,
    };
    writeToLogFile(JSON.stringify(logData));
    super(update, telegram, botInfo);
  }
  reply(...args) {
    writeToLogFile("reply called with args: " + JSON.stringify(args));
    return super.reply(...args);
  }
}

const bot = new Telegraf(token, { contextType: CustomContext });

// log Data
const writeToLogFile = (data) => {
  const log = `${new Date().toISOString()}: ${data}\n`;
  fs.appendFile("./log/bot.log", log, (err) => {
    if (err) {
      console.error("Gagal menulis ke file console.log:", err);
    }
  });
};

try {
  writeToLogFile("Bot sedang berjalan");
  console.log("Bot sedang berjalan");
} catch (error) {
  writeToLogFile.error("Terjadi error saat menjalankan bot:", error);
  console.error("Terjadi error saat menjalankan bot:", error);
}

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
