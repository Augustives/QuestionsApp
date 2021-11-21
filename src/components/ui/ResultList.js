import { 
  useContext,
  useState,
  useCallback
} from "react";
import { 
  Grid,
  Typography,
  Box
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Context } from '../../store'
import Result from "./Result";
import { evaluateResult } from '../../helpers/result'


const useStyles = makeStyles(theme => ({
  grid: {
    ...theme.tags.grid
  },
  button: {
    ...theme.typography.button
  },
  title: {
    ...theme.typography.title
  },
  resultBox: {
    border: '1px solid black',
    borderRadius: '32.5px',
    textAlign: 'center',
    margin: '10px'
  }
}))

function ResultList() {
  const classes = useStyles()
  const { state } = useContext(Context)
  const [ index, setIndex] = useState(0)
  const result = evaluateResult(state.questions)

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
        Questions Results
      </Typography>
      <Box className={classes.resultBox}>
        <Typography>
          Correct: {result.correct}
        </Typography>
        <Typography>
          Wrong: {result.wrong}
        </Typography>
      </Box>
    </Grid>
    <Result
      index={index}
      question={state.questions[index]}
      nextQuestion={nextQuestion}
      lastQuestion={lastQuestion} 
    />
  </Grid>
  );
}
  
export default ResultList;