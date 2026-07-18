const { showBuyMenu } = require("../flows/buy");

module.exports = {
    name: "buy",

    async execute(bot, query) {
        await bot.answerCallbackQuery(query.id);
        await showBuyMenu(bot, query.message.chat.id);
    }
};