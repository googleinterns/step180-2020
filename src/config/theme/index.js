import {createMuiTheme} from '@material-ui/core/styles';
import {css} from 'styled-components';

const prebuiltTheme = createMuiTheme({
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

const theme = {
  ...prebuiltTheme,
  media: Object.keys(prebuiltTheme.breakpoints.values).reduce((acc, label) => {
    acc[label] = (...args) =>
      css`
        @media (max-width: ${prebuiltTheme.breakpoints.values[label] / 16}em) {
          ${css(...args)};
        }
      `;

    return acc;
  }, {}),
};

export {theme};
