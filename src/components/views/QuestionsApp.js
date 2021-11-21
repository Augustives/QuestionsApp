import { useContext } from "react";
import { Container } from "@mui/material";
import QuestionsSelector from '../ui/QuestionsSelector'
import StartCancel from '../ui/StartCancel'
import QuestionsList from '../ui/QuestionsList'
import ResultList from '../ui/ResultList'
import Error from '../ui/Error'
import { Context } from '../../store/'


function QuestionsApp() {
  const { state } = useContext(Context)

  const viewSwitch = (view) => {
    switch (view) {
      case 'QuestionsSelector':
        return <QuestionsSelector />
      case 'StartCancel':
        return <StartCancel />
      case 'QuestionsList':
        return <QuestionsList />
      case 'ResultList':
        return <ResultList />
      case 'Error':
        return <Error />
      default:
        break;
    }
  }
  
  return (
    <Container maxWidth='md'>
      {viewSwitch(state.currentView)}
    </Container>
  );
}
  
export default QuestionsApp;