import { 
  useContext,
} from "react";
import { 
  Button,
  Grid,
  Typography
} from "@mui/material";
import { Context } from '../../store'
import { setView, addQuestions } from '../../store/actions/'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles'


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

function StartCancel() {
  const classes = useStyles() 
  const { state, dispatch } = useContext(Context)

  const handleStart = async () => {
    await addQuestions(dispatch, state.numberOfQuestions)
    console.log(state.questions)
    if (state.questions === []) {
      setView(dispatch, 'Error')
    } else {
      setView(dispatch, 'QuestionsList')
    }
  }
  
  const handleCancel = () => {
    setView(dispatch, 'QuestionsSelector')
  }

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
            Start Answering or Cancel
          </Typography>
        </Grid>

      <Grid item xs={12}>
        <Button
          color='secondary'
          className={classes.button} 
          endIcon={<ClearIcon/>}
          variant='contained'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          className={classes.button} 
          endIcon={<PlayArrowIcon/>}
          variant='contained'
          onClick={handleStart}
        >
          Start
        </Button>
      </Grid>
    </Grid>
      
  );
}
  
export default StartCancel;