export function getCurrencyNumber(number: number) {
  return number.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  }).replace(/\,00$/, "");
}