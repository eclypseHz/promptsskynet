const products = require("../produtos.json");
const { generateTransaction } = require("../api/generateTransaction");
const { checkTransaction } = require("../api/checkTransaction");
const { downloadDriveFile } = require("../api/downloadDriveFile");

module.exports = {
    name: "buy_product",

    async execute(bot, query, args) {
        await bot.answerCallbackQuery(query.id);

        const productId = args[0];

        const product = products.find(p => p.id === productId);

        if (!product) {
            return bot.sendMessage(
                query.message.chat.id,
                "Produto não encontrado."
            );
        }

        const transactionId = `txn_${Date.now()}`;
        const transaction = await generateTransaction(product.name, product.price, query.message.chat.first_name, transactionId);
        const data = transaction.data;
        const qrCodeUrl = data.qrcodeUrl;
        const copyPaste = data.copyPaste;

        console.log("Transaction ID:", transactionId);
        console.log("QR Code URL:", qrCodeUrl);
        console.log("Copy-Paste Code:", copyPaste);

        const expiresAt = new Date(Date.now() + 15 * 60).toLocaleString("pt-BR");

        await bot.sendPhoto(
            query.message.chat.id,
            qrCodeUrl,
            {
                caption:
                    `<b>Você escolheu o produto:</b> <i>${product.name}</i>\n\n` +
                    `<b>Preço:</b> <i>R$${product.price.toFixed(2)}</i>\n` +
                    `<b>Este pagamento expira em:</b> <i>${expiresAt}</i>\n\n` +
                    `<b>Para finalizar a compra, escaneie o QR Code ou copie e cole o código abaixo.</b>\n` +
                    `<code>${copyPaste}</code>`,
                parse_mode: "HTML"
            }
        );

        let tries = 0;
        const maxTries = 90; // 90 tries * 10 seconds = 15 minutes

        // Check transaction status every 10 seconds
        const intervalId = setInterval(async () => {
            const statusResponse = await checkTransaction(transactionId);
            let status = statusResponse.transaction.transactionState;

            if (status === "COMPLETO") {
                const CHAT_ID = -1003701920350

                const invite = await bot.createChatInviteLink(CHAT_ID, {
                    member_limit: 1
                });

                clearInterval(intervalId);
                await bot.sendMessage(
                    query.message.chat.id,
                    "Pagamento confirmado! Obrigado pela sua compra."
                );
                await bot.sendMessage(
                    query.message.chat.id,
                    `Segue o link de <b>uso único</b> para acessar o grupo SKYNET:\n\n ${invite.invite_link}`,
                    {
                        parse_mode: "HTML"
                    }
                );
                console.log(query.message.chat.first_name + " pagou");
            }
            tries++;
            if (tries >= maxTries) {
                clearInterval(intervalId);
                await bot.sendMessage(
                    query.message.chat.id,
                    "O tempo para pagamento expirou. Por favor, tente novamente."
                );
            }
        }, 10000);
    }
}
