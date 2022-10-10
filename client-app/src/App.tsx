import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from './components/HomePage';
import ActivityForm from './components/Form/ActivityForm';
import { Route, Switch, useLocation } from 'react-router-dom';
import ActivityDetails from './components/Details/ActivityDetails';
import TestError from './components/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/Errors/NotFound';
import ServerError from './components/Errors/ServerError';

const App = () => {
  const location = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />

      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container styles={{ marginTop: '7em' }}>
              <NavBar />
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key} // forces rerender when key changes - fixes prepopulated create ActivityForm
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route path="/errors" component={TestError} />
                <Route path="/server-error" component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default observer(App);
