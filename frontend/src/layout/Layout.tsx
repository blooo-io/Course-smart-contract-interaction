import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NavbarTop from '../components/NavbarTop';
import List from '../pages/List';

const Layout = () => {
  return (
    <Router>
      <div className='w-full'>
        <NavbarTop/>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/list' element={<List/>} />
          <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default Layout
