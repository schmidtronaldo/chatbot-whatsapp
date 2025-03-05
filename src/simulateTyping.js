
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const simulateTyping = async (chat, duration) => {
  try {
    await chat.sendStateTyping();
    await delay(duration);
    await chat.sendStateTyping(false); // Para de simular a digitação
  } catch (error) {
    console.error('Erro ao simular digitação:', error);
  }
};

export default simulateTyping;