import { observer } from 'mobx-react-lite';
import { Fragment, useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { StoreContext } from '../../stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {
  const { activityStore } = useContext(StoreContext);
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(
        (
          [dateKey, groupedActivitiesChildArray], //interesting
        ) => (
          // groupedActivities [[date], [Activity, Activity, ...]]
          <Fragment key={dateKey}>
            <Header sub color="teal">
              {dateKey}
            </Header>

            {groupedActivitiesChildArray.map((a) => (
              <ActivityListItem key={a.id} activity={a} />
            ))}
          </Fragment>
        ),
      )}
    </>
  );
};

export default observer(ActivityList);
