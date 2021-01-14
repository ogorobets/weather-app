import { gql } from 'graphql-request';

export const getCityByNameQuery = gql`
  query getCityByName1($city: String!, $units: Unit!) {
    getCityByName(name: $city, config: { units: $units }) {
      country
      weather {
        temperature {
          actual feelsLike min
          max
        }
        summary {
          title
          description
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
      }
    }
  }
`;
