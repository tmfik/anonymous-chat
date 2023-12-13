//

import { pesan } from "./a/pesan.js";
import { time } from "./a/time.js";
import { Markup } from "telegraf";

class ChatBot {
  constructor() {
    this.isSearch = false;
    this.isNext = false;
    this.isStop = 0;
    this.isStopPartner = false;
    this.isAct = false;
    this.isBotOn = false;

    this.infoBot = {
      botHelp:
        "This bot is for anonymous chatting with strangers in Telegram\n\nBot can send text, links, gifs, stickers, photos, videos or voice messages",
      gn: "Thanks for setting your gender",
      lp: "Looking for a partner...",
      pf: "Partner found 🐵\n/next — find a new Partner\n/stop — stop this dialog",
      cn: "You are in the dialog right now 🤔",
      st: "You stopped the dialog 🙄\nType /search to find a new partner\n\nYou can delete a message by replying to a message with /delete.",
      stp: "Your partner has stopped the dialog 😞\nType /search to find a new partner\n\nYou can delete a message by replying to a message with /delete.",
      dl: "to delete a message reply /delete on the message",
      on: "You have no partner 🤔\nType /search to find a new partner\n",
    };
  }

  // Command Start
  async botStart(ctx) {
    await ctx.telegram.setMyCommands([
      { command: "search", description: "Find a partner" },
      {
        command: "next",
        description: "Stop current dialog and find a new partner",
      },
      { command: "stop", description: "Stop current dialog" },
      { command: "help", description: "How to use bot" },
      { command: "settings", description: "Change your gender" },
    ]);
    return await ctx.reply(
      "Set your gender",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("I am male 👨", "act1"),
          Markup.button.callback("I am female 👩", "act2"),
        ],
        [Markup.button.callback("Prefer not to say 😶", "act3")],
      ]),
    );
  }

  // Command Help
  async botHelp(ctx) {
    const commands = await ctx.telegram.getMyCommands();
    const info = commands.reduce(
      (acc, val) => `${acc}/${val.command} — ${val.description}\n`,
      "",
    );
    return await ctx.replyWithHTML(`<i>${this.infoBot.botHelp}\n\n${info}</i>`);
  }

  // Command Settings
  async botSettings(ctx) {
    return await ctx.reply(
      "Set your gender",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("I am male 👨", "act4"),
          Markup.button.callback("I am female 👩", "act5"),
        ],
        [Markup.button.callback("Prefer not to say 😶", "act6")],
      ]),
    );
  }

  // Action Start
  async botActionStart(ctx) {
    this.isSearch = true;
    this.isNext = true;
    this.isStop = 0;
    this.isStopPartner = false;
    this.isAct = true;
    this.isBotOn = false;
    await ctx.deleteMessage();
    await ctx.answerCbQuery("Thanks for setting your gender");
    await ctx.replyWithHTML(`<i>${this.infoBot.gn}</i>`);
    await ctx.replyWithHTML(`<i>${this.infoBot.lp}</i>`);
    await ctx.replyWithHTML(`<i>${this.infoBot.pf}</i>`);
    await time.botStopPartner(ctx);
  }

  // Action Settings
  async botActionSettings(ctx) {
    await ctx.deleteMessage();
    await ctx.answerCbQuery("Thanks for setting your gender");
    await ctx.replyWithHTML(`<i>${this.infoBot.gn}</i>`);
  }

  // Action Search
  async botActionSearch(ctx) {
    if (!this.isAct === !this.isSearch) {
      this.isSearch = true;
      this.isNext = true;
      this.isStop = 0;
      this.isStopPartner = false;
      this.isAct = true;
      this.isBotOn = false;
      await ctx.deleteMessage();
    } else if (!this.isSearch || (this.isStop && this.isStopPartner)) {
      await ctx.deleteMessage();
      await ctx.replyWithHTML(`<i>${this.infoBot.on}</i>`);
    }
  }

  // Command Search
  async botSearch(ctx) {
    if (!this.isSearch) {
      this.isSearch = true;
      this.isNext = true;
      this.isStop = 0;
      this.isStopPartner = false;
      this.isAct = true;
      this.isBotOn = false;
      await ctx.replyWithHTML(`<i>${this.infoBot.lp}</i>`);
    } else {
      return await ctx.replyWithHTML(
        `<i>${this.infoBot.cn}</i>`,
        Markup.inlineKeyboard([[Markup.button.callback("Continue", "cnt")]]),
      );
    }
    if (!pesan.p_search) {
      await ctx.replyWithHTML(`<i>${this.infoBot.pf}</i>`);
    } else {
      await ctx.replyWithHTML(`<i>${this.infoBot.pf}</i>`);
      await ctx.reply(pesan.p_search);
    }
    await time.botStopPartner(ctx);
  }

  // Command Next
  async botNext(ctx) {
    if (!this.isNext) {
      this.isSearch = true;
      this.isNext = true;
      this.isStop = 0;
      this.isStopPartner = false;
      this.isAct = false;
      this.isBotOn = false;
      await ctx.replyWithHTML(`<i>${this.infoBot.lp}</i>`);
    }
    if (!pesan.p_next) {
      await ctx.replyWithHTML(`<i>${this.infoBot.pf}</i>`);
    } else {
      await ctx.replyWithHTML(`<i>${this.infoBot.pf}</i>`);
      await ctx.reply(pesan.p_next);
    }
    await time.botStopPartner(ctx);
  }

  // Command Stop
  async botStop(ctx) {
    if (
      (this.isSearch && this.isNext) ||
      (this.isStop < 1 === this.isStopPartner && this.isBotOn)
    ) {
      this.isSearch = false;
      this.isNext = false;
      this.isStop++;
      this.isStopPartner = true;
      this.isAct = true;
      this.isBotOn = true;
      await ctx.replyWithHTML(`<i>${this.infoBot.st}</i>`);
    } else {
      await ctx.replyWithHTML(`<i>${this.infoBot.on}</i>`);
    }
  }

  // Command Delete
  async botDelete(ctx) {
    await ctx.replyWithHTML(`<i>${this.infoBot.dl}</i>`);
  }

  // bot.on
  async botOn(ctx) {
    if (this.isBotOn) {
      await ctx.replyWithHTML(`<i>${this.infoBot.on}</i>`);
    }
  }
}

export const chatBot = new ChatBot();
