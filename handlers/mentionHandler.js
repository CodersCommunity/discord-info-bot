require('discord-reply');
const Discord = require('discord.js');
const MENTIONS_DICT = Object.freeze({
    EVERYONE: '@everyone',
    HERE: '@here',
});
const MENTION_PERMISSION = 'MENTION_EVERYONE';
const EMBED_COLOR = '#eb1540';
const EMBED_TITLE = 'Nie wołaj wszystkich!';
const EMBED_THUMBNAIL = 'https://i.imgur.com/nREiJww.png';
const EMBED_DESCRIPTION = '\nRozumiemy, że potrzebujesz pomocy, ale nie wszyscy chcą zostać o tym powiadomieni.\n Jest nas tutaj dużo i nie ma sensu, aby każdy dostał bezpośrednio taką informację.\n Nie trudno sobie wyobrazić jak irytujące byłoby, gdyby każdy wołał wszystkich do każdego tematu.\n Dlatego zadaj pytanie i po prostu poczekaj - jeśli ktoś będzie wiedział i mógł, to na pewno spróbuje odpowiedzieć.';

function mentionHandler(message){
    const pingEmbed = new Discord.MessageEmbed()
      .setColor(EMBED_COLOR)
      .setTitle(EMBED_TITLE)
      .setThumbnail(EMBED_THUMBNAIL)
      .setDescription(EMBED_DESCRIPTION);
    const mentions = message.content.includes(MENTIONS_DICT.EVERYONE) || message.content.includes(MENTIONS_DICT.HERE);

    try{ //needed, if someone sends private message to bot, it crashes without try..catch
        const hasPermission = message.member.hasPermission(MENTION_PERMISSION);
        if (mentions && !hasPermission) {
            //message.reply(pingEmbed);
            message.lineReply(pingEmbed);
        }
    }
    catch(err){
        console.error(err);
    }
}

module.exports = mentionHandler;
