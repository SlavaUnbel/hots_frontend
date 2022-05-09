import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';
import Choice from './components/Choice';
import PickedHeroes from './components/PickedHeroes';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route index element={<Choice />} />
      <Route path='/picked/*' element={<PickedHeroes />} />
    </Router>
  );
};

export default Routes;
