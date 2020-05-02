import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#F05A28',
      },
      secondary: {
        main: '#FAAF3F',
      },
      text: {
        secondary: '#C4C4C4',
      },
    },
  }),
);

export default theme;
