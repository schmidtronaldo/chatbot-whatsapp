
const userContexts = {};

const getContext = (userId) => {
  if (!userContexts[userId]) {
    userContexts[userId] = { lastIntent: null, data: {} };
  }
  return userContexts[userId];
};

export { getContext };