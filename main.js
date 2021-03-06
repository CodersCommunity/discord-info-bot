const Discord = require('discord.js');
const commands = require('./commands');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
    for (const command in commands) {
        client.api.applications(client.user.id).guilds(process.env.GUILD_ID).commands.post({
            data: {name: command, description: commands[command].title}
        });
    }

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        if (commands[command]) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        embeds: [
                            {
                                title: commands[command].title,
                                description: commands[command].content
                            }
                        ]
                    }
                }
            })
        }
    });
});

client.login(process.env.TOKEN);
