import { readFileSync } from 'fs';
import simulateTyping from './simulateTyping.js';

const messages = JSON.parse(readFileSync('./src/messages.json', 'utf-8'));

const sendMessages = async (msg, key) => {
  const chat = await msg.getChat();
  for (const message of messages.options[key]) {
    await simulateTyping(chat, 3000);
    await msg.reply(message);
  }
};

const responses = {
  '1': async (msg) => sendMessages(msg, '1'),
  '2': async (msg) => sendMessages(msg, '2'),
  '3': async (msg) => sendMessages(msg, '3'),
  '4': async (msg) => sendMessages(msg, '4'),
  '5': async (msg) => sendMessages(msg, '5'),
};

export default responses;