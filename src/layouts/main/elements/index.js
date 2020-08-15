import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';
import {getDrawerStyles, getActiveTabStyles} from './functions';
import {drawerWidth} from './constants';

const Content = styled.main`
  flex-grow: 1;
  padding: ${({theme}) => theme.spacing(3)};
`;

const CustomAppBar = styled(AppBar)`
  z-index: ${({theme}) => theme.zIndex.drawer + 1};
`;

const CustomDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  white-space: nowrap;

  ${getDrawerStyles}

  .expand-icon {
    position: absolute;
    right: 20px;
  }

  .MuiButtonBase-root {
    justify-content: center;
  }

  .MuiDrawer-paper {
    background-color: ${({theme}) => theme.palette.secondary.main};
    ${getDrawerStyles}
  }

  .MuiSvgIcon-root,
  .MuiDrawer-paper {
    color: ${({theme}) => theme.palette.secondary.contrastText};
  }
`;

const CustomIconButton = styled(IconButton)`
  margin-right: 36px;
`;

const CustomListItem = styled(ListItem)`
  ${getActiveTabStyles}
`;

const NestedList = styled(List)`
  padding-left: ${({theme, open}) => theme.spacing(open ? 4 : 0)}px;
`;

const Root = styled.div`
  display: flex;
`;

export {
  Content,
  CustomAppBar,
  CustomDrawer,
  CustomIconButton,
  CustomListItem,
  NestedList,
  Root,
};
