import React from 'react'
import HomePage from './HomePage';
import Test from './Test';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<HomePage/>} />
          <Route path = '/index' element = {<Test />} />
        </Routes>
          
      </Router>
      
    </div>
  );
}

export default App;