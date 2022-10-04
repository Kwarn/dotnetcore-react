import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import { StoreContext } from '../stores/store';

const NavBar = () => {
  const { activityStore } = useContext(StoreContext);
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
            onClick={() => activityStore.openForm()}
          ></Button>
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
