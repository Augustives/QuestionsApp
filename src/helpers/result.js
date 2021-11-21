const saveResult = (result) => {
  localStorage.setItem('questionsAppResult', JSON.stringify(result))
}

const getResult = () => {
  return JSON.parse(localStorage.getItem('questionsAppResult'))
}

const evaluateResult = (questions) => {
  const result = {
    correct: 0,
    wrong: 0
  }
  for (let question of questions) {
    if (question.chosenAnswer === question.questionObject.correctAnswer) {
      result.correct ++
    } else {
      result.wrong ++
    }
  }
  return result
}

export {
  saveResult,
  getResult,
  evaluateResult
}