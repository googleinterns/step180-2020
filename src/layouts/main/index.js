import Business from '@material-ui/icons/Business';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Collapse from '@material-ui/core/Collapse';
import Description from '@material-ui/icons/Description';
import Emoji from 'a11y-react-emoji';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Https from '@material-ui/icons/Https';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Public from '@material-ui/icons/Public';
import Toolbar from '@material-ui/core/Toolbar';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Typography from '@material-ui/core/Typography';
import {useLocation} from 'react-router-dom';
import {
  Content,
  CustomAppBar,
  CustomDrawer,
  CustomIconButton,
  CustomListItem,
  NestedList,
  Root,
} from './elements';
import React, {useState} from 'react';

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
  const [open, setOpen] = useState(true);
  const [mixedContentOpen, setMixedCntentOpen] = useState(true);

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
            Enamel Dashboard <Emoji symbol="🐘" label="elephant" />
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
          <CustomListItem
            data-testid="mixed-content-tab-button"
            active={pathname.includes('/mixed-content') ? 'true' : ''}
            onClick={() => setMixedCntentOpen(!mixedContentOpen)}
            button
          >
            <IconButton>
              <Https />
            </IconButton>
            <ListItemText primary="Mixed Content" />
            {mixedContentOpen ? (
              <ExpandLess className="expand-icon" />
            ) : (
              <ExpandMore className="expand-icon" />
            )}
          </CustomListItem>
          <Collapse
            data-testid="mixed-content-collapse"
            in={mixedContentOpen}
            is-open-for-testing={mixedContentOpen ? 'true' : 'false'}
            timeout="auto"
            unmountOnExit
          >
            <NestedList open={open}>
              <Link to="/mixed-content/worldwide">
                <CustomListItem
                  data-testid="mixed-content-worldwide-navigation-button"
                  active={pathname.includes('/worldwide') ? 'true' : ''}
                  button
                >
                  <IconButton>
                    <Public />
                  </IconButton>
                  <ListItemText primary="Worldwide" />
                </CustomListItem>
              </Link>
              <Link to="/mixed-content/trends">
                <CustomListItem
                  data-testid="mixed-content-trends-navigation-button"
                  active={pathname.includes('/trends') ? 'true' : ''}
                  button
                >
                  <IconButton>
                    <TrendingUp />
                  </IconButton>
                  <ListItemText primary="Trends" />
                </CustomListItem>
              </Link>
              <Link to="/mixed-content/government">
                <CustomListItem
                  data-testid="mixed-content-government-navigation-button"
                  active={pathname.includes('/government') ? 'true' : ''}
                  button
                >
                  <IconButton>
                    <Business />
                  </IconButton>
                  <ListItemText primary="Government" />
                </CustomListItem>
              </Link>
            </NestedList>
          </Collapse>
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
