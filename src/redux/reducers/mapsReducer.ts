import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { MapList } from '../../types/maps';
import { allMapsEndpoint } from '../../utils/api-endpoints';

export type MapsState = {
  maps: {
    mapList: { label: string }[];
    isFetching: boolean;
    isFetchError: boolean;
    isFetchSuccess: boolean;
  };
  selectedMap: { label: string };
};

export const initialState: MapsState = {
  maps: {
    mapList: [],
    isFetching: false,
    isFetchError: false,
    isFetchSuccess: false,
  },
  selectedMap: {
    label: '',
  },
};

export const fetchMaps = createAsyncThunk('maps/FETCH_MAPS', async () => {
  const { data }: AxiosResponse<MapList[]> = await axios(allMapsEndpoint);
  const mapListToLabels = data.map(({ mapName }) => ({
    label: mapName,
  }));

  return mapListToLabels;
});

export const setSelectedMap = createAction<{ label: string }>('maps/SET_SELECTED_MAP');

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMaps.pending, (state) => ({
      ...state,
      maps: {
        ...initialState.maps,
        isFetching: true,
      },
    }))
    .addCase(fetchMaps.fulfilled, (state, action) => ({
      ...state,
      maps: {
        ...initialState.maps,
        mapList: action.payload,
        isFetchSuccess: true,
      },
    }))
    .addCase(fetchMaps.rejected, (state) => ({
      ...state,
      maps: {
        ...initialState.maps,
        isFetchError: true,
      },
    }))
    .addCase(setSelectedMap, (state, action) => ({
      ...state,
      selectedMap: action.payload,
    }));
});
