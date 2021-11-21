import { 
  useContext,
} from "react";
import { 
  Button,
  Grid,
  Typography
} from "@mui/material";
import { Context } from '../../store'
import { setView } from '../../store/actions/'
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

function Error() {
  const classes = useStyles() 
  const { dispatch } = useContext(Context)

  const handleTryAgain = () => {
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
            An error ocurred while getting the questions!
          </Typography>
        </Grid>

      <Grid item xs={12}>
        <Button
          color='secondary'
          className={classes.button} 
          variant='contained'
          onClick={handleTryAgain}
        >
          Try Again
        </Button>
      </Grid>
    </Grid>
      
  );
}
  
export default Error;