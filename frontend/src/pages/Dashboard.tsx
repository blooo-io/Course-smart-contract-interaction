import React, { useState } from 'react'
import classnames from 'classnames'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [active, setActive] = useState('MyIP')
  const navigate = useNavigate()

  return (
    <div className="w-100 d-flex flex-column page-container background-magic-mint pt-rem-8">
      <div className="ml-5">
        <button
          className={classnames('dashboard-button mr-3', {
            'background-indigo text-magic-mint': active === 'MyIP',
            'bg-white text-indigo': active != 'MyIP'
          })}
          onClick={() => {
            setActive('MyIP')
            navigate(`/dashboard/myip`)
          }}
        >
          My IP
        </button>
        <button
          className={classnames('dashboard-button ml-2 mr-3', {
            'background-indigo text-magic-mint': active === 'Request',
            'bg-white text-indigo': active != 'Request'
          })}
          onClick={() => {
            setActive('Request')
            navigate(`/dashboard/request`)
          }}
        >
          Request
        </button>
        <button
          className={classnames('dashboard-button', {
            'background-indigo text-magic-mint': active === 'SharedIP',
            'bg-white text-indigo': active != 'SharedIP'
          })}
          onClick={() => {
            setActive('SharedIP')
            navigate(`/dashboard/sharedip`)
          }}
        >
          Shared IP
        </button>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
