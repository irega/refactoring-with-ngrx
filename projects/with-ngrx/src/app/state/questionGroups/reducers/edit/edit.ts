export function EDIT(state) {
  return [...state];
}

export function EDIT_SUCCESS(state, { questionGroup }) {
  const newState = [...state];
  const updatedQuestionGroupIndex = newState.findIndex(d => d && d.id === questionGroup.id);
  newState[updatedQuestionGroupIndex] = questionGroup;
  return newState;
}

export function EDIT_ERROR(state) {
  return [...state];
}
