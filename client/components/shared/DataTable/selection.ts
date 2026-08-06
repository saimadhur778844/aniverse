export function toggleSelection(
  selected: string[],
  id: string
) {
  return selected.includes(id)
    ? selected.filter(
        (item) =>
          item !== id
      )
    : [...selected, id];
}

export function selectAll(
  ids: string[]
) {
  return [...ids];
}

export function clearSelection() {
  return [];
}