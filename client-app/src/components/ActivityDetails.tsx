import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';
import LoadingSpinner from './LoadingSpinner';

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
    <Card fluid>
      <Image
        src={require(`../assets/categoryImages/${activity?.category.toLowerCase()}.jpg`)}
        alt="blah"
      />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span>{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            as={Link}
            to={`/manage/${activity.id}`}
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={`/activities`}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
