const questionsReducer = (state, action) => {
  switch (action.type) {
    case 'setView':
      return { ...state, currentView: action.payload }
    case 'setNumOfQuestions':
      return { ...state, numberOfQuestions: action.payload}
    case 'setQuestions':
      return { ...state, questions: action.payload }
    case 'setResult':
      const newQuestions = [...state.questions]
      newQuestions[action.payload.index].chosenAnswer = action.payload.result
      return { ...state, questions:  newQuestions}
    default:
        return state
  }
} 

export default questionsReducer