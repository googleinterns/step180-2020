import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {drawerToggles} from './functions';
import {drawerWidth} from './constants';

const Root = styled.div`
  display: flex;
`;

const CustomDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  white-space: nowrap;

  ${drawerToggles}

  .MuiButtonBase-root {
    justify-content: center;
  }

  .MuiDrawer-paper {
    background-color: ${({theme}) => theme.palette.secondary.main};
    ${drawerToggles}
  }

  .MuiSvgIcon-root,.MuiDrawer-paper {
    color: ${({theme}) => theme.palette.secondary.contrastText} !important;
  }
`;

const Content = styled.main`
  flex-grow: 1;
  padding: ${({theme}) => theme.spacing(3)};
`;

const CustomAppBar = styled(AppBar)`
  z-index: ${({theme}) => theme.zIndex.drawer + 1};
`;

const CustomIconButton = styled(IconButton)`
  margin-right: 36px;
`;

export {CustomDrawer, Content, Root, CustomAppBar, CustomIconButton};
