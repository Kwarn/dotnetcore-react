import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../types';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  activities: IActivity[] = [];
  selectedActivity: IActivity | null | undefined = null;
  editMode = false;
  submitting = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        this.activities.push(activity); // MobX is mutable and we should directly mutate state like this.
      });
      this.setLoadingInitial(false);
    } catch (error: unknown) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  };

  setActivities = (newActivities: IActivity[]) => {
    this.activities = newActivities;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
    this.closeForm();
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = null;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      if (this.selectedActivity?.id === id) {
        this.selectedActivity = null;
      }
      this.activities = this.activities.filter(
        (activity) => activity.id !== id,
      );
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  createActivity = async (activity: IActivity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: IActivity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activities = [...this.activities.filter((a) => a.id !== activity.id), activity];
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
