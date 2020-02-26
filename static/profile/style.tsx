import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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

  profilePaper: {
    width: '100%',
    minHeight: '60vh',
    marginBottom: 0,
    borderRadius: '25px 25px 0 0',
    justifyContent: 'flex-start',
    padding: 0
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
  },

  tab: {
    textAlign: 'center'
  },

  highlight: {
    color: 'orange',
    borderBottom: '2px solid orange',
    borderRadius: 0
  }
}));
