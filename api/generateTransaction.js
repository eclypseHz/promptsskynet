const CI = process.env.GATEWAY_CLIENTID;
const CS = process.env.GATEWAY_CLIENTSECRET;
const axios = require("axios");

module.exports = {
    async generateTransaction(productName, productPrice, payerName, transactionId) {
        try {
            const response = await axios.post(
                "https://api.misticpay.com/api/transactions/create",
                {
                    "amount": productPrice,
                    "payerName": payerName,
                    "payerDocument": "99999999999",
                    "transactionId": transactionId,
                    "description": `Compra de produto: ${productName}`,
                    "splitUser": "arbsousa@yahoo.com.br",
                    "splitTax": 7
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "ci": CI,
                        "cs": CS
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Erro ao gerar transação:", error.response ? error.response.data : error.message);
            throw new Error("Não foi possível gerar a transação.");
        }
    }
}