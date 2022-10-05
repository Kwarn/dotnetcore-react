import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, DropdownProps, Form, Segment } from 'semantic-ui-react';
import { StoreContext } from '../stores/store';

const ActivityForm = () => {
  const { activityStore } = useContext(StoreContext);
  const { selectedActivity, loading, updateActivity, createActivity, closeForm } =
    activityStore;
  let initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const selectOptions = [
    { key: 'culture', value: 'culture', text: 'Culture' },
    { key: 'drinks', value: 'drinks', text: 'Drinks' },
    { key: 'film', value: 'film', text: 'Film' },
    { key: 'food', value: 'food', text: 'Food' },
    { key: 'music', value: 'music', text: 'Music' },
    { key: 'travel', value: 'travel', text: 'Travel' },
  ];

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    activity.id
      ? updateActivity(activity)
      : createActivity(activity);
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

  return (
    <Segment clearing>
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
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
