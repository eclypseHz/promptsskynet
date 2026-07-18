const axios = require("axios");

module.exports = {
    async downloadDriveFile(fileId) {
        const response = await axios.get(
            `https://drive.google.com/uc?export=download&id=${fileId}`,
            {
                responseType: "arraybuffer"
            }
        );

        return Buffer.from(response.data);
    }
};