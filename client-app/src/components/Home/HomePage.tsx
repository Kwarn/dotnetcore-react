import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../stores/store";

const HomePage = () => {
  const { userStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src={require("../../assets/logo.png")}
            style={{ marginBottom: 12 }}
          />
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities{" "}
            </Button>
          </>
        ) : (
          <Button as={Link} to="/login" size="huge" inverted>
            Login
          </Button>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
