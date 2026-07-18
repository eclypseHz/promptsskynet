module.exports = {
    name: "suporte",
    description: "Inicia o fluxo de suporte",
    
    async execute(bot, msg) {
        return await bot.sendMessage(
            msg.chat.id,
            "Para falar com o suporte, entre em contato por: https://wa.me/5571997191030"
        );
    }
};