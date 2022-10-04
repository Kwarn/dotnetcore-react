import React, { useEffect, useState } from 'react';
import { IActivity } from './types';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/ActivityDashboard';
import { v4 as uuid } from 'uuid';

import agent from './api/agent';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<IActivity[] | null | undefined>(
    null,
  );
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | null | undefined
  >(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleShowForm = () => {
    setIsFormShown(true);
  };

  const handleHideForm = () => {
    setIsFormShown(false);
  };

  const handleSubmitActivityForm = async (activity: IActivity) => {
    setIsSubmitting(true);
    const activityWithId = { ...activity, id: uuid() };
    if (!activities) {
      return setActivities([activityWithId]);
    }

    const filteredActivities = activities?.filter((a) => a.id !== activity.id);

    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities([activity, ...filteredActivities]);
      setSelectedActivity(activity);
    } else {
      await agent.Activities.create(activityWithId);
      setActivities([activityWithId, ...activities]);
      setSelectedActivity(activityWithId);
    }
    setIsSubmitting(false);
  };

  const handleDeleteActivity = async (id: string) => {
    setIsSubmitting(true);
    await agent.Activities.delete(id);
    if (selectedActivity?.id === id) {
      setSelectedActivity(null);
    }
    setActivities((prev) => prev?.filter((a) => a.id !== id));
    setIsSubmitting(false);
  };

  useEffect(() => {
    agent.Activities.list().then((response) => {
      setActivities(
        response.map((a) => ({ ...a, date: a.date.split('T')[0] })),
      );
    });
  }, []);

  useEffect(() => {
    if (activities) setIsLoading(false);
  }, [activities]);

  if (isLoading) return <LoadingSpinner content={'Loading App'} />;
  else
    return (
      <>
        <NavBar showFormCb={handleShowForm} />
        {isError && <p>Error fetching activities</p>}
        <Container style={{ marginTop: '7em' }}>
          {activities && (
            <ActivityDashboard
              isSubmitting={isSubmitting}
              isFormShown={isFormShown}
              activities={activities}
              selectedActivity={selectedActivity}
              setSelectActivityCb={setSelectedActivity}
              showFormCb={handleShowForm}
              hideFormCb={handleHideForm}
              submitActivityFormCb={handleSubmitActivityForm}
              deleteActivityCb={handleDeleteActivity}
            />
          )}
        </Container>
      </>
    );
};

export default App;
