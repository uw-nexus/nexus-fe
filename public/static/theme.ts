import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { COLORS } from './styles/constants';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#F05A28',
        light: '#F27348',
      },
      text: {
        primary: COLORS.BLACK,
        secondary: COLORS.GRAY_75,
      },
    },
    typography: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      button: {
        textTransform: 'none',
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
  }),
);

export default theme;
