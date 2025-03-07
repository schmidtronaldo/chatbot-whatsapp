import express from 'express';
import qrcode from 'qrcode';
import { Client } from 'whatsapp-web.js';
import { readFileSync } from 'fs';
import analyzeIntent from './nlpHandler.js';
import { getContext } from './contextHandler.js';
import responses from './responses.js';
import simulateTyping from './simulateTyping.js';

// Carrega as mensagens
const messages = JSON.parse(readFileSync('./src/messages.json', 'utf-8'));

// Inicializa o Express
const app = express();
const port = process.env.PORT || 3000;

// Inicializa o cliente do WhatsApp
const client = new Client();

// Rota para exibir o QR Code
app.get('/qrcode', async (req, res) => {
  try {
    client.on('qr', (qr) => {
      qrcode.toDataURL(qr, (err, url) => {
        if (err) {
          return res.status(500).send('Erro ao gerar QR Code');
        }
        res.send(`<img src="${url}" alt="QR Code" />`);
      });
    });
  } catch (error) {
    res.status(500).send('Erro ao gerar QR Code');
  }
});

// Inicializa o cliente do WhatsApp
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

// Inicializa o cliente do WhatsApp
client.initialize();

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});