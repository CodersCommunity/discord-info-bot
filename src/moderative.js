const { TRIGGER_MESSAGES } = require('./trigger-messages');

const MESSAGE_CONTENT_MAX_LENGTH = 150;

const unFormatMessage = (message) => message.replace(/_|~|\*/g, '');
const deduceCodePresenceInside = (message) => {
  const codeMatch = message.match(/`/g);
  return codeMatch && codeMatch.length >= 2;
};
const isMessageCooledDown = (fetch) => {
  return fetch()
    .then((messages) => {
      // debugger;
      console.log('last msgs: ', messages);

      return true;
    })
    .catch(console.error);
};
const isTrivialInsideMessage = (content) =>
  TRIGGER_MESSAGES.TRIVIALS.some((trivial) => {
    const isTrivial = unFormatMessage(content).toLowerCase().includes(trivial.toLowerCase());

    console.log('...trivial:', trivial, ' /content:', content, ' /isTrivial:', isTrivial);

    return content.length <= MESSAGE_CONTENT_MAX_LENGTH && isTrivial;
  });

const isTrivialQuestion = async (message) =>
  !message.author.bot &&
  !message.attachments.size &&
  !deduceCodePresenceInside(message.content) &&
  (await isMessageCooledDown(message.channel.fetch.bind(message.channel))) &&
  isTrivialInsideMessage(message.content);

module.exports = { isTrivialQuestion };
