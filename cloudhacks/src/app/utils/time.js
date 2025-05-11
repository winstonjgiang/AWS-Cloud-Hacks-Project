
const formatDate = (date) => {
  return date.toISOString()
};
export const today = () => {
  const now = new Date();
  return formatDate(now);
};

export const oneWeekBefore = () => {
  const now = new Date();
  const oneWeekBefore = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return formatDate(oneWeekBefore);
};

export const oneHourFromNow = () => {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return formatDate(oneHourFromNow);
};

console.log(oneWeekBefore());