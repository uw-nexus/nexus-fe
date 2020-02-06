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
    padding: '2rem'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  }, 

  addButton: {
    minWidth: '100%',
    minHeight: '100%',
    fontSize: '1.5rem'
  },

  alert: {
    marginTop: '1rem'
  },

  link: {
    textDecoration: 'none',
    fontWeight: 'bold'
  }
}));
