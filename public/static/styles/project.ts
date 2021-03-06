import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  projectOuter: {
    padding: 0,
    paddingTop: '2rem',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  projectNav: {
    marginBottom: theme.spacing(6),
  },

  projectPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
    width: '100%',
    padding: theme.spacing(4),
  },

  projectMain: {
    position: 'relative',
    top: theme.spacing(-8),
    marginBottom: theme.spacing(-8),
    width: '100%',
  },

  projectPic: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },

  projectBasic: {
    marginTop: theme.spacing(2),
  },

  actionButton: {
    marginTop: theme.spacing(2),
  },

  peoplePaper: {
    padding: '.5rem',
    marginBottom: 0,
    justifyContent: 'center',
  },

  memberEntry: {
    backgroundColor: 'white',
    margin: '.5rem',
    padding: '.5rem',
    borderRadius: '25px',
  },
}));
