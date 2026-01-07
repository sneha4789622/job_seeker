export const daysAgo = (date) => {
  const today = new Date();
  const createdDate = new Date(date);
  const diffTime = today - createdDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
