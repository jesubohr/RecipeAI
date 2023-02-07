const capitalize = (text: string) =>
  text
    .split(" ")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ")

export function useOptionList(list: string[]) {
  return list.map((str) => ({
    label: capitalize(str),
    value: str
  }))
}
