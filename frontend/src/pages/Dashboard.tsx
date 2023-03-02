import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

/**
 *  Dashboard page
 * @component
 * @category Page
 * @return {Jsx}
 */
const Dashboard = () => {
  return (
    <div className="w-100 d-flex flex-column page-container background-magic-mint pt-rem-8">
      <Outlet />
    </div>
  )
}

export default Dashboard
