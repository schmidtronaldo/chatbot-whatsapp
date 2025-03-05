# Chatbot para integrar com whatsapp ou outro app de mensageria...

<p> Basta ajustar os arquivos .json a suas necessidades e rodar o código.</p></br>
<p> Aparecera um qr-code no terminal que poderá implementar com seu app 





## Estrutura do projeto

/chatbot
│
├── /src
│   ├── chatbot.js          # Código principal do chatbot
│   ├── nlpHandler.js       # Lógica de NLP e análise de intenções
│   ├── contextHandler.js   # Gerenciamento de contexto do usuário
│   ├── responses.js        # Respostas do chatbot
│   ├── simulateTyping.js   # Função para simular digitação
│   ├── messages.json       # Mensagens do chatbot
│   └── keywords.json       # Palavras-chave
│
└── package.json            # Dependências do projeto


## Como executar

> Instale as dependências:
   
    ` npm install `

    Execute o chatbot:
   
    ` node src/chatbot.js `

9. Melhorias futuras

- Adicionar mais intenções: Expandir a função analyzeIntent para reconhecer mais cenários.

- Integrar com banco de dados: Armazenar o contexto e histórico de conversas.

- Usar APIs de NLP avançadas: Como Dialogflow ou LUIS para reconhecimento de intenções mais complexo.