//

import bot from "../bot.js";
import { chatBot } from "./app2.js";

bot.start(async (ctx) => {
  chatBot.botStart(ctx);
});
bot.help(async (ctx) => {
  chatBot.botHelp(ctx);
});
bot.command("settings", async (ctx) => {
  chatBot.botSettings(ctx);
});
bot.action(["act1", "act2", "act3"], async (ctx) => {
  chatBot.botActionStart(ctx);
});
bot.action(["act4", "act5", "act6"], async (ctx) => {
  chatBot.botActionSettings(ctx);
});
bot.action("cnt", async (ctx) => {
  chatBot.botActionSearch(ctx);
});
bot.command("search", async (ctx) => {
  chatBot.botSearch(ctx);
});
bot.command("next", async (ctx) => {
  chatBot.botNext(ctx);
});
bot.command("stop", async (ctx) => {
  chatBot.botStop(ctx);
});
bot.command("delete", async (ctx) => {
  chatBot.botDelete(ctx);
});
bot.on("message", async (ctx) => {
  chatBot.botOn(ctx);
});

export default bot;
