import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { ErrorModalProps } from './Error.entity'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.error.contrastText,
      padding: theme.spacing(4, 4, 4),
      margin: '10%',
      maxWidth: '35%',
    },
  })
)

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  const classes = useStyles()
  const { error, setError } = props

  const handleClose = () => {
    setError(false)
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={error}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={error}>
          <Paper className={classes.paper}>
            <div>
              <Typography gutterBottom color='error' variant='h4'>
                Sorry! We could not process your request
              </Typography>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  )
}

export default ErrorModal
