export function getCellValue<
  T
>(
  row: T,
  accessor?: keyof T
) {
  if (!accessor) return "";

  const value =
    row[accessor];

  if (
    value === null ||
    value === undefined
  )
    return "";

  return String(value);
}