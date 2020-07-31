import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  // Add special theming using this reference: https://material-ui.com/customization/default-theme/
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#10161e',
      main: '#18202c',
      dark: '#464c56',
      contrastText: '#fff',
    },
  },
});

export {theme};
