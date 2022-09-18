import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './store/index';
import { Provider } from 'react-redux';
import LoginForm from './components/LoginForm';
import TwoFactorAuthForm from './components/TwoFactorAuthForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'tfa',
        element: <TwoFactorAuthForm />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
