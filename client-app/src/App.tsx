import React, { useEffect, useState } from 'react';
import { IActivity } from './types';
import fetchActivities from './services/activities';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/ActivityDashboard';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [activities, setActivities] = useState<IActivity[] | null | undefined>(
    null,
  );

  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | null | undefined
  >(null);

  const [isError, setIsError] = useState<boolean>(false);

  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  const handleShowForm = () => {
    setIsFormShown(true);
  };

  const handleHideForm = () => {
    setIsFormShown(false);
  };

  const handleSubmitActivityForm = (activity: IActivity) => {
    const newActivity = { ...activity, id: uuid() };
    if (!activities) {
      return setActivities([newActivity]);
    }
    const filteredActivities = activities?.filter((a) => a.id !== activity.id);

    if (activity.id) {
      setActivities([activity, ...filteredActivities]);
      setSelectedActivity(activity);
    } else {
      setActivities([newActivity, ...activities]);
      setSelectedActivity(newActivity);
    }
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev?.filter((a) => a.id !== id));
  };

  const getActivites = async () => {
    const acts = await fetchActivities();
    if (!acts || acts instanceof Error) {
      return setIsError(true);
    }
    return setActivities(acts);
  };

  useEffect(() => {
    getActivites();
  }, []);

  return (
    <>
      <NavBar showFormCb={handleShowForm} />
      {isError && <p>Error fetching activities</p>}
      <Container style={{ marginTop: '7em' }}>
        {activities && (
          <ActivityDashboard
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
