import express from 'express';
import qrcode from 'qrcode-terminal';
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
const port = process.env.PORT || 5200;

// Variável global para armazenar o QR Code
let qrCodeUrl = null;

// Rota raiz
app.get('/', (req, res) => {
  res.send(`
    <h1>Bem-vindo ao Chatbot WhatsApp</h1>
    <p>Acesse <a href="/qrcode">/qrcode</a> para escanear o QR Code.</p>
  `);
});

// Rota para exibir o QR Code
app.get('/qrcode', async (req, res) => {
  try {
    if (qrCodeUrl) {
      // Se o QR Code já foi gerado, exibe-o
      res.send(`
        <h1>QR Code para WhatsApp</h1>
        <img src="${qrCodeUrl}" alt="QR Code" />
        <p>Escaneie este QR Code com o WhatsApp.</p>
      `);
    } else {
      // Se o QR Code ainda não foi gerado, exibe uma mensagem de espera
      res.send(`
        <h1>Aguardando QR Code...</h1>
        <p>Por favor, aguarde enquanto o QR Code é gerado.</p>
      `);
    }
  } catch (error) {
    res.status(500).send('Erro ao exibir QR Code');
  }
});

// Inicializa o cliente do WhatsApp
const client = new Client();

// Evento para gerar o QR Code
client.on('qr', (qr) => {
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Erro ao gerar QR Code:', err);
      return;
    }
    qrCodeUrl = url; // Armazena o QR Code na variável global
    console.log('QR Code gerado com sucesso!');
  });
});

client.on('ready', () => {
  console.log('Tudo certo! WhatsApp conectado.');
  qrCodeUrl = null; // Limpa o QR Code após a conexão
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