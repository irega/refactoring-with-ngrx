export function CREATE(state) {
  return [...state];
}

export function CREATE_SUCCESS(state, { questionGroup }) {
  return [questionGroup, ...state];
}

export function CREATE_ERROR(state) {
  return [...state];
}
