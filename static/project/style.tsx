import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
  theme.palette.primary.main = '#F05A28';
  theme.palette.secondary.main = '#FAAF3F';

  return ({
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

    projectPic: {
      width: theme.spacing(8),
      height: theme.spacing(8)
    },

    projectBasic: {
      marginTop: theme.spacing(2)
    },

    actionButton: {
      marginTop: theme.spacing(2)
    }
  })
});
