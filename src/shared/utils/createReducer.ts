type ReducerHandlers<T> = Record<
  string,
  (state: T, action: { type: string; payload?: unknown }) => T
>

export const CreateReducer = <T>(
  initialState: T,
  handlers: ReducerHandlers<T>,
) => {
  return function reducer(
    action: { type: string; payload?: unknown },
    state = initialState,
  ): T {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
