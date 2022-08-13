import React, { ReactElement } from 'react'
import { CreateIntellectualPropertyForm } from '../components/CreateIntellectualPropertyForm'
import HomeCarousel from '../components/HomeCarousel'

function App(): ReactElement {
  return (
    <>
      <div className='d-flex flex-row align-items-center home'>
        <div className='w-50'><HomeCarousel /></div>
        <div className='w-50 d-flex justify-content-center'><CreateIntellectualPropertyForm /></div>
      </div>
    </>
  )
}

export default App
