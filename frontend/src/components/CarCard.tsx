import React from 'react'
import { Vehicule } from '../interfaces/Vehicule'
import { Card } from 'react-bootstrap'


/**
 *  Component that display the IP as a card
 * @component
 * @category My IP
 * @param {Object} props
 * @param {Object} props.ip  Intellectual property object
 * @return {Jsx}
 */
const CarCard = (props: { car: Vehicule }) => {
  const { car } = props

  return (
    <div className='mx-3 mx-lg-0 mb-5 mb-lg-0 mr-lg-5 w-lg-30'>
      <Card className='myip-card w-100'>
        <Card.Body>
          <Card.Title className='myip-text-card myip-title-card'>{car.model}</Card.Title>
          <hr/>
          <Card.Text className='myip-text-card my-3'>Location : {car.location}</Card.Text>
          <Card.Text className='myip-text-card my-3'>Owner : {car.ownerAddress}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CarCard
