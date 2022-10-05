import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';

const ActivityList = () => {
  const { activityStore } = useContext(StoreContext);
  const { loading, deleteActivity, activitiesByDate } = activityStore;
  const [targetButtonId, setTargetButtonId] = useState<string>('');

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
  ) => {
    setTargetButtonId(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate &&
          activitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    loading={loading && targetButtonId === activity.id}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
