import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import { AllSuperheroes } from './components/AllSuperheroes/AllSuperheroes';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={AllSuperheroes} />
    </BrowserRouter>
  );
}

export default App;
