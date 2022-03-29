export function formatDate(input) {
  const [year, month, day] = input.split("/");
  const date = `${day}/${month}/${year}`;
  return date;
}
