import nlp from 'compromise';
import { readFileSync } from 'fs';

// Carrega as palavras-chave do arquivo JSON
const keywords = JSON.parse(readFileSync('./src/keywords.json', 'utf-8'));

const analyzeIntent = (message) => {
  try {
    if (typeof message !== 'string') {
      return 'unknown';
    }

    const doc = nlp(message.toLowerCase());

    // Verifica as intenções com base nas palavras-chave
    if (keywords.greetings.some(keyword => doc.has(keyword))) {
      return 'greeting';
    }
    if (keywords.menu.some(keyword => doc.has(keyword))) {
      return 'menu';
    }
    if (keywords.plans.some(keyword => doc.has(keyword))) {
      return 'plans';
    }
    if (keywords.benefits.some(keyword => doc.has(keyword))) {
      return 'benefits';
    }
    if (keywords.signup.some(keyword => doc.has(keyword))) {
      return 'signup';
    }

    return 'unknown';
  } catch (error) {
    console.error('Erro ao analisar intenção:', error);
    return 'unknown';
  }
};

export default analyzeIntent;