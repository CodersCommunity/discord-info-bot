const Discord = require('discord.js');
const commands = require('./commands');
const { isTrivialQuestion } = require('./moderative');

require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready...');

  for (const command in commands) {
    client.api
      .applications(client.user.id)
      .guilds(process.env.GUILD_ID)
      .commands.post({
        data: { name: command, description: commands[command].title },
      });
  }

  client.on('message', async (message) => {
    console.log(
      'message.content:',
      message.content,
      ' /createdTimestamp:',
      message.createdTimestamp,
      ' /id:',
      message.id,
      ' /author lastMessageID:',
      message.author.lastMessageID
    );

    if (await isTrivialQuestion(message)) {
      message.channel.send(commands.trivial);
    }
  });

  client.ws.on('INTERACTION_CREATE', (interaction) => {
    console.log(
      'interaction:',
      interaction,
      ' /isTrivialQuestion(interaction.data.name):',
      isTrivialQuestion(interaction.data.name)
    );

    const command = interaction.data.name.toLowerCase();

    if (commands[command]) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            embeds: [
              {
                title: commands[command].title,
                description: commands[command].content,
              },
            ],
          },
        },
      });
    }
  });
});

client.login(process.env.TOKEN);
