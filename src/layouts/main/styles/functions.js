import {css} from 'styled-components';
import {drawerWidth} from './constants';

const getOpenDrawerStyles = (theme) => css`
  width: ${drawerWidth}px;
  transition: ${theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })};
`;

const getClosedDrawerStyles = (theme) => css`
  transition: ${theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })};
  overflow-x: hidden;
  width: ${theme.spacing(9) + 1}px;

  .MuiListItemText-root {
    visibility: hidden;
  }
`;

const drawerToggles = ({open, theme}) => {
  if (open) return getOpenDrawerStyles(theme);
  return getClosedDrawerStyles(theme);
};

const getActiveTabStyles = (theme) => css`
  color: ${theme.palette.primary.main};

  .MuiSvgIcon-root {
    color: ${theme.palette.primary.main};
  }
`;

const tabToggle = ({active, theme}) => {
  if (active) return getActiveTabStyles(theme);
};

export {drawerToggles, tabToggle};
