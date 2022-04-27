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
    isFetchSuccess: false
  },
  selectedClass: {
    label: ''
  }
};

export const fetchHeroClasses = createAsyncThunk(
  'heroClasses/FETCH_HERO_CLASSES',
  async (_, { dispatch }) =>
    axios(allHeroClassesEndpoint).then(({ data }: AxiosResponse<HeroClassesList[]>) => {
      const mapListToLabels = data.map(({ heroClassName }) => ({
        label: heroClassName
      }));
      dispatch(setHeroClassesList(mapListToLabels));

      const allClasses = mapListToLabels.find(({ label }) => label === 'All classes');
      allClasses && dispatch(setSelectedHeroClass(allClasses));
    })
);

export const setHeroClassesList = createAction<{ label: string }[]>(
  'heroClasses/SET_HERO_CLASSES_LIST'
);
export const setSelectedHeroClass = createAction<{ label: string }>(
  'heroClasses/SET_SELECTED_HERO_CLASS'
);

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchHeroClasses.pending, (state) => ({
      ...state,
      heroClasses: {
        ...state.heroClasses,
        isFetching: true,
        isFetchError: false,
        isFetchSuccess: false
      }
    }))
    .addCase(fetchHeroClasses.fulfilled, (state) => ({
      ...state,
      heroClasses: {
        ...state.heroClasses,
        isFetching: false,
        isFetchError: false,
        isFetchSuccess: true
      }
    }))
    .addCase(fetchHeroClasses.rejected, (state) => ({
      ...state,
      heroClasses: {
        classList: [],
        isFetching: false,
        isFetchError: true,
        isFetchSuccess: false
      }
    }))
    .addCase(setHeroClassesList, (state, action) => ({
      ...state,
      heroClasses: {
        ...state.heroClasses,
        classList: action.payload
      }
    }))
    .addCase(setSelectedHeroClass, (state, action) => ({
      ...state,
      selectedClass: action.payload
    }));
});
