import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const ActivityDashboard = () => {
  const { activityStore } = useContext(StoreContext);
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
