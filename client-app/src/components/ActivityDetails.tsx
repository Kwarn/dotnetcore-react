import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../types';

interface IActivityDetailsProps {
  activity: IActivity;
  cancelSelectedActivityCb: () => void;
  toggleEditModeCb: () => void;
}

const ActivityDetails = ({
  activity,
  cancelSelectedActivityCb,
  toggleEditModeCb,
}: IActivityDetailsProps) => {
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
            onClick={toggleEditModeCb}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectedActivityCb}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
