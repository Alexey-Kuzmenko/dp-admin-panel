import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Typography } from '@mui/material';
import { theme } from './theme/ThemeRegistry';
// ! testing
import { Container } from './layout';

import styles from './App.module.scss';

function App() {

  const routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Container><Typography variant='h1'>Root element</Typography></Container>}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path='contacts' element={<h1>Contacts</h1>} />
        <Route path='content' element={<h1>Content</h1>} />
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
