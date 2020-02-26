import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  projectOuter: {
    padding: 0,
    paddingTop: '2rem',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

  projectNav: {
    marginBottom: theme.spacing(6)
  },

  projectPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
    width: '100%',
    padding: theme.spacing(4)
  },

  projectMain: {
    position: 'relative',
    top: theme.spacing(-8),
    marginBottom: theme.spacing(-8),
    width: '100%'
  },

  grayed: {
    color: 'gray'
  },

  projectPic: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },

  projectBasic: {
    marginTop: theme.spacing(2)
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
