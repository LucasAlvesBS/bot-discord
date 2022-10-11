require('dotenv').config();
const Twit = require('twitter-v2');
const { bearer_token } = require('../config/credentials');
const send = require('../helpers/functions/send-message.function');

const twitter = new Twit({ bearer_token });

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

const setup = async (client) => {
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
    (data) => send.sendMessage(data, client)
  );
}

module.exports = {
  setup,
};
