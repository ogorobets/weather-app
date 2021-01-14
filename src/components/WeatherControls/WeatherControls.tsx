import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  Row,
  Col,
  FormControl,
  Button,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
import { fetchWeatherData, MetricUnit } from '../../store/slices/weatherSlice';
import './weatherControls.scss';

const metricUnits: Array<MetricUnit> = ['metric', 'imperial', 'kelvin'];

const WeatherControls: FunctionComponent<{}> = () => {
  const city = React.useRef<any>();
  const [activeMetricUnit, setActiveMetricUnit] = useState<MetricUnit>(
    'metric'
  );

  const disaptch = useAppDispatch();

  const onDropdownItemClick = (metricUnit: MetricUnit) => {
    return () => {
      setActiveMetricUnit(metricUnit);
    };
  };

  const getWeatherBtnClick = async () => {
    requestWeatherData();
  };

  const requestWeatherData = () => {
    const cityVal = city?.current?.value.trim();
    disaptch(fetchWeatherData({ city: cityVal, units: activeMetricUnit }));
  };

  const onCityInputKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const ENTER_KEY_CODE = 13;
    if (event.charCode === ENTER_KEY_CODE) {
      requestWeatherData();
    }
  };

  return (
    <Row className="weather-controls">
      <Col xs={12} sm={5} md={4} lg={3} xl={3}>
        <FormControl className="city-input" placeholder="City" ref={city} onKeyPress={onCityInputKeypress}/>
      </Col>
      <Col xs={12} className="metrics-dropdown-wrapper">
        <DropdownButton
          id="metrics-dropdown"
          variant="outline-secondary"
          title={activeMetricUnit}
        >
          {metricUnits.map((unit, index) => {
            const isActive = activeMetricUnit === unit;
            return (
              <Dropdown.Item
                active={isActive}
                key={index}
                eventKey={index.toString()}
                className="dropdown-item"
                onClick={onDropdownItemClick(unit)}
              >
                {unit}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Col>
      <Col xs={12} className="get-weather-btn-wrapper">
        <Button
          className="get-weather-btn"
          variant="primary"
          onClick={getWeatherBtnClick}
        >
          Get weather
        </Button>
      </Col>
    </Row>
  );
};

export default WeatherControls;
