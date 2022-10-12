import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { StoreContext } from "../../stores/store";
import { IActivity } from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Common/TextInput";
import SelectInput from "../Common/SelectInput";
import DatePicker from "./DatePicker";
import TextArea from "../Common/TextArea";

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
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const selectOptions = [
    { key: "culture", value: "culture", text: "Culture" },
    { key: "drinks", value: "drinks", text: "Drinks" },
    { key: "film", value: "film", text: "Film" },
    { key: "food", value: "food", text: "Food" },
    { key: "music", value: "music", text: "Music" },
    { key: "travel", value: "travel", text: "Travel" },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("The activity category is required"),
    date: Yup.string().nullable().required("The activity date is required"),
    city: Yup.string().required("The activity city is required"),
    venue: Yup.string().required("The activity venue is required"),
  });

  const handleFormSubmit = (activity: IActivity) => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      return createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    }
    updateActivity(activity).then(() =>
      history.push(`/activities/${activity.id}`)
    );
  };

  if (loadingInitial) {
    return <LoadingSpinner content="Loading activity..." />;
  }

  return (
    <Segment clearing style={{ marginTop: "7em" }}>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput placeholder="Title" name="title" />
            <TextArea rows={3} placeholder="Description" name="description" />
            <SelectInput
              options={selectOptions}
              placeholder="Category"
              name="category"
            />
            <DatePicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive={true}
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
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
