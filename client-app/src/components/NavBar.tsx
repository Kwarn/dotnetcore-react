import React from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import logo from '../assets/logo.png';

interface INavBarProps {
  toggleFormCb: () => void;
}

const NavBar = ({ toggleFormCb }: INavBarProps) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src={logo} alt="logo" style={{ marginRight: 20 }} />
        </Menu.Item>
        <MenuItem name="Activities"></MenuItem>
        <MenuItem>
          <Button
            positive
            content="Create Activity"
            onClick={toggleFormCb}
          ></Button>
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default NavBar;
