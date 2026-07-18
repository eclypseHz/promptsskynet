const TelegramBotPkg = require("node-telegram-bot-api");
const TelegramBot = TelegramBotPkg.default || TelegramBotPkg;
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true
});

const commands = new Map();
const telegramCommands = [];

const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath)) {
    if (!file.endsWith(".js")) continue;

    const command = require(path.join(commandsPath, file));

    commands.set(command.name, command);

    if (command.description) {
        telegramCommands.push({
            command: command.name,
            description: command.description
        });
    }

    console.log(`Loaded command: ${command.name}`);
}

bot.setMyCommands(telegramCommands).then(() => {
    console.log("Bot commands set successfully.");
}).catch(err => {
    console.error("Error setting bot commands:", err);
});

bot.on("message", async msg => {
    console.log(msg.chat.id);

    if (!msg.text?.startsWith("/")) return;

    const parts = msg.text.trim().split(/\s+/);

    const commandName = parts[0].slice(1).split("@")[0];
    const args = parts.slice(1);

    const command = commands.get(commandName);

    if (!command) return;

    let str = `${msg.chat.first_name} executou o comando: ${commandName}`
    if (args.length > 0) {
        str += ` com os argumentos: ${args.join(", ")}`;
    }
    console.log(str);

    try {
        await command.execute(bot, msg, args);
    } catch (err) {
        console.error(err);
    }
});

const buttons = new Map();

const buttonsPath = path.join(__dirname, "buttons");

for (const file of fs.readdirSync(buttonsPath)) {
    if (!file.endsWith(".js")) continue;

    const button = require(path.join(buttonsPath, file));

    buttons.set(button.name, button);
}

bot.on("callback_query", async query => {
    const [name, ...args] = query.data.split(":");

    const button = buttons.get(name);

    if (!button) return;

    console.log(`${query.from.first_name} clicou no botão: ${name}`);
    
    try {
        await button.execute(bot, query, args);
    } catch (err) {
        console.error(err);
    }
});

(async () => {
    try {
        const chat = await bot.getChat(3701920350);
        console.log(chat);
    } catch (err) {
        console.error(err);
    }
})();