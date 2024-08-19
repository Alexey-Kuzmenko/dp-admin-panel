import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/ThemeRegistry';
import { Layout } from './layout';
// * pages
import { Dashboard, Contacts, Content } from './pages';

import styles from './App.module.scss';

function App() {

  const routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path='content' element={<Content />} />
        <Route path='images' element={<h1>Images</h1>} />
        <Route path='projects' element={<h1>Projects</h1>} />
        <Route path='skills' element={<h1>Skills</h1>} />
        <Route path='users' element={<h1>Users</h1>} />
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
