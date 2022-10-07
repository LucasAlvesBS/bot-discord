require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const utils = require('./twitter/main');
const { discord_token } = require('./config/credentials');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

client.login(discord_token);

client.on('ready', () => {
  console.log('Discord ready');
  utils.setup(client);
})
