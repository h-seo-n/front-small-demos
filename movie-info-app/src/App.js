import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./routes/Home"
import Detail from "./routes/Detail"

function App() {

  // inside Routes : lets us have multiple Routes
  // Route : what we want to show to the user, based on the path
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<Detail />}/>
    </Routes>
  </Router>);
}

export default App;
