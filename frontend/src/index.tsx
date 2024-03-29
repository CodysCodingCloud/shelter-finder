import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Root from './routes/root';
import ErrorPage from './routes/ErrorPage';

// import Welcome from './components/Welcome';
import Register from './routes/Register';
import Login from './routes/Login';
import Welcome from './routes/Welcome';
import RegisterShelter from './routes/RegisterShelter';
// import ShelterForm from './components/ShelterForm';
import ShelterView from './routes/ShelterView';
import EditShelter from './routes/EditShelter';
import Shelters from './routes/Shelters';
import MyShelters from './routes/user/MyShelters';
import ShelterSearch from './routes/ShelterSearch';
import ShelterScroll from './routes/SheltersScroll';
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
      // {
      //   path: 'shelters',
      //   element: <Shelters />,
      // },
      {
        path: 'my-shelters',
        element: <MyShelters />,
      },
      {
        path: 'newshelter',
        element: <RegisterShelter />,
      },
      {
        path: 'singleview/:id',
        element: <ShelterView />,
      },
      {
        path: 'edit/:id',
        element: <EditShelter />,
      },
      {
        path: 'search',
        element: <ShelterSearch />,
      },
      {
        path: 'shelters/',
        element: <ShelterScroll />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
