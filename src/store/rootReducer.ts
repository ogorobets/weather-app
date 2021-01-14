import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer, { WeatherState } from './slices/weatherSlice';

export type RootState = {
  weather: WeatherState;
};

const rootReducer = combineReducers<RootState>({
  weather: weatherReducer
});

export default rootReducer;
