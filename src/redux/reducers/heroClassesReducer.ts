import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { allHeroClassesEndpoint } from '../../utils/api-endpoints';
import { HeroClassesList } from '../../types/heroClasses';

export type HeroClassesState = {
  heroClasses: {
    classList: { label: string }[];
    isFetching: boolean;
    isFetchError: boolean;
    isFetchSuccess: boolean;
  };
  selectedClass: { label: string };
};

export const initialState: HeroClassesState = {
  heroClasses: {
    classList: [],
    isFetching: false,
    isFetchError: false,
    isFetchSuccess: false,
  },
  selectedClass: {
    label: '',
  },
};

export const fetchHeroClasses = createAsyncThunk('heroClasses/FETCH_HERO_CLASSES', async () => {
  const { data }: AxiosResponse<HeroClassesList[]> = await axios(allHeroClassesEndpoint);
  const mapListToLabels = data.map(({ heroClassName }) => ({
    label: heroClassName,
  }));

  return mapListToLabels;
});

export const setSelectedHeroClass = createAction<{ label: string }>(
  'heroClasses/SET_SELECTED_HERO_CLASS',
);

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchHeroClasses.pending, (state) => ({
      ...state,
      heroClasses: {
        ...initialState.heroClasses,
        isFetching: true,
      },
    }))
    .addCase(fetchHeroClasses.fulfilled, (state, action) => ({
      ...state,
      heroClasses: {
        ...initialState.heroClasses,
        classList: action.payload,
        isFetchSuccess: true,
      },
    }))
    .addCase(fetchHeroClasses.rejected, (state) => ({
      ...state,
      heroClasses: {
        ...initialState.heroClasses,
        isFetchError: true,
      },
    }))
    .addCase(setSelectedHeroClass, (state, action) => ({
      ...state,
      selectedClass: action.payload,
    }));
});
