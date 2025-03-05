
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import fs from 'fs';
import analyzeIntent from './nlpHandler';
import { getContext } from './contextHandler';
import responses from './responses';
import simulateTyping from './simulateTyping';

// Carrega as mensagens
const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'));

// Inicializa o cliente
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Tudo certo! WhatsApp conectado.');
});

client.on('message', async (msg) => {
  try {
    if (!msg.body || !msg.from.endsWith('@c.us')) return;

    const userId = msg.from;
    const context = getContext(userId);
    const intent = analyzeIntent(msg.body);

    switch (intent) {
      case 'greeting':
        const chat = await msg.getChat();
        await simulateTyping(chat, 3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await msg.reply(messages.greetings.welcome.replace('{name}', name.split(' ')[0]));
        context.lastIntent = 'greeting';
        break;

      case 'menu':
        await msg.reply(messages.greetings.welcome.replace('{name}', ''));
        context.lastIntent = 'menu';
        break;

      case 'plans':
        await responses['2'](msg);
        context.lastIntent = 'plans';
        break;

      case 'benefits':
        await responses['3'](msg);
        context.lastIntent = 'benefits';
        break;

      case 'signup':
        await responses['4'](msg);
        context.lastIntent = 'signup';
        break;

      default:
        if (responses[msg.body]) {
          await responses[msg.body](msg);
        } else {
          await msg.reply(messages.greetings.fallback);
        }
        break;
    }
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
  }
});

client.initialize();