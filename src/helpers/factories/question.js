const format = (htmlStr) => {
  return htmlStr
        .replaceAll('&amp;quot;', "'")  
        .replaceAll('&#039;', "'")
        .replaceAll('&quot;', '"')  
        .replaceAll(/&quot;/g, '"')
        
}

export const createQuestion = (questionJson) => {
  const questionObject = {
    category: questionJson.category,
    type: questionJson.type,
    difficulty: questionJson.difficulty,
    question: format(questionJson.question),
    correctAnswer: questionJson.correct_answer,
    incorrectAnswers: questionJson.incorrect_answers
  }
  let chosenAnswer = ''

  function getAllAnswers() {
    return questionObject.incorrectAnswers.concat(questionObject.correctAnswer)
  }

  return {
    questionObject: questionObject,
    chosenAnswer: chosenAnswer,
    getAllAnswers: getAllAnswers(),
  }
}
