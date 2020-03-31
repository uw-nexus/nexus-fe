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
  }
}));
