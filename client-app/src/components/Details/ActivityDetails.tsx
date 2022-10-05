import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { StoreContext } from '../../stores/store';
import LoadingSpinner from '../LoadingSpinner';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';

const ActivityDetails = () => {
  const { activityStore } = useContext(StoreContext);
  const {
    selectedActivity: activity,
    loadingInitial,
    loadActivity,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) {
    return <LoadingSpinner content={'Loading App'} />;
  }

  return (
    <Grid style={{ marginTop: '7em' }}>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity}/>
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
