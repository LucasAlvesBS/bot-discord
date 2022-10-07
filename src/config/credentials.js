require('dotenv').config();

module.exports = {
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
  discord_token: process.env.DISCORD_TOKEN,
}
