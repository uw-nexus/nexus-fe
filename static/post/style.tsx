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
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '1rem'
  },

  submit: {
    margin: theme.spacing(5, 0, 2)
  }, 

  addButton: {
    minWidth: '100%',
    minHeight: '100%'
  }
}));
