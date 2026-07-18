module.exports = {
    name: "support",

    async execute(bot, query) {
        await bot.sendMessage(
            query.message.chat.id,
            "Para falar com o suporte, entre em contato por: https://wa.me/5571997191030"
        );
    }
};