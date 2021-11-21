import shuffleArray from "./shuffleArray"

export default function makeAnswersArray(question) {
  if (question.questionObject.type === 'multiple') {
    return shuffleArray(question.getAllAnswers)
  } else {
    return ['True', 'False']
  }
}