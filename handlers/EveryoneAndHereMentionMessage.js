const Discord = require('discord.js');
const MentionsList = [
    '@everyone',
    '@here'
];
const MentionPermission = 'MENTION_EVERYONE';
const MentionEmbedColor = '#eb1540';
const MentionEmbedTitle = 'Nie wołaj wszystkich!';
const MentionEmbedThumb = 'https://i.imgur.com/nREiJww.png';
const MentionEmbedDesc = '\nRozumiemy, że potrzebujesz pomocy, ale nie wszyscy chcą zostać o tym powiadomieni.\n Jest nas tutaj dużo i nie ma sensu, aby każdy dostał bezpośrednio taką informację.\n Nie trudno sobie wyobrazić jak irytujące byłoby, gdyby każdy wołał wszystkich do każdego tematu.\n Dlatego zadaj pytanie i po prostu poczekaj - jeśli ktoś będzie wiedział i mógł, to na pewno spróbuje odpowiedzieć.';

module.exports = {
    
    mentionHandler: function (message){
        const pingEmbed = new Discord.MessageEmbed()
        .setColor(MentionEmbedColor)
        .setTitle(MentionEmbedTitle)
        .setThumbnail(MentionEmbedThumb)
        .setDescription(MentionEmbedDesc);
        const mentions = message.content.includes(MentionsList[0]) || message.content.includes(MentionsList[1]);
        if (mentions) {
            try{
                const hasPermission = message.member.hasPermission(MentionPermission);
                message.author.send(pingEmbed);
            } catch {

            }  
        }
    }
}
