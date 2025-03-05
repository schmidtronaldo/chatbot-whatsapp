# Chatbot para integrar com whatsapp ou outro app de mensageria...

<p> Basta ajustar os arquivos .json a suas necessidades e rodar o código.</p></br>
<p> Aparecera um qr-code no terminal que poderá implementar com seu app 





## Estrutura do projeto

/chatbot
│
├── /src
│   ├── chatbot.js          
│   ├── nlpHandler.js       
│   ├── contextHandler.js  
│   ├── responses.js        
│   ├── simulateTyping.js   
│   ├── messages.json       
│   └── keywords.json      
│
└── package.json            


## Como executar

> Instale as dependências:
   
    ` npm install `

    Execute o chatbot:
   
    ` node src/chatbot.js `

9. Melhorias futuras

- Adicionar mais intenções: Expandir a função analyzeIntent para reconhecer mais cenários.

- Integrar com banco de dados: Armazenar o contexto e histórico de conversas.

- Usar APIs de NLP avançadas: Como Dialogflow ou LUIS para reconhecimento de intenções mais complexo.