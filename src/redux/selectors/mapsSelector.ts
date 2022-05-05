import { ApplicationState } from '../rootReducer';
import { createSelector } from '@reduxjs/toolkit';

export const mapsStateSelector = (state: ApplicationState) => {
  const { maps } = state;

  return maps;
};

export const hasNoSelectedMapSelector = createSelector(mapsStateSelector, (maps) => {
  const {
    selectedMap: { label },
  } = maps;

  return !label;
});
