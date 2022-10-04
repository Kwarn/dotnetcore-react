import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';
import { IActivity } from '../types';

interface IActivityDetailsProps {
  activity: IActivity;
}

const ActivityDetails = ({ activity }: IActivityDetailsProps) => {
  const { activityStore } = useContext(StoreContext);
  const { openForm, cancelSelectedActivity } = activityStore;

  return (
    <Card fluid>
      <Image
        src={require(`../assets/categoryImages/${activity.category.toLowerCase()}.jpg`)}
        alt="blah"
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
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
