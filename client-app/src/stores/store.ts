import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';

interface IStore {
  commonStore: CommonStore;
  activityStore: ActivityStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
