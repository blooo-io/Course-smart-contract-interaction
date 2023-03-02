import React, { ReactElement } from 'react'
import CreateVehiculeForm from '../components/CreateVehiculeForm'
import HomeIntroduction from '../components/HomeIntroduction'

/**
 *  Home page
 * @component
 * @category Page
 * @return {Jsx}
 */
function App(): ReactElement {
  return (
    <>
      <div className='w-100 d-flex flex-column-reverse flex-lg-row  align-items-center page-container'>
        <div className='w-100 w-md-50 vh-sm-100'><HomeIntroduction /></div>
        <div className='w-100 w-md-50 vh-sm-100 d-flex justify-content-center background-magic-mint'><CreateVehiculeForm/></div>
      </div>
    </>
  )
}

export default App
