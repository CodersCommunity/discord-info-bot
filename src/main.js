import {
    Client,
    EmbedBuilder,
    GatewayIntentBits
} from 'discord.js';
import { commands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`);

    for (const command in commands) {
        client.guilds.cache.get(process.env.GUILD_ID).commands.create({
            name: command,
            description: commands[command].title,
        });
    }

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = commands[interaction.command.name.toLowerCase()];

        if (command) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(command.title)
                        .setDescription(command.content),
                ],
            });
        }
    });
});

client.login(process.env.TOKEN);
