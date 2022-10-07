require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const utils = require('./helpers/utils');

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  console.log('Discord ready');
  utils.setup(client);
})
