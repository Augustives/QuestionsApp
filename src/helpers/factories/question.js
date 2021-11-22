const format = (html) => {
  if (typeof(html) === 'string') {
    return html
          .replaceAll('&amp;quot;', "'")  
          .replaceAll('&#039;', "'")
          .replaceAll('&quot;', '"')  
          .replaceAll(/&quot;/g, '"')
          .replaceAll('&euml;','ë')
  } else if (typeof(html) === 'object') {
    const newArray = []
    for (let item of html) {
      newArray.push(
        item
          .replaceAll('&amp;quot;', "'")  
          .replaceAll('&#039;', "'")
          .replaceAll('&quot;', '"')  
          .replaceAll(/&quot;/g, '"')
          .replaceAll('&euml;','ë')
      )
      return newArray
    } 
  }
}

export const createQuestion = (questionJson) => {
  const questionObject = {
    category: format(questionJson.category),
    type: format(questionJson.type),
    difficulty: format(questionJson.difficulty),
    question: format(questionJson.question),
    correctAnswer: format(questionJson.correct_answer),
    incorrectAnswers: format(questionJson.incorrect_answers)
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
