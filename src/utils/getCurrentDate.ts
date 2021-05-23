export function getCurrentDate() {
  const today = new Date();

  const day = String(today.getDate());
  const month = String(today.getMonth());
  const year = String(today.getFullYear());

  const fullMonth = month.length !== 2 ? `0${month}` : month;

  return `${day}/${fullMonth}/${year}`;
}
