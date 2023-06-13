export function useFindIndexItem(state, id) {
  return state.findIndex((el) => el.id == id)
}
export function useFindIndexOpened(state, id) {
  return state.findIndex((el) => el == id)
}
