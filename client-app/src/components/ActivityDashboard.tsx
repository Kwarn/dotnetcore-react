import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../types';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

interface IActivityDashboardProps {
  isFormShown: boolean;
  activities: IActivity[];
  selectedActivity: IActivity | null | undefined;
  toggleFormCb: () => void;
  selectActivityCb: (id: string) => void;
  handleCancelSelectedActivityCb: () => void;
}

const ActivityDashboard = ({
  isFormShown,
  activities,
  selectedActivity,
  toggleFormCb,
  selectActivityCb,
  handleCancelSelectedActivityCb,
}: IActivityDashboardProps) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivityCb={selectActivityCb}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivityCb={handleCancelSelectedActivityCb}
          />
        )}
        {isFormShown && <ActivityForm toggleFormCb={toggleFormCb} />}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
