//

import { chatBot } from "../app2.js";

class Time {
  async botStopPartner(ctx) {
    setTimeout(async () => {
      if (!chatBot.isStopPartner && !chatBot.isBotOn) {
        chatBot.isSearch = false;
        chatBot.isNext = false;
        chatBot.isBotOn = true;
        await ctx.replyWithHTML(`<i>${chatBot.infoBot.stp}</i>`);
      }
    }, 100000000);
  }
}

export const time = new Time();
