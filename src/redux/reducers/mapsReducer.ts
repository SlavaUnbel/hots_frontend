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
    isFetchSuccess: false
  },
  selectedMap: {
    label: ''
  }
};

export const fetchMaps = createAsyncThunk('maps/FETCH_MAPS', async (_, { dispatch }) =>
  axios(allMapsEndpoint).then(({ data }: AxiosResponse<MapList[]>) => {
    const mapListToLabels = data.map(({ mapName }) => ({
      label: mapName
    }));
    dispatch(setMapList(mapListToLabels));

    const allMaps = mapListToLabels.find(({ label }) => label === 'All maps');
    allMaps && dispatch(setSelectedMap(allMaps));
  })
);

export const setMapList = createAction<{ label: string }[]>('maps/SET_MAP_LIST');
export const setSelectedMap = createAction<{ label: string }>('maps/SET_SELECTED_MAP');

export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMaps.pending, (state) => ({
      ...state,
      maps: {
        ...state.maps,
        isFetching: true,
        isFetchError: false,
        isFetchSuccess: false
      }
    }))
    .addCase(fetchMaps.fulfilled, (state) => ({
      ...state,
      maps: {
        ...state.maps,
        isFetching: false,
        isFetchError: false,
        isFetchSuccess: true
      }
    }))
    .addCase(fetchMaps.rejected, (state) => ({
      ...state,
      maps: {
        mapList: [],
        isFetching: false,
        isFetchError: true,
        isFetchSuccess: false
      }
    }))
    .addCase(setMapList, (state, action) => ({
      ...state,
      maps: {
        ...state.maps,
        mapList: action.payload
      }
    }))
    .addCase(setSelectedMap, (state, action) => ({
      ...state,
      selectedMap: action.payload
    }));
});
