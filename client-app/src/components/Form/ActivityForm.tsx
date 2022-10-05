import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, DropdownProps, Form, Segment } from 'semantic-ui-react';
import { StoreContext } from '../../stores/store';
import { IActivity } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

const ActivityForm = () => {
  const { activityStore } = useContext(StoreContext);
  const {
    loading,
    loadingInitial,
    loadActivity,
    createActivity,
    updateActivity,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const selectOptions = [
    { key: 'culture', value: 'culture', text: 'Culture' },
    { key: 'drinks', value: 'drinks', text: 'Drinks' },
    { key: 'film', value: 'film', text: 'Film' },
    { key: 'food', value: 'food', text: 'Food' },
    { key: 'music', value: 'music', text: 'Music' },
    { key: 'travel', value: 'travel', text: 'Travel' },
  ];

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      return createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`),
      );
    }
    updateActivity(activity).then(() =>
      history.push(`/activities/${activity.id}`),
    );
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setActivity((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps,
  ) => {
    setActivity((prev) => ({
      ...prev,
      category: data.value as string,
    }));
  };

  if (loadingInitial) {
    return <LoadingSpinner content="Loading activity..." />;
  }

  return (
    <Segment clearing style={{ marginTop: '7em' }}>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Select
          placeholder="Category"
          value={activity.category}
          name="category"
          options={selectOptions}
          onChange={handleSelect}
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
