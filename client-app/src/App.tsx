import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/ActivityDashboard';

import LoadingSpinner from './components/LoadingSpinner';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingSpinner content={'Loading App'} />;
  else
    return (
      <>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          {activityStore.activitiesByDate && <ActivityDashboard />}
        </Container>
      </>
    );
};

export default observer(App);
