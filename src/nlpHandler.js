
import nlp from 'compromise';

const analyzeIntent = (message) => {
  const doc = nlp(message.toLowerCase());

  if (doc.has('(oi|olá|ola|bom dia|boa tarde|boa noite)')) {
    return 'greeting';
  }
  if (doc.has('(menu|opções|ajuda)')) {
    return 'menu';
  }
  if (doc.has('(planos|valores|preços)')) {
    return 'plans';
  }
  if (doc.has('(benefícios|vantagens)')) {
    return 'benefits';
  }
  if (doc.has('(aderir|cadastrar|assinar)')) {
    return 'signup';
  }

  return 'unknown';
};

export default analyzeIntent;