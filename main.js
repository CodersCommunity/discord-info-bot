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
client.on('message', message => { //Ten event wykonuje się, gdy bot wykryje wiadomość
    const pingEmbed = new Discord.MessageEmbed()
	.setColor('#eb1540')
	.setTitle('Nie wołaj wszystkich!')
    .setThumbnail('https://cdn.discordapp.com/attachments/617673807213232128/852887484542615572/Pingsock.png')
    .setDescription('\nRozumiemy, że potrzebujesz pomocy, ale nie wszyscy chcą zostać o tym powiadomieni.\n Jest nas tutaj dużo i nie ma sensu, aby każdy dostał bezpośrednio taką informację.\n Nie trudno sobie wyobrazić jak irytujące byłoby, gdyby każdy wołał wszystkich do każdego tematu.\n Dlatego zadaj pytanie i po prostu poczekaj - jeśli ktoś będzie wiedział i mógł, to na pewno spróbuje odpowiedzieć.');

    if (message.content.includes("@everyone")) { //Jeśli wiadomość zawiera @everyone..
        try{
            if(!message.member.hasPermission('MENTION_EVERYONE')) //Sprawdzamy, czy wysyłający ma uprawnienia do wzmianki @everyone, jeśli nie to bot wysyła wiadomość
                message.author.send(pingEmbed)
        }catch{
            console.log(message.author.username + " wysłał ping w wiadomości prywatnej do bota, hmm..")
        }
        
    } else {
        if(message.content.includes("@here")) //Jeśli wiadomość zawiera @here..
        try{
            if(!message.member.hasPermission('MENTION_EVERYONE')) //Sprawdzamy, czy wysyłający ma uprawnienia do wzmianki @everyone, jeśli nie to bot wysyła wiadomość
                message.author.send(pingEmbed)
        }catch{
            console.log(message.author.username + " wysłał ping w wiadomości prywatnej do bota, hmm..")
        }
    }
 });
client.login(process.env.TOKEN);
