import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src={logo} alt="logo" style={{ marginRight: 20 }} />
        </Menu.Item>
        <MenuItem as={NavLink} to="/activities" name="Activities"></MenuItem>
        <MenuItem>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
          ></Button>
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
