import { combineReducers } from '@reduxjs/toolkit';
import heroClassesReducer, { HeroClassesState } from './reducers/heroClassesReducer';
import mapsReducer, { MapsState } from './reducers/mapsReducer';

export type ApplicationState = {
  maps: MapsState;
  heroClasses: HeroClassesState;
};

const rootReducer = () =>
  combineReducers<ApplicationState>({
    maps: mapsReducer,
    heroClasses: heroClassesReducer,
  });

export default rootReducer;
