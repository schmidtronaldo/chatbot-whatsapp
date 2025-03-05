// Importações
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
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
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      'Nosso serviço oferece consultas médicas 24 horas por dia, 7 dias por semana, diretamente pelo WhatsApp.\n\nNão há carência, o que significa que você pode começar a usar nossos serviços imediatamente após a adesão.\n\nOferecemos atendimento médico ilimitado, receitas\n\nAlém disso, temos uma ampla gama de benefícios, incluindo acesso a cursos gratuitos.'
    );
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      'COMO FUNCIONA?\nÉ muito simples.\n\n1º Passo\nFaça seu cadastro e escolha o plano que desejar.\n\n2º Passo\nApós efetuar o pagamento do plano escolhido você já terá acesso a nossa área exclusiva para começar seu atendimento na mesma hora.\n\n3º Passo\nSempre que precisar.'
    );
    await simulateTyping(chat, 3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
  },
  '2': async (msg) => {
    const chat = await msg.getChat();
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      '*Plano Individual:* R$22,50 por mês.\n\n*Plano Família:* R$39,90 por mês, inclui você mais 3 dependentes.\n\n*Plano TOP Individual:* R$42,50 por mês, com benefícios adicionais como\n\n*Plano TOP Família:* R$79,90 por mês, inclui você mais 3 dependentes.'
    );
    await simulateTyping(chat, 3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
  },
  '3': async (msg) => {
    const chat = await msg.getChat();
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      'Sorteio de em prêmios todo ano.\n\nAtendimento médico ilimitado 24h por dia.\n\nReceitas de medicamentos.'
    );
    await simulateTyping(chat, 3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
  },
  '4': async (msg) => {
    const chat = await msg.getChat();
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      'Você pode aderir aos nossos planos diretamente pelo nosso site ou pelo WhatsApp.\n\nApós a adesão, você terá acesso imediato.'
    );
    await simulateTyping(chat, 3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
  },
  '5': async (msg) => {
    const chat = await msg.getChat();
    await simulateTyping(chat, 3000);
    await client.sendMessage(
      msg.from,
      'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui nesse whatsapp ou visite nosso site: https://site.com.'
    );
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
        `Olá! ${name.split(' ')[0]}, sou o assistente virtual da empresa tal. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas`
      );
    }

    // Resposta às opções do menu
    if (responses[msg.body]) {
      await responses[msg.body](msg);
    } else if (!msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
      // Fallback para mensagens não reconhecidas
      await client.sendMessage(
        msg.from,
        'Desculpe, não entendi. Por favor, digite uma das opções:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas'
      );
    }
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
  }
});

// Inicializa o cliente
client.initialize();