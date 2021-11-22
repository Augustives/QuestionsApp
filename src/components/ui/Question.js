import {
  useState, 
  useContext,
  useMemo
} from "react";
import { 
  Box,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { setResult, setView } from '../../store/actions'
import { Context } from '../../store'
import { makeStyles } from '@mui/styles';
import makeAnswersArray from "../../helpers/makeAnswersArray";
import { saveResult } from "../../helpers/result";

const useStyles = makeStyles(theme => ({
  button: {
    ...theme.typography.button
  },
  box: {
    border: '1px solid black',
    borderRadius: '32.5px',
    minHeight: '30rem',
    minWidth: '35rem',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column'
  },
  questionTitle: {
    color: 'black',
    fontSize: '1.2rem',
    margin: '0.5rem'
  },
  questionText: {
      color: 'black',
      fontSize: '1rem',
      marginTop: '5px',
      marginLeft: '15px',
  },
  gridRow: {
    alignItems: 'flex-end'
  },
  answerRadio: {
    margin: '5px'
  }
}))

function Question({ index, question, nextQuestion, lastQuestion}) {
  const classes = useStyles() 
  const { state, dispatch } = useContext(Context)
  const answersArray = useMemo(() => makeAnswersArray(question), [question])
  const [ chosenAnswer, setChosenAnswer ] = useState('')
  
  const handleNextClick = () => {
    setResult(dispatch, index, chosenAnswer)
    nextQuestion()
  } 

  const handleFinish = () => {
    setResult(dispatch, index, chosenAnswer)
    saveResult(state.questions)
    setView(dispatch, 'ResultList')
  }

  const leave = () => {
    saveResult(state.questions)
    setView(dispatch, 'QuestionsSelector')
  }

  return (
    <Box className={classes.box}>
      <Box maxWidth='33rem'>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
        >
          <Grid alignSelf="center" item xs={12}>
            <Typography component={'p'} className={classes.questionTitle}>
              Question {index+1}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component={'p'} className={classes.questionText}>
              {question.questionObject.category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component={'p'} className={classes.questionText}>
              {'Difficulty: '}
              {question.questionObject.difficulty.charAt(0).toUpperCase() + question.questionObject.difficulty.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography component={'p'} className={classes.questionText}>
                {question.questionObject.question}
              </Typography>       
          </Grid>
          <Grid item xs={12}>
            <Typography component={'div'} className={classes.questionText}>
              <RadioGroup>
                {answersArray.map((answer, index) => (
                  <FormControlLabel
                  className={classes.answerRadio} 
                  key={index} 
                  value={answer} 
                  label={answer} 
                  control={<Radio />} 
                  onClick={(event) => setChosenAnswer(event.target.value)}
                  />
                ))}
              </RadioGroup>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid
        className={classes.gridRow}
        container
        direction="row"
        justifyContent='space-between'
        >
          <Grid item>
            <Button
              color='primary'
              className={classes.button} 
              variant='contained'
              onClick={lastQuestion}
              disabled={Boolean(index===0)}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color='secondary'
              className={classes.button} 
              variant='contained'
              onClick={leave}
            >
              Leave
            </Button>
          </Grid>
          {index === state.questions.length-1 ? 
          <Grid item>
            <Button
              margin='auto'
              color='secondary'
              className={classes.button} 
              variant='contained'
              onClick={handleFinish}
            >
              Finish
            </Button>
          </Grid> : 
          <Grid item>
            <Button
              margin='auto'
              color='primary'
              className={classes.button} 
              variant='contained'
              onClick={handleNextClick}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>}
        </Grid>
    </Box>
  );
}

export default Question;