import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Https from '@material-ui/icons/Https';
import Description from '@material-ui/icons/Description';
import {
  CustomAppBar,
  CustomDrawer,
  CustomIconButton,
  Content,
  Root,
} from './styles/elements';

const MainLayout = ({children}) => {
  const [open, setOpen] = useState(false);

  return (
    <Root>
      <CustomAppBar position="fixed" open={open}>
        <Toolbar>
          <CustomIconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </CustomIconButton>
          <Typography variant="h6" noWrap>
            Enamel Dashboard 🐘
          </Typography>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer open={open} variant="permanent">
        <Toolbar />
        <List>
          <ListItem button>
            <IconButton>
              <Description />
            </IconButton>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <IconButton>
              <Https />
            </IconButton>
            <ListItemText primary="Mixed Content" />
          </ListItem>
        </List>
      </CustomDrawer>
      <Content>
        <Toolbar />
        {children}
      </Content>
    </Root>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
