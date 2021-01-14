import { GraphQLClient } from 'graphql-request';
import { WEATHER_API_ENDPOINT } from '../constants/constants';

export const graphQLClientWeather = new GraphQLClient(WEATHER_API_ENDPOINT);
