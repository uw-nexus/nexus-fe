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

  alert: {
    marginTop: '1rem'
  },

  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.primary.dark
  }
}));
