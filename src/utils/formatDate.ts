export function formatDate(date: Date) {
  const day = String(date.getDate());
  const month = String(date.getMonth());
  const year = String(date.getFullYear());

  const fullMonth = month.length !== 2 ? `0${month}` : month;

  return `${day}/${fullMonth}/${year}`;
}
