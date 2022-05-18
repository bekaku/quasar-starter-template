export const addDateByDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
export const getYearNow = () => {
  return new Date().getFullYear();
};
