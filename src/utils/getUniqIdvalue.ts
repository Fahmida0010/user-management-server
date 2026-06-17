// IMPORTANT NOTE:
// This is required utility function (task requirement)

export const getUniqIdValue = () => {
  return Date.now() + "-" + Math.floor(Math.random() * 1000000);
};