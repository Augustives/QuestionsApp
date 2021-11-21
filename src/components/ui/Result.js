import {
    useContext,
    useMemo
  } from "react";
import { Context } from '../../store'
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
import { makeStyles } from '@mui/styles';
import { setView } from '../../store/actions'
import makeAnswersArray from "../../helpers/makeAnswersArray";

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
  },
  correctAnswerRadio: {
    margin: '5px',
    border: '3px solid',
    borderColor: theme.palette.common.correctGreen,
    borderRadius: '32.5px',
    padding: '5px'
  },
}))

function Result({ index, question, nextQuestion, lastQuestion}) {
  const classes = useStyles() 
  const { state, dispatch } = useContext(Context)
  const answersArray = useMemo(() => makeAnswersArray(question), [question])

  const isCorrect = () => {
    if (question.chosenAnswer === question.questionObject.correctAnswer) {
      return 'Correct'
    } else {
      return 'Wrong'
    }
  }
  const handleNextClick = () => {
    nextQuestion()
  } 

  const handleFinish = () => {
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
              Question {index+1} - Result: {isCorrect()} 
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
                  className={answer === question.questionObject.correctAnswer ? 
                    classes.correctAnswerRadio : classes.answerRadio}
                  key={index} 
                  value={answer} 
                  label={answer} 
                  control={<Radio
                    checked={Boolean(question.chosenAnswer === answer)} 
                    disabled />} 
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
          {index === state.questions.length-1 ? 
          <Grid item>
            <Button
              margin='auto'
              color='secondary'
              className={classes.button} 
              variant='contained'
              onClick={handleFinish}
            >
              
              Restart
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

export default Result;