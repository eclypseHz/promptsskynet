module.exports = {
    name: "start",
    description: "Inicia o bot",
    async execute(bot, msg, args) {
        const payload = args[0];

        return await bot.sendMessage(
            msg.chat.id,
            `Olá! Seja muito bem-vindo ao SKYNET!
🚀 Aqui você encontra os melhores PROMPTs para TikTok e Shopee, criados para aumentar suas vendas e economizar horas de trabalho.
💎 Acesso vitalício 
🔥 Atualizações frequentes 
📈 PROMPTs testados e prontos para copiar e colar 
🎯 Ideal para afiliados, criadores e vendedores`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🛒 Comprar",
                                callback_data: "see_product:1"
                            }
                        ],
                        [
                            {
                                text: "💬 Falar com o suporte",
                                callback_data: "support"
                            }
                        ]
                    ]
                }
            }
        );
    }
};