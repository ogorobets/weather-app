import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';

import {graphQLClientWeather} from '../../api/weather';
import {getCityByNameQuery} from '../../api/weatherQueries';

interface WeatherData {
  getCityByName: {
    country: string;
    weather: {
      temperature: {
        actual: number;
        feelsLike: number;
        min: number;
        max: number;
      };
      summary: {
        title: string;
        description: string;
      };
      wind: {
        speed: number;
        deg: number;
      };
      clouds: {
        all: number;
        visibility: number;
        humidity: number;
      };
    };
  };
}

export type MetricUnit = 'metric' | 'imperial' | 'kelvin' | null;

interface FetchWeatherParams {
  city: string | null;
  units: MetricUnit;
}

export type FetchWeatherPayload = {
  data: WeatherData | null;
} & FetchWeatherParams;

export type WeatherState = {
  loading: boolean;
  error: SerializedError | null;
} & FetchWeatherPayload;

const fetchWeatherData = createAsyncThunk(
  'weather/fetchByCityData',
  async (params: FetchWeatherParams, thunkAPI) => {
    const response = await graphQLClientWeather.request(
      getCityByNameQuery,
      params
    );

    return {...params, data: response};
  }
);

let initialState = {
  data: null,
  loading: false,
  error: null,
  city: null,
  units: null
} as WeatherState;

const weatherDataSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state: WeatherState, action) => {
      state.loading = true;
    });

    builder.addCase(
      fetchWeatherData.fulfilled,
      (state: WeatherState, action: PayloadAction<FetchWeatherPayload>) => {
        const {city, units, data} = action.payload;
        state.city = city;
        state.units = units;
        state.data = data;
        state.error = null;
        state.loading = false;
      }
    );

    builder.addCase(
      fetchWeatherData.rejected,
      (state: WeatherState, action) => {
        state.loading = false;
        state.error = action.error;
        alert(`Error occurred: ${JSON.stringify(action.error)}`);
      }
    );
  }
});

export {fetchWeatherData};

export default weatherDataSlice.reducer;
