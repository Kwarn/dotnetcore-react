import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';

const ActivityDetails = () => {
  const { activityStore } = useContext(StoreContext);
  const { openForm, cancelSelectedActivity, selectedActivity } = activityStore;

  return (
    <Card fluid>
      <Image
        src={require(`../assets/categoryImages/${selectedActivity?.category.toLowerCase()}.jpg`)}
        alt="blah"
      />
      <Card.Content>
        <Card.Header>{selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(selectedActivity?.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => cancelSelectedActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
