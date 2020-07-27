import {css} from 'styled-components';
import {drawerWidth} from './constants';

/**
 * To return drawer styles when is open.
 *
 * @param {object} theme
 * @return {css} drawer styles when opened
 */
const getOpenDrawerStyles = (theme) => css`
  width: ${drawerWidth}px;
  transition: ${theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })};
`;

/**
 * To return drawer styles when is closed.
 *
 * @param {object} theme
 * @return {css} drawer styles when closed
 */
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

/**
 * To return drawer styles according to
 * the opened state
 *
 * @param {{open: boolean, theme: object}} props
 * @return {css} styles according to open state
 */
const drawerToggles = ({open, theme}) => {
  if (open) return getOpenDrawerStyles(theme);
  return getClosedDrawerStyles(theme);
};

/**
 * To return menu tab styles when is active.
 *
 * @param {object} theme
 * @return {css} menu tab styles when active
 */
const getActiveTabStyles = (theme) => css`
  color: ${theme.palette.primary.main};

  .MuiSvgIcon-root {
    color: ${theme.palette.primary.main};
  }
`;

/**
 * To return active styles for navigation tab
 * only when is active
 *
 * @param {{active: boolean, theme: object}} props
 * @return {css} styles according to ac state
 */
const tabToggle = ({active, theme}) => {
  if (active) return getActiveTabStyles(theme);
};

export {drawerToggles, tabToggle};
