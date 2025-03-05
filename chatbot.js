// Importações
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import fs from 'fs';

// Carrega as mensagens do arquivo JSON
const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'));

// Inicializa o cliente
const client = new Client();

// Função para simular digitação
const simulateTyping = async (chat, duration) => {
  await chat.sendStateTyping();
  await delay(duration);
};

// Função para criar um delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Respostas do chatbot
const responses = {
  '1': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['1']) {
      await simulateTyping(chat, 3000);
      await client.sendMessage(msg.from, message);
    }
  },
  '2': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['2']) {
      await simulateTyping(chat, 3000);
      await client.sendMessage(msg.from, message);
    }
  },
  '3': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['3']) {
      await simulateTyping(chat, 3000);
      await client.sendMessage(msg.from, message);
    }
  },
  '4': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['4']) {
      await simulateTyping(chat, 3000);
      await client.sendMessage(msg.from, message);
    }
  },
  '5': async (msg) => {
    const chat = await msg.getChat();
    for (const message of messages.options['5']) {
      await simulateTyping(chat, 3000);
      await client.sendMessage(msg.from, message);
    }
  },
};

// Inicialização do cliente
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Tudo certo! WhatsApp conectado.');
});

client.on('message', async (msg) => {
  try {
    if (!msg.body || !msg.from.endsWith('@c.us')) return;

    // Resposta inicial ao comando "menu" ou saudações
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
      const chat = await msg.getChat();
      await simulateTyping(chat, 3000);
      const contact = await msg.getContact();
      const name = contact.pushname;
      await client.sendMessage(
        msg.from,
        messages.greetings.welcome.replace('{name}', name.split(' ')[0])
      );
    }

    // Resposta às opções do menu
    if (responses[msg.body]) {
      await responses[msg.body](msg);
    } else if (!msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
      // Fallback para mensagens não reconhecidas
      await client.sendMessage(msg.from, messages.greetings.fallback);
    }
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
  }
});

// Inicializa o cliente
client.initialize();