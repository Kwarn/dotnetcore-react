import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../types';

interface IActivityListProps {
  activities: IActivity[];
  selectActivityCb: (id: string) => void;
  deleteActivityCb: (id: string) => void;
}

const ActivityList = ({
  activities,
  selectActivityCb,
  deleteActivityCb
}: IActivityListProps) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities &&
          activities.map((a) => (
            <Item key={a.id}>
              <Item.Content>
                <Item.Header>{a.title}</Item.Header>
                <Item.Meta>{a.date}</Item.Meta>
                <Item.Description>
                  <div>{a.description}</div>
                  <div>
                    {a.city}, {a.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => selectActivityCb(a.id)}
                  />
                  <Button
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={() => deleteActivityCb(a.id)}
                  />
                  <Label basic content={a.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
