
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const simulateTyping = async (chat, duration) => {
  await chat.sendStateTyping();
  await delay(duration);
};

export default simulateTyping;