import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../types';

interface IActivityListProps {
  isSubmitting: boolean;
  activities: IActivity[];
  selectActivityCb: (id: string) => void;
  deleteActivityCb: (id: string) => void;
}

const ActivityList = ({
  isSubmitting,
  activities,
  selectActivityCb,
  deleteActivityCb,
}: IActivityListProps) => {
  const [targetButton, setTargetButton] = useState<string>('');

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
  ) => {
    setTargetButton(e.currentTarget.name);
    deleteActivityCb(id);
  };

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
                    name={a.id}
                    loading={isSubmitting && targetButton === a.id}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={(e) => handleActivityDelete(e, a.id)}
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
