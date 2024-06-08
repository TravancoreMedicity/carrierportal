// @ts-nocheck
import '@fontsource/inter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { Suspense, lazy } from 'react';
import Loader from './Components/Loader';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './Components/Footer';
import { Provider } from 'react-redux';
import { store } from './Redux/store'
import ProtectedRoute from './routes/ProtectedRoute';

import { ToastContainer } from 'react-toastify';

const RootLayout = lazy(() => import('./routes/RootLayout'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Admission = lazy(() => import('./Pages/Admission/Admission'));
const Courses = lazy(() => import('./Pages/Courses/Courses'));
const Login = lazy(() => import('./Pages/Login/Login'));
const NewsAndEvents = lazy(() => import('./Pages/NewsEvent/NewsAndEvents'));
const CandidateLogin = lazy(() => import('./Pages/CandidateLogin/CandidateLogin'));
const EmployeeLogin = lazy(() => import('./Pages/EmployeeLogin/EmployeeLogin'));
const CandidateHome = lazy(() => import('./Pages/CandidateLogin/CandidateHome'));

const Application = lazy(() => import('./Pages/CandidateLogin/Pages/Application'));
const Registration = lazy(() => import('./Pages/CandidateLogin/Pages/Registration'));
const CourseSelection = lazy(() => import('./Pages/CandidateLogin/Pages/CourseSelection'));
const ApplicationFeePayment = lazy(() => import('./Pages/CandidateLogin/Pages/ApplicationFeePayment'));
const ApplicationView = lazy(() => import('./Pages/CandidateLogin/Pages/ApplicationView'));


/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The main application component.
 */
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/Home', element: <Home /> },
        { path: '/Admission', element: <Admission /> },
        { path: '/Courses', element: <Courses /> },
        { path: '/Login', element: <Login /> },
        { path: '/CandidateLogin', element: <CandidateLogin /> },
        { path: '/NewsAndEvents', element: <NewsAndEvents /> },
        { path: '/AdminLogin', element: <EmployeeLogin /> },
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/CandidateHome', element: <CandidateHome />,
          children: [
            { path: 'Application', element: <Application /> },
            { path: 'Registration', element: <Registration /> },
            { path: 'CourseSelection', element: <CourseSelection /> },
            { path: 'ApplicationFeePayment', element: <ApplicationFeePayment /> },
            { path: 'ApplicationView', element: <ApplicationView /> },
          ]
        },
      ]
    }
  ])

  return (
    <div className="flex flex-col min-h-svh bg-[url('./assets/Landing.jpg')] bg-cover bg-center">
      <ToastContainer />
      <Provider store={store}>
        <Suspense fallback={<Loader />} >
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
