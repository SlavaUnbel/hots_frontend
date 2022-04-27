import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from './redux/rootReducer';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
