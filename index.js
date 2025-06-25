const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.channel.id === process.env.CHANNEL_ID) {
    message.reply(process.env.REPLY_TEXT);
  }
});

// Web server to keep Railway app awake
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Bot is alive on Railway!"));
app.listen(process.env.PORT || 3000, () => console.log("Web server running"));

client.login(process.env.TOKEN);
