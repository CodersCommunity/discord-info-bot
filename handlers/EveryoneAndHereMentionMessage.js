const Discord = require('discord.js');

const color = '#eb1540';
const title = 'Nie wołaj wszystkich!';
const thumbnail = 'LINK'
const description = '\nRozumiemy, że potrzebujesz pomocy, ale nie wszyscy chcą zostać o tym powiadomieni.\n Jest nas tutaj dużo i nie ma sensu, aby każdy dostał bezpośrednio taką informację.\n Nie trudno sobie wyobrazić jak irytujące byłoby, gdyby każdy wołał wszystkich do każdego tematu.\n Dlatego zadaj pytanie i po prostu poczekaj - jeśli ktoś będzie wiedział i mógł, to na pewno spróbuje odpowiedzieć.'

export function mentionHandler(){
    const pingEmbed = new Discord.MessageEmbed()
	.setColor(color)
	.setTitle(title)
    .setThumbnail(thumbnail)
    .setDescription(description);

    const mentionedEveryone = message.content.includes("@everyone") || message.content.includes("@here")
    const hasPermission = message.member.hasPermission('MENTION_EVERYONE')
    if (mentionedEveryone && !hasPermission) {
        try{
            message.author.send(pingEmbed)
        } catch {

        }  
    }
}