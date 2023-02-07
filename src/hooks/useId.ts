export function useId() {
  return crypto.randomUUID().slice(0, 8)
}
