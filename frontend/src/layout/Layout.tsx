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
import List from '../pages/List'
import Footer from '../components/Footer'
import IntellectualPropertyContainer from '../components/IntellectualPropertyContainer'
import RequestContainer from '../components/RequestContainer'
import SharedIPContainer from '../components/SharedIPContainer'

/**
 *  Layout component
 * @component
 * @category Layout
 * @return {Jsx}
 */
const Layout = () => {
  return (
    <Router>
      <div className="w-md-full d-flex flex-column">
        <NavbarTop />

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<IntellectualPropertyContainer />} />
            <Route path="myip" element={<IntellectualPropertyContainer />} />
            <Route path="request" element={<RequestContainer />} />
            <Route path="sharedip" element={<SharedIPContainer />} />
          </Route>
          <Route path="/list" element={<List />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default Layout
