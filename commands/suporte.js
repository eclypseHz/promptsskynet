module.exports = {
    name: "suporte",
    description: "Inicia o fluxo de suporte",
    
    async execute(bot, query) {
        return await bot.sendMessage(
            query.message.chat.id,
            "Para falar com o suporte, entre em contato por: https://wa.me/5571997191030"
        );
    }
};