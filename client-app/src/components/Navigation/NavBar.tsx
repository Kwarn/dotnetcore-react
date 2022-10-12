import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Menu,
  MenuItem,
} from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { useStore } from "../../stores/store";

const NavBar = () => {
  const { userStore } = useStore();
  const { user, logout } = userStore;
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src={logo} alt="logo" style={{ marginRight: 20 }} />
        </Menu.Item>
        <MenuItem as={NavLink} to="/activities" name="Activities"></MenuItem>
        <MenuItem as={NavLink} to="/errors" name="Errors"></MenuItem>
        <MenuItem>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
          ></Button>
        </MenuItem>
        <MenuItem position="right">
          <Image
            src={user?.image || require("../../assets/user.png")}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} icon="power" content='Logout'/>
            </Dropdown.Menu>
          </Dropdown>
        </MenuItem>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
