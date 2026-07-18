const products = require("../produtos.json");

const inline_keyboard = products.map(product => [
    {
        text: product.name + ` - R$${product.price.toFixed(2)}`,
        callback_data: `see_product:${product.id}`
    }
]);

async function showBuyMenu(bot, chatId) {
    return bot.sendMessage(
        chatId,
        `<b>👋 Bem-vindo(a) ao Nexus Infoprodutos!</b>

Você está a poucos minutos de ter acesso a conteúdos selecionados para <b>economizar tempo</b> e <b>acelerar seus resultados</b>.

✨ <b>Escolha o produto ideal para você</b> e receba o acesso <b>automaticamente</b> após a confirmação do pagamento.

🔒 Pagamento seguro • ⚡ Entrega automática • 📚 Acesso imediato

<i>Selecione um produto abaixo para começar.</i>`,
        {   
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard
            }
        }
    );
}


module.exports = {
    showBuyMenu
};