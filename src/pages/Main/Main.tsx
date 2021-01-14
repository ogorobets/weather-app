import React, { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import WeatherControls from '../../components/WeatherControls/WeatherControls';
import WeatherData from '../../components/WeatherData/WeatherData';

import './main.scss';

const Main: FunctionComponent<{}> = () => {
  return (
    <>
      <Container>
        <WeatherControls />
        <WeatherData />
      </Container>
    </>
  );
};

export default Main;
