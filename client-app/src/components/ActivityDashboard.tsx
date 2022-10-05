import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';
import ActivityList from './ActivityList';
import LoadingSpinner from './LoadingSpinner';

const ActivityDashboard = () => {
  const { activityStore } = useContext(StoreContext);
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size === 0) {
      loadActivities();
    }
  }, [activityRegistry, loadActivities]);

  if (activityStore.loadingInitial)
    return <LoadingSpinner content={'Loading App'} />;

  return (
    <Grid style={{ marginTop: '7em' }}>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
