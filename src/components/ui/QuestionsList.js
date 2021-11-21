import { 
  useContext,
  useState,
  useCallback
} from "react";
import Question from "./Question";
import { 
  Grid,
  Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Context } from '../../store'


const useStyles = makeStyles(theme => ({
  grid: {
    ...theme.tags.grid
  },
  button: {
    ...theme.typography.button
  },
  title: {
    ...theme.typography.title
  }
}))

function QuestionsList() {
  const classes = useStyles() 
  const { state } = useContext(Context)
  const [ index, setIndex] = useState(0)

  const nextQuestion = useCallback(() => {
    setIndex(current => current + 1)
  }, [setIndex]) 
  
  const lastQuestion = useCallback(() => {
    setIndex(current => current - 1)
  }, [])

  return (
  <Grid
    className={classes.grid}
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <Grid item xs={12}>
      <Typography className={classes.title}>
        Answer the Questions
      </Typography>
    </Grid>
    <Question
      index={index}
      question={state.questions[index]}
      nextQuestion={nextQuestion}
      lastQuestion={lastQuestion} 
    />
  </Grid>
  );
}
  
export default QuestionsList;