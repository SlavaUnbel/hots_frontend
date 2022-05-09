import { combineReducers } from '@reduxjs/toolkit';
import heroClassesReducer, { HeroClassesState } from './reducers/heroClassesReducer';
import heroesReducer, { HeroesState } from './reducers/heroesReducer';
import mapsReducer, { MapsState } from './reducers/mapsReducer';

export type ApplicationState = {
  maps: MapsState;
  heroClasses: HeroClassesState;
  heroes: HeroesState;
};

const rootReducer = () =>
  combineReducers<ApplicationState>({
    maps: mapsReducer,
    heroClasses: heroClassesReducer,
    heroes: heroesReducer,
  });

export default rootReducer;
