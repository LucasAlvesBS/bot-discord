require('dotenv').config();
const Twit = require('twitter-v2');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });


var twitter = new Twit({
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
})

const sendMessage = async (tweet, client) => {
  const url = "https://twitter.com/user/status/" + tweet.id;
  try {
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID)
    channel.send(url);
  } catch (error) {
    console.error(error);
  }
}

const listenForever = async (streamFactory, dataConsumer) => {
  try {
    for await (const { data } of streamFactory()) {
      dataConsumer(data);
    }
    console.log('Stream disconnected healthily. Reconnecting.');
    listenForever(streamFactory, dataConsumer);
  } catch (error) {
    console.warn('Stream disconnected with error. Retrying.', error);
    listenForever(streamFactory, dataConsumer);
  }
}

const setup = async () => {
  const endpointParameters = {
      'tweet.fields': [ 'author_id', 'conversation_id' ],
      'expansions': [ 'author_id', 'referenced_tweets.id' ],
      'media.fields': [ 'url' ]
  }
  try {
    console.log('Setting up Twitter...')
    const body = {
      "add": [
        {"value": "from:"+ process.env.TWITTER_USER_NAME, "tag": "from me!!!"}
      ]
    }
    const r = await twitter.post("tweets/search/stream/rules", body);
    console.log(r);
  } catch (err) {
    console.log(err);
  }

  listenForever(
    () => twitter.stream('tweets/search/stream', endpointParameters),
    (data) => sendMessage(data, client)
  );
}

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  console.log('Discord ready');
  setup();
})
