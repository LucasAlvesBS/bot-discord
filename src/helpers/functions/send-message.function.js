const sendMessage = async (tweet, client) => {
  const url = "https://twitter.com/user/status/" + tweet.id;
  try {
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID)
    channel.send(url);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMessage,
};
