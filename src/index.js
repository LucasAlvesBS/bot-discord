require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const utils = require('./helpers/utils');
const { discord_token } = require('./config/credentials');

client.login(discord_token);

client.on('ready', () => {
  console.log('Discord ready');
  utils.setup(client);
})
