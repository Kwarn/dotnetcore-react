import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import UserStore from './userStore';

interface IStore {
  commonStore: CommonStore;
  activityStore: ActivityStore;
  userStore: UserStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  activityStore: new ActivityStore(),
  userStore: new UserStore()
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
