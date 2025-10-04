import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Detail from './routes/Detail';
import Home from './routes/Home';
import styles from './styles/App.module.css';

const App = () => {
  // inside Routes : lets us have multiple Routes
  // Route : what we want to show to the user, based on the path
  return (
    <Router>
      <header className={styles.header}>
        <div className={styles.title}>A Thousand Recipes</div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
