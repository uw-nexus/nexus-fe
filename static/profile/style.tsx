import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '2rem'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    borderRadius: '10px'
  },

  profileOuter: {
    padding: 0,
    justifyContent: 'space-between',
    minHeight: '100vh'
  },

  profileMain: {
    minHeight: '20vh',
    marginBottom: '2rem'
  },

  profilePaper: {
    width: '100%',
    minHeight: '60vh',
    marginBottom: 0,
    borderRadius: '25px 25px 0 0',
    justifyContent: 'flex-start'
  },

  profilePic: {
    width: theme.spacing(16),
    height: theme.spacing(16)
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  addButton: {
    minWidth: '100%',
    minHeight: '100%'
  }
}));
