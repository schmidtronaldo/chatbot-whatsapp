
const userContexts = {};

const getContext = (userId) => {
  try {
    if (!userContexts[userId]) {
      userContexts[userId] = { lastIntent: null, data: {} };
    }
    return userContexts[userId];
  } catch (error) {
    console.error('Erro ao obter contexto:', error);
    return { lastIntent: null, data: {} };
  }
};

export { getContext };