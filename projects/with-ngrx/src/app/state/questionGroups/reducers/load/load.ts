export function LOAD(state) {
  return [...state];
}

export function LOAD_SUCCESS(_state, { questionGroups }) {
  return [...questionGroups];
}

export function LOAD_ERROR(state) {
  return [...state];
}
