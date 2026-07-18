const CI = process.env.GATEWAY_CLIENTID;
const CS = process.env.GATEWAY_CLIENTSECRET;
const axios = require("axios");

module.exports = {
    async checkTransaction(transactionId) {
        try {
            const response = await axios.post(
                "https://api.misticpay.com/api/transactions/check",
                {
                    "transactionId": transactionId
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
            console.error("Erro ao verificar transação:", error.response ? error.response.data : error.message);
            throw new Error("Não foi possível verificar a transação.");
        }  
    }
}