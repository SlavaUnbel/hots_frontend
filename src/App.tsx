import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Choice from './components/Choice';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Choice />} />
      <Route path="/picked/*" element={<h1>Picked page</h1>} />
    </Routes>
  );
};

export default App;
