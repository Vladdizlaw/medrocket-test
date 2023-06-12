export function useFindIndexOpenedItem (state, id) {
    return state.findIndex((el) => el == id)
}