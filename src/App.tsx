import React, { Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAppSelector } from './hooks/redux-hooks';
import { selectJwtToken } from './store/authSlice';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme/ThemeRegistry';

import { Layout } from './layout';
import { Loader, Logout } from './components';
import { Dashboard, UserProfile, Login } from './pages';
import { Register } from './pages/login/register/Register';

import styles from './App.module.scss';

const Contacts = React.lazy<React.FC>(() => import('./pages/contacts/Contacts'));
const Content = React.lazy<React.FC>(() => import('./pages/content/Content'));
const Skills = React.lazy<React.FC>(() => import('./pages/skills/Skills'));
const Projects = React.lazy<React.FC>(() => import('./pages/projects/Projects'));
const Users = React.lazy<React.FC>(() => import('./pages/users/Users'));
const Images = React.lazy<React.FC>(() => import('./pages/images/Images'));

function App() {
  const jwtToken = useAppSelector(selectJwtToken);
  // ! testing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.log(jwtToken);

  // useEffect(() => {
  //   navigate('/');
  // }, [jwtToken, navigate]);

  let routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='contacts' element={<Suspense fallback={<Loader />}><Contacts /></Suspense>} />
        <Route path='content' element={<Suspense fallback={<Loader />}><Content /></Suspense>} />
        <Route path='images' element={<Suspense fallback={<Loader />}><Images /></Suspense>} />
        <Route path='projects' element={<Suspense fallback={<Loader />}><Projects /></Suspense>} />
        <Route path='skills' element={<Suspense fallback={<Loader />}><Skills /></Suspense>} />
        <Route path='users' element={<Suspense fallback={<Loader />}><Users /></Suspense>} />
        <Route path='user-profile' element={<UserProfile />} />
        <Route path='logout' element={<Logout />} />
      </Route>
    </Routes>
  );

  if (!jwtToken) {
    routes = (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        {routes}
      </div>
    </ThemeProvider>
  );
}

export default App;