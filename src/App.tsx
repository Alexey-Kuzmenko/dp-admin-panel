import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/ThemeRegistry';
import { Layout } from './layout';

import {
  Dashboard,
  Contacts,
  Content,
  Skills,
  Projects,
  Users,
} from './pages';

import styles from './App.module.scss';

function App() {

  const routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path='content' element={<Content />} />
        <Route path='images' element={<h1>Images</h1>} />
        <Route path='projects' element={<Projects />} />
        <Route path='skills' element={<Skills />} />
        <Route path='users' element={<Users />} />
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
