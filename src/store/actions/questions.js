import { createQuestion } from '../../helpers/factories/question'


const axios = require('axios');

const setView = (dispatch, view) => {
  dispatch({type: 'setView', payload: view})
}

const setNumOfQuestions = (dispatch, numOfQuestions) => {
  dispatch({type: 'setNumOfQuestions', payload: numOfQuestions})
}

const addQuestions = async (dispatch, numOfQuestions) => {
  await axios.get(`https://opentdb.com/api.php?amount=${numOfQuestions}`)
    .then((response) => {
      if (response.data.response_code === 0) {
        console.log('api ok')
        let questions = []
        for (let questionJson of response.data.results) {
          let question = createQuestion(questionJson)
          questions.push(question)
        }
        dispatch({type: 'setQuestions', payload: questions})
      } else {
        dispatch({type: 'setQuestions', payload: []})
      }
    })
    .catch((error) => {
      dispatch({type: 'setQuestions', payload: []})
    })

}

const setQuestions = (dispatch, questions) => {
  dispatch({type: 'setQuestions', payload: questions})
}

const setResult = (dispatch, index, result) => {
  dispatch({type: 'setResult', payload: {result: result, index: index}})
}

export {
  setView,
  setNumOfQuestions,
  addQuestions,
  setQuestions,
  setResult
}
