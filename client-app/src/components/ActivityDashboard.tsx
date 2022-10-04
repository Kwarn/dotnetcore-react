import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../types';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

interface IActivityDashboardProps {
  isSubmitting: boolean;
  isFormShown: boolean;
  activities: IActivity[];
  selectedActivity: IActivity | null | undefined;
  setSelectActivityCb: (activity: IActivity | null | undefined) => void;
  showFormCb: () => void;
  hideFormCb: () => void;
  submitActivityFormCb: (activity: IActivity) => void;
  deleteActivityCb: (id: string) => void;
}

const ActivityDashboard = ({
  isSubmitting,
  isFormShown,
  activities,
  selectedActivity,
  setSelectActivityCb,
  showFormCb,
  hideFormCb,
  submitActivityFormCb,
  deleteActivityCb,
}: IActivityDashboardProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectActivityCb(activities?.find((a) => a.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectActivityCb(null);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    hideFormCb();
  };

  const handleEdit = () => {
    setIsEditMode((prev) => !prev);
    if (!isFormShown) {
      showFormCb();
    }
  };

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          isSubmitting={isSubmitting}
          activities={activities}
          selectActivityCb={handleSelectActivity}
          deleteActivityCb={deleteActivityCb}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !isEditMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivityCb={handleCancelSelectedActivity}
            toggleEditModeCb={handleEdit}
          />
        )}
        {isFormShown && (
          <ActivityForm
            isSubmitting={isSubmitting}
            activity={isEditMode ? selectedActivity : null}
            cancelEditModeCb={handleCancelEditMode}
            submitActivityFormCb={submitActivityFormCb}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
