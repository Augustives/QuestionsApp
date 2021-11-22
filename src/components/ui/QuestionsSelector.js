import { 
  useContext,
  useEffect
} from "react";
import { 
  Button,
  Grid,
  Typography,
  TextField,
 } from "@mui/material";
 import { useFormik } from 'formik';
 import * as yup from 'yup';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import { makeStyles } from '@mui/styles'
import { setView, setNumOfQuestions, setQuestions } from '../../store/actions/'
import { Context } from '../../store'
import { getResult } from '../../helpers/result'


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

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Must be a number')
    .min(1, 'Min value is 1')
    .max(50, 'Max value is 50')
    .integer('Must be an integer number')
    .required('Amount is required')
});

function QuestionsSelector() {
  const { state, dispatch } = useContext(Context)
  const classes = useStyles()
  const formik = useFormik({
      initialValues: {
        amount: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setNumOfQuestions(dispatch, values.amount)
        setView(dispatch, 'StartCancel')
      }
  })

  const handleLastTest = () => {
    setView(dispatch, 'ResultList')
  }

  useEffect(() => {
    setQuestions(dispatch, getResult())
  }, [dispatch])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        className={classes.grid}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Select Number of Questions
          </Typography>
        </Grid>

        <Grid item xs={12}>
              <TextField
                type='text'
                name='amount'
                label="Amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.amount && formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount ? 
                  formik.errors.amount: null}
              />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            color='primary'
            className={classes.button} 
            endIcon={<SaveIcon/>}
            variant='contained'
            disabled={!Boolean(state.questions)}
            onClick={handleLastTest}
          >
            Last Test
          </Button>
          <Button
            color='primary'
            className={classes.button} 
            type='submit'
            endIcon={<PlayArrowIcon/>}
            variant='contained'
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default QuestionsSelector;