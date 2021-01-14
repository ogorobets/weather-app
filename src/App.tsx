import React, { FunctionComponent } from 'react';
import MainPage from './pages/Main/Main';

import './styles/app.scss';
import './App.scss';

const App: FunctionComponent<{}> = () => {
  return (
    <div className="app-wrapper">
      <MainPage />
    </div>
  );
};

export default App;
