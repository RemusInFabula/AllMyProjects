import Navbar from './Navbar';
import Home from './Home';
import BlogDetails from './BlogDetails';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Create from './Create';
import NotFound from './NotFound';
function App() {
  
  return (
    <Router>
    <div className="App">
      <Navbar />
     <div className='content'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<BlogDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </div>
    </Router>
  );
}

export default App;
