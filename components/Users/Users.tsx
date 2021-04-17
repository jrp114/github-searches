import React, { useState } from 'react'
import UserCardModal from './UserCard'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'
import { Link } from '@material-ui/core'
import ErrorModal from '../Error/ErrorModal'
import { getUser } from '../../helpers/data-fetcher'
import { UsersProps } from './Users.entity'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      padding: theme.spacing(1),
      textAlign: 'center',
      justifyContent: 'center',
      margin: 'auto',
      width: '35%',
      fontFamily: 'roboto',
      color: '#03f4fc',
      textShadow: '5px 5px 11px black',
    },
    paper: {
      padding: theme.spacing(2),
      justifyContent: 'center',
      margin: 'auto',
      width: '35%',
      boxShadow: '5px 5px 15px black',
    },
    paperResults: {
      padding: theme.spacing(2),
      marginTop: 15,
      justifyContent: 'center',
      margin: 'auto',
      width: '35%',
      boxShadow: '5px 5px 15px black',
    },
    textField: {
      width: '100%',
    },
    pagnation: {
      paddingTop: 15,
      paddingBottom: 15,
    },
    search: {
      paddingLeft: 5,
    },
    pageNumber: {
      width: '25%',
    },
  })
)

const Users: React.FC<UsersProps> = (props) => {
  const classes = useStyles()
  const {
    updateSearchString,
    handleSearchCall,
    handleKeyPressSearchCall,
    setPage,
    setShowErrorModal,
    currentPage,
    users,
    error,
  } = props

  const [showModal, setShowModal] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const handleUserModal = async (user) => {
    const data = await getUser(user.url)
    if (data.error) {
      setShowErrorModal(true)
    } else {
      setUserDetail(data)
      setShowModal(true)
    }
  }

  const changePagnation = (e, pageNumber) => {
    setPage(pageNumber)
  }

  const numberOfPages =
    users?.total_count != 0 && users?.total_count <= 1000
      ? Math.round(users?.total_count / 10)
      : users?.total_count != 0 && users?.total_count > 1000
      ? 1000 / 10
      : 0

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h2'
        color='secondary'
      >
        GitHub User Search
      </Typography>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={8}>
            <TextField
              className={classes.textField}
              label="Let's Find Someone"
              onChange={updateSearchString}
              onKeyPress={handleKeyPressSearchCall}
              variant='outlined'
            />
          </Grid>
          <Grid className={classes.search} item xs={4}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={handleSearchCall}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {currentPage >= 1 ? (
          <Pagination
            className={classes.pagnation}
            count={numberOfPages}
            onChange={changePagnation}
            color='primary'
          />
        ) : null}
        {currentPage >= 1 ? (
          <Typography gutterBottom variant='subtitle1'>
            Total Count: {users?.total_count}
          </Typography>
        ) : null}
      </Paper>

      {users.items.length > 0 && (
        <Paper className={classes.paperResults}>
          {users?.items?.map((user) => (
            <div>
              <Typography gutterBottom variant='h6'>
                <Link
                  href='#'
                  underline='hover'
                  className='users'
                  onClick={() => handleUserModal(user)}
                >
                  {user.login}
                </Link>
              </Typography>
            </div>
          ))}
        </Paper>
      )}
      {showModal ? (
        <UserCardModal
          user={userDetail}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      ) : null}
      {error ? <ErrorModal error={error} setError={setShowErrorModal} /> : null}
    </div>
  )
}

export default Users
