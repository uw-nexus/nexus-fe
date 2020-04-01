import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  profileOuter: {
    padding: 0,
    paddingTop: '2rem',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  profileHeader: {
    marginBottom: '2rem'
  },

  profileMain: {
    minHeight: '20vh',
    marginBottom: '2rem'
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
