import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Description from '@material-ui/icons/Description';
import Emoji from 'a11y-react-emoji';
import IconButton from '@material-ui/core/IconButton';
import Https from '@material-ui/icons/Https';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Content,
  CustomAppBar,
  CustomDrawer,
  CustomIconButton,
  CustomListItem,
  Root,
} from './styles/elements';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

/**
 * Main Layout
 *
 * Wraps every application view. It is used at src/App.js
 * in a higher level than <Switch> component, since it is reused
 * accross views
 *
 * @param {{children: ReactNode}} props
 * @return {ReactNode} Main App Layout
 */
const MainLayout = ({children}) => {
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation();

  return (
    <Root>
      <CustomAppBar data-testid="appbar" position="fixed" open={open}>
        <Toolbar>
          <CustomIconButton
            color="inherit"
            aria-label="open drawer"
            data-testid="toggle-drawer-button"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </CustomIconButton>
          <Typography variant="h6" noWrap>
            Enamel Dashboard <Emoji symbol="🐘" label="sheep"/>
          </Typography>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer
        open={open}
        data-testid="navigation-drawer"
        variant="permanent"
      >
        <Toolbar />
        <List>
          <Link to="/about">
            <CustomListItem
              data-testid="about-navigation-button"
              active={pathname === '/about' ? 'true' : ''}
              button
            >
              <IconButton>
                <Description />
              </IconButton>
              <ListItemText primary="About" />
            </CustomListItem>
          </Link>
          <Link to="/mixed-content">
            <CustomListItem
              data-testid="mixed-content-navigation-button"
              active={pathname === '/mixed-content' ? 'true' : ''}
              button
            >
              <IconButton>
                <Https />
              </IconButton>
              <ListItemText primary="Mixed Content" />
            </CustomListItem>
          </Link>
          <Link to="/tls">
            <CustomListItem
              data-testid="tls-navigation-button"
              active={pathname === '/tls' ? 'true' : ''}
              button
            >
              <IconButton>
                <Https />
              </IconButton>
              <ListItemText primary="TLS" />
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
