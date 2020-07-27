import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Https from '@material-ui/icons/Https';
import Description from '@material-ui/icons/Description';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {
  CustomAppBar,
  CustomDrawer,
  CustomIconButton,
  CustomListItem,
  Content,
  Root,
} from './styles/elements';

const MainLayout = ({children}) => {
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation();

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
          <Link to="/about">
            <CustomListItem active={pathname === '/about' ? 'true' : ''} button>
              <IconButton>
                <Description />
              </IconButton>
              <ListItemText primary="About" />
            </CustomListItem>
          </Link>
          <Link to="/mixed-content">
            <CustomListItem
              active={pathname === '/mixed-content' ? 'true' : ''}
              button
            >
              <IconButton>
                <Https />
              </IconButton>
              <ListItemText primary="Mixed Content" />
            </CustomListItem>
          </Link>
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
