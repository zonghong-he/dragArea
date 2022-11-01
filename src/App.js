import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home.js';
import Drag from './pages/Drag.js';

function App() {
  const element = useRoutes([
    {
      path: '',
      element: <Home />,
    },
    {
      path:'/drag',
      element:<Drag/>
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);
  return element;
}

export default App;
