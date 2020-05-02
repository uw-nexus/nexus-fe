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
        secondary: '#757575',
      },
    },
    typography: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      button: {
        textTransform: 'none',
      },
    },
  }),
);

export default theme;
