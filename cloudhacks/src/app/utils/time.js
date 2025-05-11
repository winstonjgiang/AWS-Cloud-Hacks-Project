
const oneWeekBefore = () => {
  const now = new Date();
  const oneWeekBefore = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return oneWeekBefore;
};

console.log(oneWeekBefore());