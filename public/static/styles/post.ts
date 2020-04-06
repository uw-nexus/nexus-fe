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

  chipBox: {
    marginLeft: theme.spacing(-1)
  },

  submit: {
    margin: theme.spacing(5, 0, 2)
  }
}));
