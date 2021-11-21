import questionsReducer from './questionsReducer'

const initialState = {
  currentView: 'QuestionsSelector',
  numberOfQuestions: '',
  questions: [],
}

export {
  initialState,
  questionsReducer
}