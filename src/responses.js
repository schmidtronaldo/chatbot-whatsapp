
import messages from './messages.json';
import simulateTyping from './simulateTyping';

const responses = {
  '1': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['1']) {
      await simulateTyping(chat, 3000);
      await msg.reply(message);
    }
  },
  '2': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['2']) {
      await simulateTyping(chat, 3000);
      await msg.reply(message);
    }
  },
  '3': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['3']) {
      await simulateTyping(chat, 3000);
      await msg.reply(message);
    }
  },
  '4': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['4']) {
      await simulateTyping(chat, 3000);
      await msg.reply(message);
    }
  },
  '5': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['5']) {
      await simulateTyping(chat, 3000);
      await msg.reply(message);
    }
  },
};

export default responses;