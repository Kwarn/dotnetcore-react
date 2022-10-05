import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from './components/HomePage';
import ActivityForm from './components/ActivityForm';
import { Route, useLocation } from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container styles={{ marginTop: '7em' }}>
              <NavBar />
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key} // forces rerender when key changes - fixes prepopulated create ActivityForm
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};

export default observer(App);
