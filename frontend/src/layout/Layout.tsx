import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import NavbarTop from '../components/NavbarTop'
import Footer from '../components/Footer'
import CarsContainer from '../components/CarsContainer'

/**
 *  Layout component
 * @component
 * @category Layout
 * @return {Jsx}
 */
const Layout = () => {
  return (
    <Router>
      <div className="w-full d-flex flex-column">
        <NavbarTop />

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<CarsContainer />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default Layout
