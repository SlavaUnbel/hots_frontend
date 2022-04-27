import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Choice from './components/Choice';

const App: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Choice />} />
        </Routes>
    );
};

export default App;
