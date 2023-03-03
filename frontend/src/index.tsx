import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Root from './routes/root';
import ErrorPage from './components/ErrorPage';

// import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ShelterForm from './components/ShelterForm';
import ShelterView from './components/ShelterView';
// import NavBar from './components/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Welcome />,
      },
      {
        path: 'login',
        element: <Login />,
        // loader: async () => {
        // },
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'shelter',
        element: <ShelterForm />,
      },
      {
        path: 'newshelter',
        element: <ShelterForm />,
      },
      {
        path: 'singleview/:id',
        element: <ShelterView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
