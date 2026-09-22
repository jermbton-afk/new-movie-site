import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

import Movies from './pages/Movie-details';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:id" element={<Movies />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
