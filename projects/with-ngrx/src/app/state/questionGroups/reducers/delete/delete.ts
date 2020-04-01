export function DELETE(state) {
  return [...state];
}

export function DELETE_SUCCESS(state, { questionGroupId }) {
  const newState = [...state];
  const deletedQuestionGroupIndex = newState.findIndex(d => d.id === questionGroupId);
  newState.splice(deletedQuestionGroupIndex, 1);
  return newState;
}

export function DELETE_ERROR(state) {
  return [...state];
}
