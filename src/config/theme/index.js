import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  // Add special theming using this reference: https://material-ui.com/customization/default-theme/
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#006db3',
      light: '#63ccff',
      main: '#009be5',
    },
    secondary: {
      contrastText: '#fff',
      dark: '#464c56',
      light: '#10161e',
      main: '#18202c',
    },
  },
});

export {theme};
