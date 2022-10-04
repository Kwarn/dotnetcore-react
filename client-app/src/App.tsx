import React, { useEffect, useState } from 'react';
import { IActivity } from './types';
import fetchActivities from './services/activities';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import ActivityDashboard from './components/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[] | null | undefined>(
    null,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | null | undefined
  >(null);

  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities?.find((a) => a.id === id));
  };
  const handleCancelSelectedActivity = () => {
    setSelectedActivity(null);
  };
  const handleToggleForm = () => {
    setIsFormShown((prev) => !prev);
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
      <NavBar toggleFormCb={handleToggleForm} />
      {isError && <p>Error fetching activities</p>}
      <Container style={{ marginTop: '7em' }}>
        {activities && (
          <ActivityDashboard
            isFormShown={isFormShown}
            activities={activities}
            selectedActivity={selectedActivity}
            toggleFormCb={handleToggleForm}
            selectActivityCb={handleSelectActivity}
            handleCancelSelectedActivityCb={handleCancelSelectedActivity}
          />
        )}
      </Container>
    </>
  );
};

export default App;
