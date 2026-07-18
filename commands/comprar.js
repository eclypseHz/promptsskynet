const { showBuyMenu } = require("../flows/buy");

module.exports = {
    name: "comprar",
    description: "Inicia o fluxo de compra",
    
    async execute(bot, msg, args) {
        const productId = "1"

        const product = products.find(p => p.id === productId);

        if (!product) {
            return bot.sendMessage(
                msg.chat.id,
                "Produto não encontrado."
            );
        }

        await bot.sendMessage(
            msg.chat.id,
            `${product.name}\n\n${product.description}\n\n<s>Preço: R$${product.fakePrice.toFixed(2)}</s>\nPreço: R$${product.price.toFixed(2)} (${((product.fakePrice - product.price) / product.fakePrice * 100).toFixed(0)}% OFF)\n\n<i>Ao fazer o pagamento, você acorda com os nossos <a href="https://docs.google.com/document/d/1FG6wCK6Y37igCuAFxOz7v8jTIqWKirk62UpwYd-c2KI">termos de uso e serviço.</a></i>`,
            {
                parse_mode: "HTML",
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🛒 Comprar",
                                callback_data: `buy_product:${product.id}`
                            }
                        ]
                    ]
                }
            }
        );
    }
};