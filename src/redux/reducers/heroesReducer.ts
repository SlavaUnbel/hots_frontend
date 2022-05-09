import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Hero } from '../../types/hero';
import { heroesEndpoint } from '../../utils/api-endpoints';

export type HeroesState = {
  heroes: {
    heroesList: Hero[];
    isFetching: boolean;
    isFetchError: boolean;
    isFetchSuccess: boolean;
  };
  selectedHero: Hero;
};

export const initialState: HeroesState = {
  heroes: {
    heroesList: [],
    isFetching: false,
    isFetchError: false,
    isFetchSuccess: false,
  },
  selectedHero: {
    _id: '',
    name: '',
    class: '',
    generalTier: '',
    primaryAbilities: [],
    heroicAbilities: [],
    trait: {
      name: '',
      description: '',
    },
    goodMaps: [],
    averageMaps: [],
    badMaps: [],
  },
};

export const fetchHeroes = createAsyncThunk(
  'maps/FETCH_HEROES',
  async ({ map, className }: { map: string; className: string }) => {
    const { data }: AxiosResponse<Hero[]> = await axios(heroesEndpoint, {
      params: { map, className },
    });

    return data;
  },
);

export const setSelectedHero = createAction<Hero>('maps/SET_SELECTED_HERO');

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchHeroes.pending, (state) => ({
      ...state,
      heroes: {
        ...initialState.heroes,
        isFetching: true,
      },
    }))
    .addCase(fetchHeroes.fulfilled, (state, action) => ({
      ...state,
      heroes: {
        ...initialState.heroes,
        heroesList: action.payload,
        isFetchSuccess: true,
      },
    }))
    .addCase(fetchHeroes.rejected, (state) => ({
      ...state,
      heroes: {
        ...initialState.heroes,
        isFetchError: true,
      },
    }))
    .addCase(setSelectedHero, (state, action) => ({
      ...state,
      selectedHero: action.payload,
    }));
});
