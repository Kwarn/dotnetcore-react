import React, { useEffect, useState } from 'react';
import { Activity } from './types';
import fetchActivities from './services/activities';
import { Header, List } from 'semantic-ui-react';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>();
  const [isError, setIsError] = useState<boolean>(false);

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
    <div className="App">
      <Header as="h2" icon="users" content="Reactivities" />
      {isError && <p>Error fetching activities</p>}

      <List>
        {activities &&
          activities.map((a) => <List.Item key={a.id}>{a.title}</List.Item>)}
      </List>
    </div>
  );
};

export default App;
