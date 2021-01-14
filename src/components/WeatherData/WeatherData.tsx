import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Row, Col, Spinner } from 'react-bootstrap';

import './weatherData.scss';

const WeatherData: FunctionComponent<{}> = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const isDataReady = () => {
    // eslint-disable-next-line
    return data && data?.getCityByName && !loading;
  };

  const isNoDataFound = () => {
    // eslint-disable-next-line
    return (!data || data && !data?.getCityByName) && !error;
  }

  return <div className="weather-data">
    {isDataReady() ? (
    <div className="weather-data-table">
      <Row><Col className="table-heading"><div>Temperature</div></Col></Row>
      <Row>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>actual: { data!.getCityByName.weather.temperature.actual }</Col>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>feelsLike: { data!.getCityByName.weather.temperature.feelsLike }</Col>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>min: { data!.getCityByName.weather.temperature.min }</Col>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>max: { data!.getCityByName.weather.temperature.max }</Col>
      </Row>
      <Row><Col className="table-heading"><div>Summary</div></Col></Row>
      <Row>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>title: { data!.getCityByName.weather.summary.title }</Col>
        <Col className="table-col" xs={6} sm={6} md={6} lg={6} xl={6}>description: { data!.getCityByName.weather.summary.description }</Col>
      </Row>
      <Row><Col className="table-heading"><div>Wind</div></Col></Row>
      <Row>
        <Col className="table-col" xs={6} sm={3} md={3} lg={3} xl={3}>speed: { data!.getCityByName.weather.wind.speed }</Col>
        <Col className="able-col" xs={6} sm={3} md={3} lg={3} xl={3}>deg: { data!.getCityByName.weather.wind.deg }</Col>
      </Row>
      <Row><Col className="table-heading"><div>Clouds</div></Col></Row>
      <Row>
        <Col className="table-col" xs={6} sm={4} md={3} lg={3} xl={3}>all: { data!.getCityByName.weather.clouds.all }</Col>
        <Col className="table-col" xs={6} sm={4} md={3} lg={3} xl={3}>visibility: { data!.getCityByName.weather.clouds.visibility }</Col>
        <Col className="table-col" xs={6} sm={4} md={3} lg={3} xl={3}>humidity: { data!.getCityByName.weather.clouds.humidity }</Col>
      </Row>
    </div>
  ) : loading ? (
    <Row><Col className="weather-data-spinner-wrapper"><Spinner animation="border" variant="primary" /></Col></Row>
  ) : isNoDataFound() ? (
    <Row><Col>No data found</Col></Row>
  ) : (
    <Row>
      <Col>Error occurred: {JSON.stringify(error)}</Col>
    </Row>
  )}
  </div>
};

export default WeatherData;
