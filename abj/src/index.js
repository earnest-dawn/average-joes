import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import OrderOnline from './pages/OrderOnlinePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: '',
        children: [
            { index: true, element: <HomePage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '/orderOnline', element: <OrderOnline /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
