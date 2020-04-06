import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  outer: {
    paddingTop: '2rem',
    minHeight: '100%'
  },

  projectCard: {
    marginBottom: '1rem',
    padding: '.5rem'
  },

  cardItem: {
    margin: '1rem'
  },

  projectPic: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },

  tabNav: {
    marginBottom: '2rem'
  },

  tab: {
    textAlign: 'center'
  },

  highlight: {
    color: 'orange',
    borderBottom: '2px solid orange',
    borderRadius: 0
  },

  createButtonContainer: {
    position: 'fixed',
    bottom: '4rem',
    padding: 0,
    right: 0,
    margin: '2rem',
    borderRadius: '50%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
  },

  createButtonIcon: {
    width: '3rem',
    height: '3rem'
  }
}));
