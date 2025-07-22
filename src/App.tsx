import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch } from './hooks/redux-hooks';
import { keepSession } from './store/authSlice';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme/ThemeRegistry';

import { AuthLayout, ProtectedLayout } from './layout';
import { Logout } from './components';
import {
  Contacts,
  Content,
  Dashboard,
  Images,
  Login,
  Projects,
  Skills,
  UserProfile,
  Users
} from './pages';

import { Register } from './pages/login/register/Register';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(keepSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes: JSX.Element = (
    <Routes>
      {/* Public routes */}
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route path='/' element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path='content' element={<Content />} />
        <Route path='images' element={<Images />} />
        <Route path='projects' element={<Projects />} />
        <Route path='skills' element={<Skills />} />
        <Route path='users' element={<Users />} />
        <Route path='user-profile' element={<UserProfile />} />
        <Route path='logout' element={<Logout />} />
      </Route>
    </Routes>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        {routes}
      </div>
    </ThemeProvider>
  );
}

export default App;